/////////////////////////////////////////////////////
// Add your custom code here.
// This file and any changes you make to it are preserved every time the app is generated.
/////////////////////////////////////////////////////
import { Component, Optional } from '@angular/core';
import { ApiKeyViewComponent } from '@src/app/modules/system/api-key/api-key.component';

@Component({
    selector: 'ks-top-section',
    templateUrl: './top-section.component.html'
})
export class TopSectionComponent {
    constructor(@Optional() public parent: ApiKeyViewComponent) {}
}
