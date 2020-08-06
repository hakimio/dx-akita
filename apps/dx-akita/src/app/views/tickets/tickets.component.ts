import {Component, OnInit} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {DxStoreManager} from '../../shared/services/store/dx-store-manager/dx-store-manager';
import {Ticket, TicketStatusFilter} from './state/ticket.model';
import {TicketsService} from './state/tickets.service';
import {TicketStatusService} from './state/ticket-status/ticket-status.service';
import {TicketStatusQuery} from './state/ticket-status/ticket-status.query';
import {TicketsQuery} from './state/tickets.query';
import {DxFilter, DxFilterExpression} from '../../shared/services/store/query-builder/query-builder.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ProjectsQuery} from '../projects/state/projects.query';
import {combineQueries} from '@datorama/akita';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@UntilDestroy()
@Component({
    selector: 'dxa-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

    ticketDS: DataSource;
    isDrawerOpen: boolean;

    constructor(
        private readonly ticketStatusService: TicketStatusService,
        private readonly ticketStatusQuery: TicketStatusQuery,
        private readonly ticketsQuery: TicketsQuery,
        private readonly projectsQuery: ProjectsQuery,
        private breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit(): void {
        this.initTicketDataSource();
        this.loadTicketStatus();
        this.subscribeToFilterUpdates();
    }

    initTicketDataSource() {
        const ticketStore = DxStoreManager.getOrCreateStore<Ticket>(TicketsService);

        this.ticketDS = new DataSource({
            store: ticketStore
        });
    }

    loadTicketStatus() {
        if (!this.ticketStatusQuery.getHasCache()) {
            this.ticketStatusService.load().subscribe();
        }
    }

    subscribeToFilterUpdates() {
        combineQueries([
            this.ticketsQuery.statusFilter$,
            this.projectsQuery.selectedProjectId$
        ])
            .pipe(untilDestroyed(this))
            .subscribe(
                ([statusFilter, projectId]) => this.updateFilters(statusFilter, projectId)
            );
    }

    updateFilters(statusFilter: TicketStatusFilter, projectId: number) {
        const dxStatusFilter: DxFilter = ['ticketStatusId', '=', statusFilter],
            dxProjectFilter: DxFilter = ['projectId', '=', projectId],
            anyStatus = statusFilter === TicketStatusFilter.All,
            combinedFilter: DxFilterExpression = anyStatus ? dxProjectFilter : [dxStatusFilter, dxProjectFilter];

        this.ticketDS.filter(combinedFilter);
        this.ticketDS.load();
    }

    showSidePanel() {
        const isMobile = this.breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.TabletPortrait]);

        if (isMobile) {
            this.isDrawerOpen = true;
        }
    }

}
