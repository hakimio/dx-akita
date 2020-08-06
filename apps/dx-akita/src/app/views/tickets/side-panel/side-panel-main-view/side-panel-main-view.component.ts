import {Component, Input} from '@angular/core';
import {TicketStatusQuery} from '../../state/ticket-status/ticket-status.query';
import {UsersQuery} from '../../../../authentication/state/users/users.query';
import {TicketsService} from '../../state/tickets.service';
import {Ticket} from '../../state/ticket.model';

@Component({
    selector: 'dxa-ticket-side-panel-main-view',
    templateUrl: './side-panel-main-view.component.html',
    styleUrls: ['./side-panel-main-view.component.scss']
})
export class SidePanelMainViewComponent {

    ticketStatus$ = this.ticketStatusQuery.selectAll();
    users$ = this.usersQuery.selectAll();

    @Input()
    ticket: Ticket;

    constructor(
        private readonly ticketStatusQuery: TicketStatusQuery,
        private readonly usersQuery: UsersQuery,
        private readonly ticketsService: TicketsService
    ) {}

    updateProperty(e, property: string) {
        const curValue = e.selectedItem ? e.selectedItem.id : null,
            prevValue = this.ticket[property];

        if (curValue !== prevValue) {
            this.ticketsService.update(this.ticket.id, {
                [property]: curValue
            }).subscribe();
        }
    }
}
