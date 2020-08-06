import {Component, EventEmitter, Output} from '@angular/core';
import {TicketsStore} from '../../state/tickets.store';
import {debounce} from 'helpful-decorators';

@Component({
    selector: 'dxa-ticket-data-grid-toolbar',
    templateUrl: './data-grid-toolbar.component.html',
    styleUrls: ['./data-grid-toolbar.component.scss']
})
export class DataGridToolbarComponent {

    @Output()
    menuBtnClick = new EventEmitter<void>();

    constructor(
        private ticketsStore: TicketsStore
    ) {}

    @debounce(300)
    searchTextChange(text: string) {
        if (text?.length === 1) {
            return;
        }

        this.ticketsStore.updateSearchText(text);
    }
}
