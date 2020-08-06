import {Component} from '@angular/core';
import {TicketsStore} from '../state/tickets.store';
import {TicketStatusFilter} from '../state/ticket.model';

@Component({
    selector: 'dxa-ticket-main-toolbar',
    templateUrl: './main-toolbar.component.html',
    styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent {

    isAddPopupVisible = false;

    constructor(
        private ticketsStore: TicketsStore
    ) {}

    filterItemClick(e) {
        const clickedFilter: string = e.itemData.text;

        this.ticketsStore.updateStatusFilter(TicketStatusFilter[clickedFilter]);
    }

}
