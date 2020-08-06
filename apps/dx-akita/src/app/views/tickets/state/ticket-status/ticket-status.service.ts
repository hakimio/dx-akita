import {Injectable} from '@angular/core';
import {TicketStatusStore, TicketStatusState} from './ticket-status.store';
import {BaseStoreService} from '../../../../shared/services/store';

@Injectable({
    providedIn: 'root'
})
export class TicketStatusService extends BaseStoreService<TicketStatusState> {

    constructor(
        protected store: TicketStatusStore
    ) {
        super(store);
    }

}
