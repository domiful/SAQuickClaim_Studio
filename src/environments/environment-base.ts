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
import { AppConfigService } from '@src/app/core/app-config.service';

export const environmentBase = {
    appId: '1678bea6-f6e8-4569-8168-7d956fa4096d',
    appName: 'SafeAutoQuickClaim',
    getDataProviders() {
        return AppConfigService.settings.dataProviders;
    },
    getAuthentication() {
        return AppConfigService.settings.authentication;
    }
};
