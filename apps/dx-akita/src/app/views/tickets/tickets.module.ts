import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataGridComponent} from './data-grid/data-grid.component';
import {SidePanelComponent} from './side-panel/side-panel.component';
import {MainToolbarComponent} from './main-toolbar/main-toolbar.component';
import {TicketsRoutingModule} from './tickets-routing.module';
import {
    DxButtonGroupModule,
    DxButtonModule,
    DxDataGridModule, DxGalleryModule,
    DxHtmlEditorModule,
    DxLoadPanelModule,
    DxLookupModule,
    DxPopupModule,
    DxScrollViewModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxToolbarModule
} from 'devextreme-angular';
import {DataGridToolbarComponent} from './data-grid/data-grid-toolbar/data-grid-toolbar.component';
import {TicketsComponent} from './tickets.component';
import {ProjectSelectorModule} from '../projects/project-selector/project-selector.module';
import {AddEditFormComponent} from './add-edit-form/add-edit-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormFieldModule, FormLabelModule} from '../../shared/components';
import {AddPopupComponent} from './add-popup/add-popup.component';
import {DrawerPageModule} from '../../shared/components/drawer-page/drawer-page.module';
import { SidePanelToolbarComponent } from './side-panel/side-panel-toolbar/side-panel-toolbar.component';
import { SidePanelMainViewComponent } from './side-panel/side-panel-main-view/side-panel-main-view.component';

@NgModule({
    declarations: [
        DataGridComponent,
        SidePanelComponent,
        MainToolbarComponent,
        DataGridToolbarComponent,
        TicketsComponent,
        AddEditFormComponent,
        AddPopupComponent,
        SidePanelToolbarComponent,
        SidePanelMainViewComponent
    ],
    exports: [
        TicketsComponent
    ],
    imports: [
        CommonModule,
        TicketsRoutingModule,
        DxDataGridModule,
        DxToolbarModule,
        DxTextBoxModule,
        DxButtonModule,
        DxSelectBoxModule,
        DxHtmlEditorModule,
        DxButtonGroupModule,
        ProjectSelectorModule,
        ReactiveFormsModule,
        FormFieldModule,
        DxPopupModule,
        DxLoadPanelModule,
        DrawerPageModule,
        DxScrollViewModule,
        DxLookupModule,
        FormLabelModule,
        DxGalleryModule
    ]
})
export class TicketsModule {}
