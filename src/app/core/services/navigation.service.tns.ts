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
import { Injectable, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isAndroid } from 'tns-core-modules/platform';
import { RouterExtensions } from 'nativescript-angular/router';
import { ExtendedNavigationExtras } from 'nativescript-angular/router/router-extensions';
import { defaultRoute } from '@src/app/app-routing.module'

@Injectable()
export class NavigationService {
    constructor(private zone: NgZone, private routerExtensions: RouterExtensions) {}

    navigate(command: any[], extras: ExtendedNavigationExtras = {}, preserveQueryParams = false) {
        command = command.slice(0);

        if (!isAndroid) {
            extras.animated = true;
            extras.transition = extras.transition || {
                name: 'slide',
                duration: 300,
                curve: 'ease'
            };
        }

        if (preserveQueryParams && extras.relativeTo) {
            extras.queryParams = Object.assign({}, extras.relativeTo.snapshot.queryParams, extras.queryParams);
        }

        const { relative, command: relativeNavCommand } = this.checkForNavigationRelativeToCurrentModule({ extras, command });
        if (relative) {
            command = relativeNavCommand;
        }

        this.zone.run(() => this.routerExtensions.navigate(command, extras));
    }

    goToRoot(extras: ExtendedNavigationExtras = {}) {
        extras.clearHistory = true;
        this.navigate([''], extras);
    }

    canGoBack(activatedRoute: ActivatedRoute) {
        return this.routerExtensions.canGoBack({ relativeTo: activatedRoute });
    }

    goBack(activatedRoute: ActivatedRoute) {
        return this.routerExtensions.back({ relativeTo: activatedRoute });
    }

    private checkForNavigationRelativeToCurrentModule({ extras, command }) {
        if (!extras.relativeTo || command[0].outlets) {
            return { relative: false, command };
        }

        if (command.length === 1) {
            command = command[0].split('/');
        }

        // absolute navigation e.g. in primary outlet
        delete extras.relativeTo;
        return { relative: false, command };
    }

    private getCurrentModuleFromActivatedRoute(activatedRoute) {
        return activatedRoute.snapshot.pathFromRoot
            .map(x => x.url[0])
            .join('/')
            .split(`/${defaultRoute}/`)
            .pop()
            .split('/')
            .shift();
    }
}
