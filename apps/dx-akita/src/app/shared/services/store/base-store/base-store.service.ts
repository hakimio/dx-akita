import {EntityState, getEntityType, getIDType} from '@datorama/akita';
import {HttpMethod, NgEntityService} from '@datorama/akita-ng-entity-service';
import {HttpGetConfig} from '@datorama/akita-ng-entity-service/lib/types';
import {Observable, throwError} from 'rxjs';
import {DxLoadOptions} from '../query-builder/query-builder.model';
import {QueryBuilder} from '../query-builder/query-builder.service';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpGetResponse, LoadResult} from './base-store.model';
import {map, tap} from 'rxjs/operators';
import {DxStoreChange, DxStoreChangeType} from '../dx-store-manager/dx-store-manager.model';
import {DxStoreManager} from '../dx-store-manager/dx-store-manager';

export abstract class BaseStoreService<S extends EntityState = any, EntityType = getEntityType<S>> extends NgEntityService<S> {

    public static readonly MAX_RESULTS_LIMIT = 1e3;

    load<T = EntityType>(loadOptions: DxLoadOptions = {}): Observable<LoadResult<T>> {
        let paginatedResult = true;

        if (!loadOptions.take) {
            loadOptions.take = BaseStoreService.MAX_RESULTS_LIMIT;
            paginatedResult = false;
        }

        const params = QueryBuilder.build(loadOptions),
            config: HttpGetConfig = {
                params,
                skipWrite: true
            };

        return super.get<HttpGetResponse>(config)
            .pipe(
                map(
                    response => {
                        // TODO: create utility for cloning stuff
                        const entities = response.data.map(item => ({...item}));

                        this.store.upsertMany(entities);

                        return !paginatedResult ? response.data : {
                            data: response.data,
                            totalCount: response.total
                        };
                    }
                )
            );
    }

    add<T>(entity: getEntityType<S>): Observable<T> {
        return super.add<T>(entity)
            .pipe(
                tap(
                    data => this.pushChangeToDxStore({
                        type: DxStoreChangeType.Insert,
                        data,
                        index: 0
                    })
                )
            );
    }

    update<T>(id: getIDType<S>, entity: Partial<getEntityType<S>>): Observable<T> {
        return super.update<T>(id, entity)
            .pipe(
                tap(
                    data => this.pushChangeToDxStore({
                        type: DxStoreChangeType.Update,
                        data,
                        key: id
                    })
                )
            );
    }

    delete<T>(id: getIDType<S>): Observable<T> {
        return super.delete<T>(id)
            .pipe(
                tap(
                    () => this.pushChangeToDxStore({
                        type: DxStoreChangeType.Remove,
                        key: id
                    })
                )
            );
    }

    private pushChangeToDxStore(change: DxStoreChange) {
        const store = DxStoreManager.getOrCreateStore(<any>this.constructor);

        store.push([change]);
    }

    protected handleError(method: HttpMethod, error: HttpErrorResponse): Observable<never> {
        const message = error.error?.message ?? 'Server error';

        return throwError(message);
    }

}
