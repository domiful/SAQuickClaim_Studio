import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@src/app/shared/shared.module';
import { WrapperViewComponent } from '@src/app/modules/main-site/wrapper/wrapper.component';

@NgModule({
    providers: [],
    declarations: [
        WrapperViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    exports: [
        WrapperViewComponent
    ]
})
export class WrapperViewModule { }
