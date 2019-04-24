/////////////////////////////////////////////////////
// Add your custom code here.
// This file and any changes you make to it are preserved every time the app is generated.
/////////////////////////////////////////////////////
import { Inject, Injector } from '@angular/core';
import { HomeViewBaseComponent } from '@src/app/modules/system/home/home.base.component';

export class HomeViewComponent extends HomeViewBaseComponent {
    constructor(@Inject(Injector) injector: Injector) {
        super(injector);
    }
}
