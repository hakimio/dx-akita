import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Ticket, TicketStatusFilter} from './ticket.model';

export interface TicketsState extends EntityState<Ticket> {
    focusedId: number;
    ui: TicketsUiState;
}

export interface TicketsUiState {
    searchText: string;
    statusFilter: TicketStatusFilter;
}

const initialState: Partial<TicketsState> = {
    ui: {
        searchText: '',
        statusFilter: TicketStatusFilter.Open
    }
};

@Injectable({
    providedIn: 'root'
})
@StoreConfig({
    name: 'tickets'
})
export class TicketsStore extends EntityStore<TicketsState> {

    constructor() {
        super(initialState);
    }

    updateSearchText(text: string) {
        this.updateUiProperty('searchText', text);
    }

    updateStatusFilter(statusFilter: TicketStatusFilter) {
        this.updateUiProperty('statusFilter', statusFilter);
    }

    private updateUiProperty(property: keyof TicketsUiState, value: any) {
        this.update(state => ({
                ui: {
                    ...state.ui,
                    [property]: value
                }
            })
        );
    }

}
