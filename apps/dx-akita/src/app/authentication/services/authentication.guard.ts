import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {AuthenticationStore} from '../state/authentication.store';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(
       private readonly authService: AuthenticationService,
       private authenticationStore: AuthenticationStore,
       private readonly router: Router
    ) {}

    async canActivate(): Promise<boolean> {
        const isLoggedIn = await this.authService.isLoggedIn();

        await this.authenticationStore.setIsLoggedIn(isLoggedIn);

        if (!isLoggedIn) {
            // noinspection ES6MissingAwait
            this.router.navigate(['/log-in'], {
                skipLocationChange: true
            });
        }

        return isLoggedIn;
    }

}
