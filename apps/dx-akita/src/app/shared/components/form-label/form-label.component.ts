import {Component} from '@angular/core';

@Component({
    selector: 'dxa-form-label',
    template: '<ng-content></ng-content>',
    styles: [`
        :host {
            align-self: start;
        }
    `],
    host: {
        class: 'dx-field-label'
    }
})
export class FormLabelComponent {}
