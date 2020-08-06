import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {DxButtonModule, DxLoadPanelModule, DxTextBoxModule} from 'devextreme-angular';
import {FormFieldModule} from '../shared/components';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationInterceptor} from './services';

@NgModule({
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DxTextBoxModule,
        DxButtonModule,
        FormFieldModule,
        DxLoadPanelModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationInterceptor,
        multi: true
    }]
})
export class AuthenticationModule {}
