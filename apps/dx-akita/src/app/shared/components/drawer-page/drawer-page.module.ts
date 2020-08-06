import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DrawerPageComponent} from './drawer-page.component';
import {DxBoxModule, DxButtonModule, DxDrawerModule, DxToolbarModule} from 'devextreme-angular';
import { DrawerPageMainContentComponent } from './drawer-page-main-content/drawer-page-main-content.component';
import { DrawerPageSidePanelComponent } from './drawer-page-side-panel/drawer-page-side-panel.component';

@NgModule({
    declarations: [
        DrawerPageComponent,
        DrawerPageMainContentComponent,
        DrawerPageSidePanelComponent
    ],
    exports: [
        DrawerPageComponent,
        DrawerPageMainContentComponent,
        DrawerPageSidePanelComponent
    ],
    imports: [
        CommonModule,
        DxDrawerModule,
        DxToolbarModule,
        DxButtonModule,
        DxBoxModule
    ]
})
export class DrawerPageModule {}
