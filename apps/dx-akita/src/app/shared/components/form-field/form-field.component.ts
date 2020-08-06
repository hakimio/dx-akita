import {Component} from '@angular/core';

@Component({
    selector: 'dxa-form-field',
    template: '<ng-content></ng-content>',
    host: {
        class: 'dx-field material-placeholder'
    },
    styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {}
