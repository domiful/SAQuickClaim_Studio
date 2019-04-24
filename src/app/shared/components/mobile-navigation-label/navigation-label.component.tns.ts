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
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@src/app/core/services/navigation.service';
import { Button } from 'tns-core-modules/ui/button';
import { isAndroid } from 'tns-core-modules/platform';

@Component({
    selector: 'ks-navigation-label',
    templateUrl: './navigation-label.component.html'
})
export class KSNavigationLabelComponent {
    @Input()
    public text: string;

    @Input()
    public tapArgs: Array<string>;

    constructor(
        protected navigationService: NavigationService,
        protected activatedRoute: ActivatedRoute) { }

    public onLoaded(args) {
        let btn = <Button>args.object;
        let nativeButton = btn.nativeView;

        // Android buttons have native minWidth by default
        if (isAndroid) {
            nativeButton.setMinHeight(0);
            nativeButton.setMinWidth(0);
        }
    }

    public onItemTap() {
        if (!this.tapArgs || !this.tapArgs.length) {
            return;
        }

        this.navigationService.navigate(this.tapArgs, { relativeTo: this.activatedRoute });
    }
}
