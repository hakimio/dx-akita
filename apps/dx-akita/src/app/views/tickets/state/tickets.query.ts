import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {TicketsStore, TicketsState} from './tickets.store';
import {switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TicketsQuery extends QueryEntity<TicketsState> {

    focusedTicket$ = this.select('focusedId')
        .pipe(
            switchMap(id => this.selectEntity(id))
        );
    focusedTicketId$ = this.select('focusedId');

    searchText$ = this.select(state => state.ui.searchText);
    statusFilter$ = this.select(state => state.ui.statusFilter);

    constructor(
        protected store: TicketsStore
    ) {
        super(store);
    }

}
