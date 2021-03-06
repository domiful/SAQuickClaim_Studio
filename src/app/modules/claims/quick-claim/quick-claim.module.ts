//-------------------------------------------------------------------------
// <Auto-generated file - do not modify!>
//
// This code was generated automatically by Kinvey Studio.
//
// Changes to this file may cause undesired behavior and will be lost
// the next time the code regenerates.
//
// You can write your custom code in the quick-claim.config.ts file instead.
// Find more information on https://devcenter.kinvey.com/guides/studio-extension-points.
//-------------------------------------------------------------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SharedModule } from '@src/app/shared/shared.module';
import { QuickClaimViewBaseComponent } from '@src/app/modules/claims/quick-claim/quick-claim.base.component';
import { QuickClaimViewComponent } from '@src/app/modules/claims/quick-claim/quick-claim.component';
import { RouterModule } from '@angular/router';

import { TopSectionComponent } from '@src/app/modules/claims/quick-claim/top-section.component';

import { config, transformConfig } from '@src/app/modules/claims/quick-claim/quick-claim.config';

const configMeta: NgModule = {
    providers: [...config.providers],
    declarations: [QuickClaimViewBaseComponent, QuickClaimViewComponent, TopSectionComponent, ...config.declarations],
    imports: [CommonModule, SharedModule, LayoutModule, RouterModule, ...config.imports],
    exports: [TopSectionComponent, ...config.exports],
    entryComponents: [...config.entryComponents],
    bootstrap: [...config.bootstrap],
    schemas: [...config.schemas],
    id: config.id,
    jit: config.jit
};

transformConfig(configMeta);

@NgModule(configMeta)
export class QuickClaimViewModule {}
