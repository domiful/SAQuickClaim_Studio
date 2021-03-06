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
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable()
export class ValidationService {
    public validate(formGroup: FormGroup): void {
        for (const controlName in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(controlName)) {
                const control: AbstractControl = formGroup.get(controlName);
                control.markAsTouched();
                control.updateValueAndValidity();
            }
        }
    }

    public validateControl(control: AbstractControl, validationMessages: any): string {
        let errorMessage = '';
        if (!control.valid) {
            const messages: any = validationMessages;
            for (const key in control.errors) {
                if (control.errors.hasOwnProperty(key)) {
                    errorMessage = errorMessage + messages[key] + ' ';
                }
            }
        }

        return errorMessage;
    }
}
