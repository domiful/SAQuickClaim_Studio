//-------------------------------------------------------------------------
// <Auto-generated file - do not modify!>
//
// This code was generated automatically by Kinvey Studio.
//
// Changes to this file may cause undesired behavior and will be lost
// the next time the code regenerates.
//
// Find more information on https://devcenter.kinvey.com/guides/studio-extension-points.
//-------------------------------------------------------------------------
import { Injectable, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpRequest } from '@angular/common/http';

import { Observable, from, of, throwError } from 'rxjs';
import { map, concatMap, reduce, findIndex, tap, last } from 'rxjs/operators';

import { SessionStorageService } from '@src/app/core/session-storage.service';
import { AuthenticationProviderInterface } from '@src/app/core/auth/authentication-provider.interface';
import { AUTHENTICATION_PROVIDER_FACTORIES, AuthenticationProviderFactoryInterface } from '@src/app/core/auth/authentication-provider-factory.interface';

const SIGNIN_STATE_KEY = 'auth.signin.state';

class SignInState {
  providerIndex: number;
  returnUrl: string;
  dataProviders: string[];
}

@Injectable()
export class AuthenticationService {
  public readonly requireSignIn: boolean;
  protected authProviders: AuthenticationProviderInterface[] = [];
  protected authMap: {
    [key: string]: {
      provider: AuthenticationProviderInterface;
      index: number;
    };
  } = {};

  constructor(
    @Inject('AuthenticationConfig') protected config: any,
    private location: Location,
    private sessionStorageService: SessionStorageService,
    @Inject(AUTHENTICATION_PROVIDER_FACTORIES) private providerFactories: AuthenticationProviderFactoryInterface[]
  ) {
    if (!config) {
      return;
    }

    this.requireSignIn = Object.keys(config.authProviders).length > 0;

    Object.keys(config.authProviders).forEach(authType => {
      config.authProviders[authType].items.forEach(item => {
        const authProvider = this.createAuthProvider(authType, item.settings);
        this.authProviders.push(authProvider);

        item.dataProviders.forEach(dataProvider => {
          this.authMap[dataProvider] = {
            provider: authProvider,
            index: this.authProviders.length - 1
          };
        });
      });
    });
  }

  public isAuthenticated(): Observable<boolean> {
    return from(this.authProviders).pipe(
      concatMap(item => item.isAuthenticated()),
      reduce((acc, val) => acc && val, true)
    );
  }

  public authenticate(returnUrl: string): void {
    this.findUnauthenticatedProviderIndex().subscribe(index => this.authenticateProvider(returnUrl, index));
  }

  public authenticateDataProvider(dataProvider: string) {
    if (this.authMap[dataProvider]) {
      this.authenticateProvider(this.location.path(), this.authMap[dataProvider].index);
    }
  }

  public completeAuthentication(): Observable<any> {
    const signInState: SignInState = this.getSigninState() || {
      providerIndex: -1,
      returnUrl: '/',
      dataProviders: []
    };

    if (signInState.providerIndex === -1) {
      return of({ returnUrl: signInState.returnUrl });
    }

    return this.authProviders[signInState.providerIndex].completeAuthentication().pipe(
      map(item => {
        this.sessionStorageService.removeItem(SIGNIN_STATE_KEY);
        return { returnUrl: signInState.returnUrl };
      })
    );
  }

  public authenticateRequest(dataProvider: string, request: HttpRequest<any>): Observable<HttpRequest<any>> {
    if (this.authMap[dataProvider]) {
      return this.authMap[dataProvider].provider.authenticateRequest(request);
    }

    return of(request);
  }

  public signIn(credentials: any): Observable<void> {
    const signInState: SignInState = this.getSigninState();

    if (!signInState) {
      return throwError(new Error('Error Signing In. Unknown authentication provider.'));
    }

    return this.authProviders[signInState.providerIndex].signIn(credentials);
  }

  public signUp(credentials: any): Observable<void> {
    const signInState: SignInState = this.getSigninState();

    if (!signInState) {
      return throwError(new Error('Error Signing Up. Unknown authentication provider.'));
    }

    return this.authProviders[signInState.providerIndex].signUp(credentials);
  }

  public resetPassword(email: string, options?: any): Observable<void> {
    const signInState: SignInState = this.getSigninState();

    if (!signInState) {
      return throwError(new Error('Error Resetting password. Unknown authentication provider.'));
    }

    return this.authProviders[signInState.providerIndex].resetPassword(email, options);
  }

  public signOut(): Observable<void> {
    return from(this.authProviders).pipe(
        concatMap(item => item.signOut()),
        last()
    );
  }

  public supportsRefresh(dataProvider: string): boolean {
    return this.authMap[dataProvider] ? this.authMap[dataProvider].provider.supportsRefresh() : false;
  }

  public silentRefresh(dataProvider: string): Observable<any> {
    if (this.supportsRefresh(dataProvider)) {
      return this.authMap[dataProvider].provider.silentRefresh();
    }

    return throwError(new Error(`Silent refresh is not supported for ${dataProvider} data provider`));
  }

  public getSigninState(): SignInState {
    return this.sessionStorageService.getItem(SIGNIN_STATE_KEY);
  }

  protected createAuthProvider(type: string, settings: any): AuthenticationProviderInterface {
    for (const factory of this.providerFactories) {
      const authProvider: AuthenticationProviderInterface = factory.createAuthProvider(type, settings);

      if (authProvider) {
        return authProvider;
      }
    }

    return null;
  }

  private findUnauthenticatedProviderIndex(): Observable<number> {
    return from(this.authProviders).pipe(
      concatMap(item => item.isAuthenticated()),
      findIndex(val => !val)
    );
  }

  private authenticateProvider(returnUrl: string, providerIndex): void {
    if (providerIndex > -1) {
      const signInState = {
        providerIndex,
        returnUrl,
        dataProviders: Object.keys(this.authMap).filter(key => this.authMap[key].index === providerIndex)
      };

      this.sessionStorageService.setItem(SIGNIN_STATE_KEY, signInState);
      this.authProviders[providerIndex].authenticate();
    }
  }
}
