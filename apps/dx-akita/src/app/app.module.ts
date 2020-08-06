import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpMethod, NG_ENTITY_SERVICE_CONFIG, NgEntityServiceGlobalConfig} from '@datorama/akita-ng-entity-service';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {AkitaNgRouterStoreModule} from '@datorama/akita-ng-router-store';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AuthenticationModule} from './authentication/authentication.module';
import {CardModule} from './shared/components';
import {LayoutModule} from './shared/layout/layout.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        environment.production ? [] : AkitaNgDevtools.forRoot(),
        AkitaNgRouterStoreModule,
        AppRoutingModule,
        AuthenticationModule,
        CardModule,
        LayoutModule
    ],
    providers: [{
        provide: NG_ENTITY_SERVICE_CONFIG,
        useValue: <NgEntityServiceGlobalConfig>{
            baseUrl: '/api',
            httpMethods: {
                PUT: HttpMethod.PATCH
            }
        }
    }],
    bootstrap: [AppComponent]
})
export class AppModule {}
