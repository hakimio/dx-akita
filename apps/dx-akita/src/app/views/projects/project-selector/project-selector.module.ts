import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectSelectorComponent} from './project-selector.component';
import {DxSelectBoxModule} from 'devextreme-angular';

@NgModule({
    declarations: [
        ProjectSelectorComponent
    ],
    exports: [
        ProjectSelectorComponent
    ],
    imports: [
        CommonModule,
        DxSelectBoxModule
    ]
})
export class ProjectSelectorModule {
}
