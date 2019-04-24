import { Component, Inject, Injector } from '@angular/core';

@Component({
    templateUrl: './wrapper.component.html',
    styleUrls: ['./wrapper.component.css']
})
export class WrapperViewComponent {
    constructor(@Inject(Injector) injector: Injector) {
    }
}
