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
import { Component, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { AuthenticationService } from '@src/app/core/auth/authentication.service';
import { NavigationService } from '@src/app/core/services/navigation.service';
import { SideDrawerService } from '@src/app/core/services/side-drawer.service';
import { AppConfigService } from '@src/app/core/app-config.service';

@Component({
    templateUrl: 'app.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['app.custom.tns.css']
})
export class AppComponent implements AfterViewInit {
    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;

    get user() {
        return this.authenticationService.activeUser;
    }

    get sideDrawerGesturesEnabled(): boolean {
        return this.sideDrawerService.isEnabled;
    }

    constructor(
        private appConfigService: AppConfigService,
        private authenticationService: AuthenticationService,
        private navigationService: NavigationService,
        private sideDrawerService: SideDrawerService
    ) {}

    ngAfterViewInit(): void {
        if (this.drawerComponent) {
            this.sideDrawerService.initialize(this.drawerComponent.sideDrawer);
        }
    }

    logout() {
        this.sideDrawerService.close();
        this.authenticationService
            .signOut()
            .toPromise()
            .then(() => this.authenticationService.authenticate());
    }

    open(path: string) {
        this.sideDrawerService.close();
        this.navigationService.navigate([path]);
    }

    onLoaded(): void {
        this.appConfigService.init();
    }
}
