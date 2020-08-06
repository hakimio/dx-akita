import {Injectable} from '@angular/core';
import {JwtPayload, Tokens} from './token.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private readonly TOKEN_STORAGE_KEY = 'auth_tokens';
    private readonly REFRESH_WINDOW_SECONDS = 60;

    private jwtHelper = new JwtHelperService();

    constructor(
        private http: HttpClient
    ) {}

    setTokens(tokens: Tokens) {
        localStorage.setItem(this.TOKEN_STORAGE_KEY, JSON.stringify(tokens));
    }

    private getTokens(): Tokens | null {
        const tokenJSON = localStorage.getItem(this.TOKEN_STORAGE_KEY);

        return tokenJSON ? <Tokens>JSON.parse(tokenJSON) : null;
    }

    getRefreshToken(): string {
        const tokens = this.getTokens();

        return tokens.refreshToken;
    }

    async getAccessToken(): Promise<string | null> {
        let tokens = this.getTokens();

        if (!tokens) {
            return null;
        }

        const accessToken = tokens.accessToken;

        if (!this.isTokenAboutToExpire(accessToken)) {
            return accessToken;
        }

        tokens = await this.refreshTokens(accessToken, tokens.refreshToken).toPromise();

        return tokens && tokens.accessToken;
    }

    async getUserId(): Promise<number | null> {
        const accessToken = await this.getAccessToken();

        if (!accessToken) {
            return null;
        }

        const jwtPayload: JwtPayload = this.jwtHelper.decodeToken(accessToken);

        return +jwtPayload.sub;
    }

    removeTokens() {
        localStorage.removeItem(this.TOKEN_STORAGE_KEY);
    }

    private refreshTokens(accessToken: string, refreshToken: string): Observable<Tokens | null> {
        return this.http.get<Tokens | null>( environment.apiUrl + 'authentication/token', {
            params: {
                refresh_token: refreshToken
            },
            headers: {
                // Expired access token is needed here anyway since backend uses it to get user id
                Authorization: `Bearer ${accessToken}`
            }
        })
            .pipe(
                catchError(
                    () => of(null)
                ),
                tap(
                    tokens => this.setTokens(tokens)
                )
            );
    }

    private isTokenAboutToExpire(accessToken: string): boolean {
        return this.jwtHelper.isTokenExpired(accessToken, this.REFRESH_WINDOW_SECONDS);
    }

}
