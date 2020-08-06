import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterQuery} from '@datorama/akita-ng-router-store';
import {bind} from 'helpful-decorators';

@Component({
    selector: 'dxa-navigation-header',
    templateUrl: './navigation-header.component.html',
    styleUrls: ['./navigation-header.component.scss']
})
export class NavigationHeaderComponent {

    @Output()
    menuToggle = new EventEmitter<void>();

    @Input()
    menuToggleEnabled = false;

    title$ = this.routerQuery.selectData<string>('title');

    constructor(
        private routerQuery: RouterQuery
    ) {
    }

    @bind
    emitMenuToggle() {
        this.menuToggle.emit();
    }

}
