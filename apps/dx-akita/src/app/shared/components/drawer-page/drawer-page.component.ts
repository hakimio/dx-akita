import {AfterViewChecked, Component, ContentChild, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {delay} from 'rxjs/operators';
import {DrawerPageMainContentComponent} from './drawer-page-main-content/drawer-page-main-content.component';
import {DrawerPageSidePanelComponent} from './drawer-page-side-panel/drawer-page-side-panel.component';
import {DxDrawerComponent} from 'devextreme-angular';

@UntilDestroy()
@Component({
    selector: 'dxa-drawer-page',
    templateUrl: './drawer-page.component.html',
    styleUrls: ['./drawer-page.component.scss']
})
export class DrawerPageComponent implements OnInit, AfterViewChecked {

    private menuOpenedValue = true;
    isMobile: boolean;
    windowResized = false;

    @ContentChild(DrawerPageMainContentComponent)
    mainContentCmp: DrawerPageMainContentComponent;

    @ContentChild(DrawerPageSidePanelComponent)
    sidePanelCmp: DrawerPageSidePanelComponent;

    @Input()
    drawerTitle: string;

    @Input()
    drawerWidth = 360;

    @ViewChild(DxDrawerComponent)
    drawer: DxDrawerComponent;

    @Input()
    get menuOpened() {
        return this.menuOpenedValue;
    }
    set menuOpened(value) {
        if (value !== this.menuOpenedValue) {
            this.menuOpenedValue = value;
            this.menuOpenedChange.emit(value);
        }
    }

    @Output()
    menuOpenedChange = new EventEmitter<boolean>();

    constructor(
        private breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit(): void {
        this.subscribeToScreenSizeChanges();
    }

    ngAfterViewChecked() {
        // Following is a workaround for disappearing DX components when window size changes from desktop to mobile
        if (this.windowResized) {
            this.sidePanelCmp.renderTemplate();
            this.drawer.instance.repaint();
            this.windowResized = false;
        }
    }

    subscribeToScreenSizeChanges() {
        this.breakpointObserver.observe([
                Breakpoints.Handset,
                Breakpoints.TabletPortrait
            ])
            .pipe(
                // Folowing is needed to avoid annoying "Expression has changed after it was checked" errors
                delay(0),
                untilDestroyed(this)
            )
            .subscribe(
                result => this.updateDrawer(result)
            );
    }

    updateDrawer(result: BreakpointState) {
        this.isMobile = result.matches;
        this.menuOpened = !this.isMobile;

        this.windowResized = true;
    }

}
