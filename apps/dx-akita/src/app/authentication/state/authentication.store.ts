import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {TokenService} from '../services/token';
import {UsersService} from './users/users.service';

export interface AuthenticationData {
    isLoggedIn: boolean;
    userId?: number;
}

export function createInitialState(): AuthenticationData {
    return {
        isLoggedIn: false,
        userId: null
    };
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({
    name: 'authentication'
})
export class AuthenticationStore extends Store<AuthenticationData> {

    constructor(
        private readonly tokenService: TokenService,
        private readonly userService: UsersService
    ) {
        super(createInitialState());
    }

    async setIsLoggedIn(value: boolean): Promise<void> {
        const prevValue = this.getIsLoggedIn();

        if (value === prevValue) {
            return;
        }

        const userId = value ? await this.tokenService.getUserId() : null;

        this.update({
            isLoggedIn: value,
            userId
        });

        if (value) {
            this.userService.load().subscribe();
        }
    }

    getIsLoggedIn(): boolean {
        return this.getValue().isLoggedIn;
    }

}
