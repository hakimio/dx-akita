import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {AuthenticationStore} from '../state/authentication.store';
import {Credentials} from '../state/authentication.model';
import {environment} from '../../../environments/environment';
import {TokenService, Tokens} from './token';
import {Observable, throwError} from 'rxjs';
import {setLoading} from '@datorama/akita';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private authenticationStore: AuthenticationStore,
        private tokenService: TokenService,
        private http: HttpClient
    ) {}

    login(credentials: Credentials): Observable<Tokens> {
        this.authenticationStore.setLoading(true);

        return this.http.post<Tokens>(environment.apiUrl + 'authentication/login', credentials)
            .pipe(
                setLoading(this.authenticationStore),
                catchError(
                    (e: HttpErrorResponse) => throwError(e.error?.message ?? 'Server Error')
                ),
                tap(
                    tokens => {
                        this.tokenService.setTokens(tokens);
                        this.authenticationStore.setIsLoggedIn(true);
                    }
                )
            );
    }

    logout(): Observable<void> {
        const refreshToken = this.tokenService.getRefreshToken();

        this.authenticationStore.setIsLoggedIn(false);

        return this.http.post<void>(environment.apiUrl + 'authentication/logout', {
            refreshToken
        }).pipe(
            tap(
                () => this.tokenService.removeTokens()
            )
        );
    }

    async isLoggedIn(): Promise<boolean> {
        const accessToken = await this.tokenService.getAccessToken();

        return !!accessToken;
    }

}
