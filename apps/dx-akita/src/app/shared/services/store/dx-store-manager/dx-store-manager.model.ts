import CustomStore, {CustomStoreOptions} from 'devextreme/data/custom_store';
import {DxLoadOptions} from '../query-builder/query-builder.model';
import {LoadResult} from '../base-store/base-store.model';

export class DxStore<T> extends CustomStore {
    constructor(options: DxStoreOptions<T>) {
        super(options);
    }
}

export interface DxStoreOptions<T> extends CustomStoreOptions {
    load: (loadOptions: DxLoadOptions) => Promise<LoadResult<T>>;
    byKey: (id: number) => Promise<T>;
    insert: (data: Partial<T>) => Promise<T>;
    update: (id: number, data: Partial<T>) => Promise<T>;
    remove: (id: number) => Promise<void>;
}

export enum DxStoreChangeType {
    Insert = 'insert',
    Update = 'update',
    Remove = 'remove'
}

export interface DxStoreChange {
    type: DxStoreChangeType;
    data?: any;
    key?: number;
    index?: number;
}
