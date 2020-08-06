import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TicketsService} from '../../state/tickets.service';
import {confirm} from 'devextreme/ui/dialog';
import {Ticket} from '../../state/ticket.model';

@Component({
    selector: 'dxa-ticket-side-panel-toolbar',
    templateUrl: './side-panel-toolbar.component.html',
    styleUrls: ['./side-panel-toolbar.component.scss']
})
export class SidePanelToolbarComponent {

    @Output()
    editClick = new EventEmitter<void>();

    @Input()
    ticket: Ticket;

    constructor(
        private readonly ticketsService: TicketsService
    ) {}

    async deleteClick() {
        const confirmed = await confirm('Are you sure you want to delete this ticket?', 'Confirm delete');

        if (confirmed) {
            this.ticketsService.delete(this.ticket.id).subscribe();
        }
    }

}
