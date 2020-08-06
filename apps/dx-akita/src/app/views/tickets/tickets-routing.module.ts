import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {QuicklinkModule} from 'ngx-quicklink';
import {TicketsComponent} from './tickets.component';

const routes: Routes = [{
    path: '',
    component: TicketsComponent,
    pathMatch: 'full'
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        QuicklinkModule
    ],
    exports: [RouterModule]
})
export class TicketsRoutingModule {}
