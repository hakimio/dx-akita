import {BaseStoreService} from '..';
import {DxStore} from './dx-store-manager.model';
import {memo} from 'helpful-decorators';
import {Type} from '@angular/core';
import {AppInjector} from '../..';

export class DxStoreManager {

    @memo()
    static getOrCreateStore<T, S extends BaseStoreService = BaseStoreService>(storeClass: Type<S>): DxStore<T> {
        const storeService = AppInjector.getService(storeClass);

        return new DxStore<T>({
            key: 'id',
            useDefaultSearch: true,

            load: loadOptions => storeService.load<T>(loadOptions).toPromise(),
            byKey: id => storeService.get<T>(id).toPromise(),
            insert: data => storeService.add<T>(data).toPromise(),
            update: (id, data) => storeService.update<T>(id, data).toPromise(),
            remove: id => storeService.delete<void>(id).toPromise()
        });
    }

}
