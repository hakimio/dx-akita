import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TokenService} from './token';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {mergeMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationStore} from '../state/authentication.store';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    private readonly EXCLUDED_PATHS = ['/authentication/login', '/authentication/token'];

    constructor(
        private tokenService: TokenService,
        private authenticationStore: AuthenticationStore,
        private router: Router
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (this.isExcludedUrl(request.url)) {
            return next.handle(request);
        }

        return fromPromise(this.tokenService.getAccessToken())
            .pipe(
                mergeMap(token => {
                    if (token) {
                        const headers = request.headers.set('Authorization', `Bearer ${token}`),
                            authorizedRequest = request.clone({
                                headers
                            });

                        return next.handle(authorizedRequest);
                    } else {
                        this.authenticationStore.setIsLoggedIn(false);
                        this.router.navigate(['/log-in'], {
                            skipLocationChange: true
                        });

                        return throwError('Not authorized');
                    }
                })
            );
    }

    private isExcludedUrl(url: string) {
        const isApiUrl = url.startsWith(environment.apiUrl),
            isExcludedPath = this.EXCLUDED_PATHS
                .find(path => url.includes(path));

        return !isApiUrl || isExcludedPath;
    }

}
