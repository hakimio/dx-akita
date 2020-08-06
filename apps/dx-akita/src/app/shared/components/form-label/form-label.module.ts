import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormLabelComponent} from './form-label.component';

@NgModule({
    declarations: [
        FormLabelComponent
    ],
    exports: [
        FormLabelComponent
    ],
    imports: [
        CommonModule
    ]
})
export class FormLabelModule {}
