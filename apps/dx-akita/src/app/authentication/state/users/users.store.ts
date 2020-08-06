import {Injectable} from '@angular/core';
import {EntityState, EntityStore, getEntityType, StoreConfig} from '@datorama/akita';
import {User} from './user.model';

export interface UsersState extends EntityState<User> {
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({
    name: 'users'
})
export class UsersStore extends EntityStore<UsersState> {

    constructor() {
        super();
    }

    akitaPreAddEntity(newEntity: User): getEntityType<UsersState> {
        return {
            ...newEntity,
            name: `${newEntity.firstName} ${newEntity.lastName}`
        };
    }

}
