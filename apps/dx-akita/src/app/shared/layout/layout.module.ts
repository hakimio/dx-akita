import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { NavigationHeaderComponent } from './navigation-header/navigation-header.component';
import {DxDrawerModule, DxDropDownButtonModule, DxToolbarModule, DxTreeViewModule} from 'devextreme-angular';
import {RouterModule} from '@angular/router';
import {LayoutModule as CdkLayoutModule} from '@angular/cdk/layout';
import {UserPanelComponent} from './user-panel/user-panel.component';

@NgModule({
    declarations: [
        NavigationComponent,
        NavigationMenuComponent,
        NavigationHeaderComponent,
        UserPanelComponent
    ],
    imports: [
        CommonModule,
        DxTreeViewModule,
        DxDrawerModule,
        DxToolbarModule,
        RouterModule,
        CdkLayoutModule,
        DxDropDownButtonModule
    ],
    exports: [
        NavigationComponent
    ]
})
export class LayoutModule {}
