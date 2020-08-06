import {Component, TemplateRef, ViewChild} from '@angular/core';

@Component({
    selector: 'dxa-drawer-page-main-content',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `
})
export class DrawerPageMainContentComponent {

    @ViewChild(TemplateRef, { static: true })
    template: TemplateRef<any>;

}
