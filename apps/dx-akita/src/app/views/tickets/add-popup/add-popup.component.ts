import {Component} from '@angular/core';
import {PopupBase} from '../../../shared/components/abstract';
import dxPopover from 'devextreme/ui/popover';

@Component({
    selector: 'dxa-ticket-add-popup',
    templateUrl: './add-popup.component.html',
    styleUrls: ['./add-popup.component.scss']
})
export class AddPopupComponent extends PopupBase {

    reducePopupPadding(e) {
        const popover: dxPopover = e.component,
            content = <HTMLElement><unknown>popover.content();

        content.style.padding = '0';
    }

}
