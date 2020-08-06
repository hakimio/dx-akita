import { Component } from '@angular/core';
import {AuthenticationQuery} from './authentication/state/authentication.query';
import {EntityNotificationService} from './shared/services';

@Component({
  selector: 'dxa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    isLoggedIn$ = this.authQuery.isLoggedIn$;

    constructor(
        private authQuery: AuthenticationQuery,
        private notificationService: EntityNotificationService
    ) {
        this.notificationService.listenToEntityChanges();
    }

}
