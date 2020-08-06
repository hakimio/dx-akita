import {Component, OnInit, ViewChild} from '@angular/core';
import {TicketsQuery} from '../state/tickets.query';
import {DxGalleryComponent} from 'devextreme-angular';
import {Ticket} from '../state/ticket.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'dxa-ticket-side-panel',
    templateUrl: './side-panel.component.html',
    styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

    focusedTicket: Ticket;

    readonly MAIN_VIEW_INDEX = 0;
    readonly EDIT_FORM_INDEX = 1;

    @ViewChild(DxGalleryComponent)
    galleryComponent: DxGalleryComponent;

    constructor(
        private readonly ticketsQuery: TicketsQuery
    ) {}

    ngOnInit(): void {
        this.ticketsQuery.focusedTicket$
            .pipe(untilDestroyed(this))
            .subscribe(ticket => this.focusedTicket = ticket);
    }

    openEdit() {
        const gallery = this.galleryComponent.instance;

        gallery.goToItem(this.EDIT_FORM_INDEX, true);
    }

    closeEdit() {
        const gallery = this.galleryComponent.instance;

        gallery.goToItem(this.MAIN_VIEW_INDEX, true);
    }
}
