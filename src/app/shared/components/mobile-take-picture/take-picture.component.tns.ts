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
import { Component, EventEmitter, Output, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { takePicture, requestPermissions } from 'nativescript-camera';
import { ImageAsset } from 'tns-core-modules/image-asset';
import { fromAsset, ImageSource } from 'tns-core-modules/image-source';
import { knownFolders, path, File } from 'tns-core-modules/file-system';
import * as imagepicker from 'nativescript-imagepicker';

import { EntityDataService } from '@src/app/core/data/entity-data.service';

@Component({
    selector: 'ks-take-picture',
    templateUrl: './take-picture.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => KSTakePictureComponent),
        multi: true,
    }]
})
export class KSTakePictureComponent implements ControlValueAccessor {
    @Input() dataService: EntityDataService<any>;
    @Output() registerAsyncInput = new EventEmitter<Promise<void>>();

    public value: any;
    public picture: ImageAsset;
    public picturePromise: Promise<any> = Promise.resolve();

    private _onChange = (_: any) => { };
    private _onTouched = () => { };

    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    takePicture() {
        requestPermissions().then(
            () => {
                this.picturePromise = takePicture()
                    .then((imageAsset: ImageAsset) => this.saveToDataStore(imageAsset));

                this.onPicturePromiseChanged();
            },
            () => alert('permissions rejected')
        );
    }

    selectPicture() {
        const context = imagepicker.create({ mode: 'single' });
        this.picturePromise = context.authorize()
            .then(() => context.present())
            .then((selection) => selection[0] && this.saveToDataStore(selection[0]));

        this.onPicturePromiseChanged();
    }

    private onPicturePromiseChanged() {
        this.registerAsyncInput.emit(this.picturePromise.catch(err => {
            const errorMessage = err && err.message;
            if(errorMessage.indexOf('cancelled') !== -1 || errorMessage.indexOf('canceled') !== -1) {
                return;
            }

            throw err;
        }));
    }

    private saveToDataStore(imageAsset: ImageAsset) {
        this.picture = imageAsset;
        return fromAsset(imageAsset)
            .then((asset: ImageSource) => {
                const fileExt = 'jpg';
                const filePath = path.join(knownFolders.temp().path, `${new Date().getTime()}.${fileExt}`);
                asset.saveToFile(filePath, fileExt, 0.8);
                const file = File.fromPath(filePath);
                const metadata = {
                    filename: file.name,
                    public: true,
                    mimeType: 'image/jpeg'
                };

                return this.dataService.filesUpload(file, metadata);
            })
            .then(file => {
                this._onChange({ _type: 'KinveyFile', _id: file._id });
            });
    }
}