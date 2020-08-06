import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../services';
import {Router} from '@angular/router';
import {alert} from 'devextreme/ui/dialog';
import {AuthenticationQuery} from '../state/authentication.query';
import {Credentials} from '../state/authentication.model';
import {environment} from '../../../environments/environment';
import {DxTextBoxComponent} from 'devextreme-angular';
import {FormUtils} from '../../shared/utils';

@Component({
    selector: 'dxa-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
    loginForm = this.formBuilder.group({
        username: ['don', Validators.required],
        password: ['', Validators.required]
    });
    validate = FormUtils.validateDxControl;

    isLoading$ = this.authQuery.isLoading$;
    appName = environment.appName;

    @ViewChild('passwordTxtBox')
    passwordTxtBox: DxTextBoxComponent;

    constructor(
        private readonly authService: AuthenticationService,
        private readonly authQuery: AuthenticationQuery,
        private readonly router: Router,
        private readonly formBuilder: FormBuilder
    ) {}

    ngAfterViewInit(): void {
        this.passwordTxtBox.instance.focus();
    }

    login() {
        if (!this.loginForm.valid) {
            alert('Please enter required login data', 'Invalid Input');
            return;
        }
        const credentials: Credentials = this.loginForm.value;

        this.authService.login(credentials).subscribe(
            () => this.router.navigateByUrl('/'),
            error => alert(error, 'Login Failed!')
        );
    }

    continueWithGoogle() {
        alert('Functionality is not implemented yet', 'Not implemented');
    }

}
