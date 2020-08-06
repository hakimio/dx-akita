import dxDataGrid, {dxDataGridRowObject} from 'devextreme/ui/data_grid';
import {EntityStore} from '@datorama/akita';
import {
    filterStore,
    HttpMethod,
    NgEntityServiceNotifier,
    ofType
} from '@datorama/akita-ng-entity-service';
import {untilDestroyed} from '@ngneat/until-destroy';
import {AppInjector} from '../../../services';
import {filter} from 'rxjs/operators';
import {OnInit} from '@angular/core';

export abstract class PersistantFocusDataGrid implements OnInit {

    private rowInsertedOrRemoved = false;

    protected constructor(
        protected entityStore: EntityStore
    ) {}

    ngOnInit() {
        const notifier = AppInjector.getService(NgEntityServiceNotifier);

        notifier.action$
            .pipe(
                untilDestroyed(this),
                filterStore(this.entityStore.storeName),
                ofType('success'),
                filter(action => [HttpMethod.POST, HttpMethod.DELETE].includes(action.method))
            )
            .subscribe(
                () => this.rowInsertedOrRemoved = true
            );
    }

    onFocusedRowChanged(e) {
        const selectedRow: dxDataGridRowObject = e.row,
            focusedId = selectedRow ? selectedRow.data.id : null;

        this.entityStore.update({focusedId});
    }

    private focusFirstRow(e) {
        const grid: dxDataGrid = e.component,
            focusedRowIndex = grid.option('focusedRowIndex'),
            rowsCount = grid.getVisibleRows().length;

        if (focusedRowIndex < 0 && rowsCount) {
            grid.option('focusedRowIndex', 0);
        }
    }

    onFocusedRowOptionChange(e) {
        if (e.name === 'focusedRowIndex') {
            this.focusFirstRow(e);
        }
    }

    updateFocusedRowOnContentReady(e) {
        const dataGrid: dxDataGrid = e.component,
            rowsCount = dataGrid.getVisibleRows().length,
            focusedId = this.entityStore.getValue().focusedId;

        if (this.rowInsertedOrRemoved) {
            dataGrid.option('focusedRowIndex', -1);
            this.rowInsertedOrRemoved = false;
        } else if (!rowsCount) {
            this.entityStore.update({
                focusedId: null
            });
        } else if (rowsCount && !focusedId) {
            this.entityStore.update({
                focusedId: dataGrid.option('focusedRowKey')
            });
        }
    }

}
