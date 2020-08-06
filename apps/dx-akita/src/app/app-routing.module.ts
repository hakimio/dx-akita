import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './authentication/login/login.component';
import {AuthenticationGuard} from './authentication/services';
import {NgModule} from '@angular/core';
import {QuicklinkModule, QuicklinkStrategy} from 'ngx-quicklink';

export const routes: Routes = [
    {
        path: 'tickets',
        loadChildren: () => import('./views/tickets/tickets.module').then(m => m.TicketsModule),
        canActivate: [AuthenticationGuard],
        data: <RouteData>{
            title: 'Tickets',
            icon: 'material-icons article'
        }
    }, {
        path: 'log-in',
        component: LoginComponent
    }, {
        path: '**',
        redirectTo: 'tickets'
    }
];

export interface RouteData {
    title: string;
    icon?: string;
}

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: QuicklinkStrategy,
            paramsInheritanceStrategy: 'always'
        }),
        QuicklinkModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
