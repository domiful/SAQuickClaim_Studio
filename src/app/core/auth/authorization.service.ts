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
import { Injectable } from '@angular/core';
import { RoleService } from '@src/app/core/auth/role.service';

@Injectable()
export class AuthorizationService {
    constructor(private roleService: RoleService) {
    }

    public isAuthorized(authorization): boolean {
        if (authorization && authorization.allowedRoles && authorization.allowedRoles.length) {
            return this.isAuthorizedForRoles(authorization.allowedRoles);
        } else {
            return true;
        }
    }

    public isAuthorizedForRoles(roles): boolean {
        const userRoles = this.roleService.getRoles();
        if (userRoles && userRoles.length) {
            const foundUserRoles = roles.filter(elem => userRoles.indexOf(elem) > -1);
            return foundUserRoles.length > 0;
        }

        return false;
    }
}
