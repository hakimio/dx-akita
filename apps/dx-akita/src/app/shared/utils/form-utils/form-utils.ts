import {FormGroup} from '@angular/forms';

export class FormUtils {

    static validateDxControl(form: FormGroup, name: string): boolean {
        const control = form.controls[name];

        return control.valid || !(control.dirty || control.touched);
    }

}
