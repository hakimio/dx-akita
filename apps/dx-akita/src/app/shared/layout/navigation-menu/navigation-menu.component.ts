import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {MenuItem} from './navigation-menu.model';
import {routes} from '../../../app-routing.module';
import dxTreeView from 'devextreme/ui/tree_view';
import * as events from 'devextreme/events';
import {DxTreeViewComponent} from 'devextreme-angular';

@Component({
    selector: 'dxa-navigation-menu',
    templateUrl: './navigation-menu.component.html',
    styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements AfterViewInit, OnDestroy {

    menuItems: MenuItem[] = routes
        .filter(
            route => !!route.data
        )
        .map(
            route => ({
                text: route.data.title,
                icon: route.data.icon,
                path: route.path
            })
        );

    @Output()
    selectedItemChanged = new EventEmitter<any>();

    @Output()
    openMenu = new EventEmitter<void>();

    @ViewChild(DxTreeViewComponent, {static: true})
    menu: DxTreeViewComponent;

    private selectedItemValue: string;

    @Input()
    get selectedItem() {
        return this.selectedItemValue;
    }
    set selectedItem(value: string) {
        if (this.menu.instance) {
            this.menu.instance.selectItem(value);
        }
        this.selectedItemValue = value;

        const menuInstance = this.menu.instance;

        if (menuInstance) {
            menuInstance.selectItem(value);
        }
    }

    private compactModeValue = false;

    @Input()
    get compactMode() {
        return this.compactModeValue;
    }
    set compactMode(value) {
        this.compactModeValue = value;

        const menuInstance = this.menu.instance;

        if (!menuInstance) {
            return;
        }

        if (value) {
            menuInstance.collapseAll();
        } else {
            menuInstance.expandItem(this.selectedItem);
        }
    }

    constructor(
        private elementRef: ElementRef
    ) {}

    ngAfterViewInit() {
        const menuElement = this.elementRef.nativeElement;

        events.on(menuElement, 'dxclick', () => this.openMenu.emit());
    }

    ngOnDestroy() {
        const menuElement = this.elementRef.nativeElement;

        events.off(menuElement, 'dxclick');
    }

    onMenuItemClick(event: any) {
        this.selectedItemChanged.emit(event);
        this.collapseOtherMenuItems(event);
    }

    collapseOtherMenuItems(event) {
        const treeView: dxTreeView = event.component,
            items = treeView.option('items'),
            expandedItem = event.itemData;

        for (const item of items) {
            if (item !== expandedItem && item.items && !item.items.includes(expandedItem)) {
                treeView.collapseItem(item);
            }
        }
    }

}
