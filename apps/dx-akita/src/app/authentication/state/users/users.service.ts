import {Injectable} from '@angular/core';
import {UsersStore, UsersState} from './users.store';
import {BaseStoreService} from '../../../shared/services/store';

@Injectable({
    providedIn: 'root'
})
export class UsersService extends BaseStoreService<UsersState> {

    constructor(
        protected store: UsersStore
    ) {
        super(store);
    }

}
