import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {TicketStatusStore, TicketStatusState} from './ticket-status.store';

@Injectable({
    providedIn: 'root'
})
export class TicketStatusQuery extends QueryEntity<TicketStatusState> {

    constructor(
        protected store: TicketStatusStore
    ) {
        super(store);
    }

}
