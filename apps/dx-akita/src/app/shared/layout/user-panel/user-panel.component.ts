import {Component} from '@angular/core';
import {AuthenticationQuery} from '../../../authentication/state/authentication.query';
import {AuthenticationService} from '../../../authentication/services';
import {Router} from '@angular/router';
import {bind} from 'helpful-decorators';

@Component({
    selector: 'dxa-user-panel',
    templateUrl: './user-panel.component.html',
    styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {

    user$ = this.authQuery.user$;

    constructor(
        private authQuery: AuthenticationQuery,
        private authService: AuthenticationService,
        private router: Router
    ) {}

    @bind
    logout() {
        this.authService.logout().subscribe();
        this.router.navigate(['/log-in'], {
            skipLocationChange: true
        });
    }
}
