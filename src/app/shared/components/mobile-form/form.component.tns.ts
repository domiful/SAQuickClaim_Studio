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
import { Component, NgZone, OnInit, ViewChild, ElementRef, Input, OnDestroy, Injector } from '@angular/core';
import { FormGroup, ValidatorFn, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExtendedNavigationExtras } from 'nativescript-angular/router/router-extensions';

import { EntityDataService } from '@src/app/core/data/entity-data.service';
import { Label } from 'tns-core-modules/ui/label';
import { NavigationService } from '@src/app/core/services/navigation.service';

export interface KsFormEventHandler {
    (args: { form: KSFormComponent }): Promise<void>|void;
}

@Component({
    selector: 'ks-form',
    templateUrl: './form.component.html',
})
export class KSFormComponent implements OnInit, OnDestroy {
    private zone: NgZone;
    private activatedRoute: ActivatedRoute;
    private navigationService: NavigationService;

    @ViewChild('formContainer') formContainer: ElementRef;

    @Input() config: {
        validators: { [key: string]: Array<ValidatorFn> }
        customSubmit?: ({ form: KSFormComponent }) => Promise<void>;
        customCancel?: ({ form: KSFormComponent }) => Promise<void>;
        beforeSubmit?: ({ form: KSFormComponent, item: any, cancelled: boolean }) => Promise<void>;
        submitSave?: ({ form: KSFormComponent, item: any }) => Promise<any>;
        afterSubmitNavigateTo?: { allowBackNavigation: boolean; module: string; view: string; };
        afterSubmit?: ({ form: KSFormComponent, result: any }) => Promise<void>;
    };

    @Input() dataService: EntityDataService<any>;
    @Input() formGroup: FormGroup;

    @Input() messages = {};

    defaultMessages = {
        required: '${fieldName} is required',
        requiredtrue: '${fieldName} is required',
        min: '${fieldName} should be minimum ${min}',
        max: '${fieldName} should be maximum ${max}',
        minlength: '${fieldName} minimum length is ${requiredLength}',
        maxlength: '${fieldName} maximum length is ${requiredLength}',
        email: '${fieldName} should be a valid email',
        pattern: '${fieldName} should match the pattern'
    };

    asyncInputs: Promise<void>[] = [];
    dataChanges: Subscription;
    item = {};
    originalItem = {};
    isLoading = false;

    constructor(public injector: Injector) {
        this.zone = injector.get(NgZone);
        this.activatedRoute = injector.get(ActivatedRoute);
        this.navigationService = injector.get(NavigationService);
    }

    ngOnInit() {
        this.createFormGroup(this.formContainer.nativeElement.content, this.formGroup);

        if (!this.dataService) {
            return;
        }

        this.dataChanges = this.dataService.dataChanges
            .subscribe((item) => {
                if (!item) {
                    return;
                }

                this.originalItem = item;
                this.formGroup.patchValue(item);
            });
    }

    ngOnDestroy() {
        if (this.dataChanges) {
            this.dataChanges.unsubscribe();
        }
    }

    createFormGroup(formElement, formGroup): FormGroup {
        const checkForFormButton = (element) => {
            const type = element.buttonType === 'SubmitAndUpdate' ? 'Submit' : element.buttonType;
            if (type) {
                element.firstChild.on('tap', this[`on${type}`], this);
            }

            if (element.eachChild) {
                element.eachChild(child => checkForFormButton(child));
            }
        };

        formElement.eachChild(view => {
            if (view.formControlName) {
                const formControl = new FormControl(null,
                    {
                        validators: this.config.validators[view.formControlName] || [],
                        updateOn: view.updateOn || 'change'
                    });

                formGroup.addControl(view.formControlName, formControl);

                formControl.statusChanges.subscribe((status) => {
                    if (status === 'INVALID') {
                        const [errorName] = Object.keys(formControl.errors);
                        const errorData = formControl.errors[errorName];

                        if (!view.__validationMessage) {
                            const message = new Label();

                            message.className = 'form__validation-message';
                            message.row = view.row;
                            message.col = view.col;

                            view.__validationMessage = message;
                            view.parent.addChild(view.__validationMessage);
                        }

                        const binder = Object.assign({
                            fieldName: view.formControlName[0].toUpperCase() + view.formControlName.substr(1),
                        }, errorData);
                        const template = view[`${errorName}Message`] ||
                            Object.assign({}, this.defaultMessages, this.messages)[errorName];

                        view.__validationMessage.text = new Function('const {' + Object.keys(binder).join(',') +
                                '} = this;return `' + template + '`;').call(binder);

                        return;
                    }

                    if (status === 'VALID' && view.__validationMessage) {
                        view.parent.removeChild(view.__validationMessage);
                        view.__validationMessage = undefined;
                    }
                });

            }

            checkForFormButton(view);
        });

        return formGroup;
    }

    get isValid() {
        return this.formGroup.valid;
    }

    onSubmit() {
        if (this.config.customSubmit) {
            this.config.customSubmit({ form: this });
            return;
        }

        this.zone.run(() => this.isLoading = true);
        const beforeSubmitArgs = { form: this, item: null, cancelled: false };
        Promise.all(this.asyncInputs)
            .then(() => {
                if (!this.isValid) {
                    Object.keys(this.formGroup.controls).forEach(key => {
                        const control = this.formGroup.get(key);

                        control.updateValueAndValidity({ onlySelf: true });
                        control.markAsDirty();
                    });

                    throw new Error('The form is not valid.');
                }

                this.item = { ...this.originalItem, ...this.formGroup.value };
            })
            .then(() => {
                if (this.config.beforeSubmit) {
                    beforeSubmitArgs.item = this.item;
                    return this.config.beforeSubmit(beforeSubmitArgs);
                }
            })
            .then(() => {
                if (beforeSubmitArgs.cancelled) {
                    this.zone.run(() => this.isLoading = false);
                    return;
                }
            })
            .then(() => {
                if (this.config.submitSave) {
                    return this.config.submitSave({ form: this, item: this.item });
                }

                return this.dataService.save(this.item);
            })
            .then((result) => {
                if (this.config.afterSubmitNavigateTo) {
                    const command = [this.config.afterSubmitNavigateTo.module, this.config.afterSubmitNavigateTo.view];
                    const extras: ExtendedNavigationExtras = {
                        relativeTo: this.activatedRoute,
                        queryParams: {
                            [`${this.dataService.typeName}Id`]: result._id
                        },
                        clearHistory: !this.config.afterSubmitNavigateTo.allowBackNavigation
                    };
                    const preserveQueryParams = true;

                    return this.navigationService.navigate(command, extras, preserveQueryParams);
                } else if (this.config.afterSubmit) {
                    return this.config.afterSubmit({ form: this, result })
                }

                return this.navigationService.goBack(this.activatedRoute);
            })
            .catch((err) => {
                alert(err && err.message || 'An error has occurred.');
            })
            .then(() => {
                this.zone.run(() => this.isLoading = false);
            });
    }

    onCancel() {
        if (this.config.customCancel) {
            this.config.customCancel({ form: this });
            return;
        }

        return this.navigationService.goBack(this.activatedRoute);
    }

    onRegisterAsyncInput(asyncInput: Promise<void>) {
        this.asyncInputs.push(asyncInput);
    }
}