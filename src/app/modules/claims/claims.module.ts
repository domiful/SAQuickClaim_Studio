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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@src/app/shared/shared.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ClaimsModuleComponent } from '@src/app/modules/claims/claims.component';
import { ClaimsRoutingModule } from '@src/app/modules/claims/claims-routing.module';
import { AppLayoutViewModule } from '@src/app/modules/system/app-layout/app-layout.module';
import { QuickClaimViewModule } from '@src/app/modules/claims/quick-claim/quick-claim.module';
import { QuickClaimSimpleViewModule } from '@src/app/modules/claims/quick-claim-simple/quick-claim-simple.module';

import { config, transformConfig } from '@src/app/modules/claims/claims.config';

const configMeta: NgModule = {
    providers: [...config.providers],
    declarations: [ClaimsModuleComponent, ...config.declarations],
    imports: [
        CommonModule,
        SharedModule,
        LayoutModule,
        AppLayoutViewModule,
        QuickClaimViewModule,
        QuickClaimSimpleViewModule,
        ClaimsRoutingModule,
        ...config.imports
    ],
    exports: [...config.exports],
    entryComponents: [...config.entryComponents],
    bootstrap: [...config.bootstrap],
    schemas: [...config.schemas],
    id: config.id,
    jit: config.jit
};

transformConfig(configMeta);

@NgModule(configMeta)
export class ClaimsModule {}