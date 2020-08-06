import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {TicketStatus} from './ticket-status.model';

export interface TicketStatusState extends EntityState<TicketStatus> {
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({
    name: 'ticket-status'
})
export class TicketStatusStore extends EntityStore<TicketStatusState> {
    constructor() {
        super();
    }
}
