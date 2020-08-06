import {Injectable} from '@angular/core';
import {TicketsStore, TicketsState} from './tickets.store';
import {BaseStoreService} from '../../../shared/services/store';

@Injectable({
    providedIn: 'root'
})
export class TicketsService extends BaseStoreService<TicketsState> {

    constructor(
        protected store: TicketsStore
    ) {
        super(store);
    }

}
