import {Injectable} from '@angular/core';
import {EntityServiceAction, HttpMethod, NgEntityServiceNotifier} from '@datorama/akita-ng-entity-service';
import {humanize} from 'devextreme/core/utils/inflector';
import notify from 'devextreme/ui/notify';
import {alert} from 'devextreme/ui/dialog';

@Injectable({
    providedIn: 'root'
})
export class EntityNotificationService {

    private readonly HTTP_METHOD_TO_ACTION_TYPE = {
        [HttpMethod.POST]: 'created',
        [HttpMethod.PATCH]: 'updated',
        [HttpMethod.DELETE]: 'deleted'
    };

    constructor(
        private readonly notifier: NgEntityServiceNotifier
    ) {}

    listenToEntityChanges() {
        this.notifier.action$.subscribe(
            action => this.showNotification(action)
        );
    }

    private showNotification(action: EntityServiceAction) {
        const supportedActions = Object.keys(this.HTTP_METHOD_TO_ACTION_TYPE);

        if (!supportedActions.includes(action.method)) {
            return;
        }

        const isSuccess = action.type === 'success',
            entityName = humanize(action.storeName.slice(0, -1)),
            actionType = this.HTTP_METHOD_TO_ACTION_TYPE[action.method];

        if (isSuccess) {
            const message = `${entityName} was ${actionType}`;
            notify(message, 'success', 2e3);
        } else {
            alert(action.errorMsg, 'Error!');
        }
    }

}
