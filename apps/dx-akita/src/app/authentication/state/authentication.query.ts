import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {AuthenticationData, AuthenticationStore} from './authentication.store';
import {UsersQuery} from './users/users.query';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from './users/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationQuery extends Query<AuthenticationData> {

    isLoggedIn$ = this.select(state => state.isLoggedIn);
    isLoading$ = this.selectLoading();

    user$: Observable<User> = this.usersQuery.selectAll({
        asObject: true
    }).pipe(
        switchMap(
            users => this.select(state => state.userId)
                .pipe(
                    map(
                        userId => users[userId]
                    )
                )
        )
    );

    isLoggedIn() {
        return this.getValue().isLoggedIn;
    }

    constructor(
        protected store: AuthenticationStore,
        private readonly usersQuery: UsersQuery
    ) {
        super(store);
    }

}
