import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {DxTemplateDirective, DxTemplateHost, IDxTemplateHost} from 'devextreme-angular';

@Component({
    selector: 'dxa-drawer-page-side-panel',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    providers: [DxTemplateHost]
})
export class DrawerPageSidePanelComponent implements IDxTemplateHost {

    @ViewChild(TemplateRef, {static: true})
    template: TemplateRef<any>;

    private dxTemplate: DxTemplateDirective;

    constructor(
        private element: ElementRef,
        private tempalteHost: DxTemplateHost
    ) {
        this.tempalteHost.setHost(this);
    }

    setTemplate(dxTemplate: DxTemplateDirective) {
        this.dxTemplate = dxTemplate;
    }

    renderTemplate() {
        if (this.dxTemplate) {
            this.dxTemplate.render({
                model: null,
                index: 0,
                container: this.element.nativeElement
            });
        }
    }

}
