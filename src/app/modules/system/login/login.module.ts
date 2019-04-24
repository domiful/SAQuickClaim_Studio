//-------------------------------------------------------------------------
// <Auto-generated file - do not modify!>
//
// This code was generated automatically by Kinvey Studio.
//
// Changes to this file may cause undesired behavior and will be lost
// the next time the code regenerates.
//
// You can write your custom code in the login.config.ts file instead.
// Find more information on https://devcenter.kinvey.com/guides/studio-extension-points.
//-------------------------------------------------------------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SharedModule } from '@src/app/shared/shared.module';
import { LoginViewBaseComponent } from '@src/app/modules/system/login/login.base.component';
import { LoginViewComponent } from '@src/app/modules/system/login/login.component';
import { RouterModule } from '@angular/router';

import { BottomSectionComponent } from '@src/app/modules/system/login/bottom-section.component';
import { MiddleSectionComponent } from '@src/app/modules/system/login/middle-section.component';
import { TopSectionComponent } from '@src/app/modules/system/login/top-section.component';

import { config, transformConfig } from '@src/app/modules/system/login/login.config';

const configMeta: NgModule = {
    providers: [...config.providers],
    declarations: [
        LoginViewBaseComponent,
        LoginViewComponent,
        BottomSectionComponent,
        MiddleSectionComponent,
        TopSectionComponent,
        ...config.declarations
    ],
    imports: [CommonModule, SharedModule, LayoutModule, RouterModule, ...config.imports],
    exports: [BottomSectionComponent, MiddleSectionComponent, TopSectionComponent, ...config.exports],
    entryComponents: [...config.entryComponents],
    bootstrap: [...config.bootstrap],
    schemas: [...config.schemas],
    id: config.id,
    jit: config.jit
};

transformConfig(configMeta);

@NgModule(configMeta)
export class LoginViewModule {}
