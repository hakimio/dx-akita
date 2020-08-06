import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {UsersQuery} from '../../../authentication/state/users/users.query';
import {TicketStatusQuery} from '../state/ticket-status/ticket-status.query';
import {TicketStatusService} from '../state/ticket-status/ticket-status.service';
import {formatDate} from 'devextreme/localization';
import {TicketsQuery} from '../state/tickets.query';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {PersistantFocusDataGrid} from '../../../shared/components/abstract';
import {TicketsStore} from '../state/tickets.store';
import {DxDataGridComponent} from 'devextreme-angular';

@UntilDestroy()
@Component({
    selector: 'dxa-ticket-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent extends PersistantFocusDataGrid implements OnInit {

    users$ = this.usersQuery.selectAll();
    ticketStatus$ = this.ticketStatusQuery.selectAll();

    @Input()
    ticketDS: DataSource;

    @Output()
    rowClick = new EventEmitter<void>();

    @ViewChild(DxDataGridComponent)
    dataGrid: DxDataGridComponent;

    constructor(
        private readonly usersQuery: UsersQuery,
        private readonly ticketStatusQuery: TicketStatusQuery,
        private readonly ticketStatusService: TicketStatusService,
        private readonly ticketsQuery: TicketsQuery,
        protected readonly ticketsStore: TicketsStore
    ) {
        super(ticketsStore);
    }

    ngOnInit(): void {
        this.subscribeToSearchTextChange();
        super.ngOnInit();
    }

    subscribeToSearchTextChange() {
        this.ticketsQuery.searchText$
            .pipe(untilDestroyed(this))
            .subscribe(text => this.updateSearchText(text));
    }

    updateSearchText(text: string) {
        const dataGridInstance = this.dataGrid?.instance;

        if (dataGridInstance) {
            dataGridInstance.searchByText(text);
        }
    }

    dateFormatter(date: string) {
        return date && formatDate(new Date(date), 'dd/MM/yyyy');
    }

}
