import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {bind} from 'helpful-decorators';
import {RouterQuery} from '@datorama/akita-ng-router-store';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'dxa-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    selectedRoute$ = this.routerQuery.select(
        store => store.state.urlAfterRedirects.match(/^\/([\w-]+)/)[1]
    );
    appName = environment.appName;

    menuOpened: boolean;
    temporaryMenuOpened = false;

    menuMode = 'shrink';
    menuRevealMode = 'expand';
    minMenuSize = 0;
    shaderEnabled = false;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private routerQuery: RouterQuery,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.subscribeToScreenSizeChanges();
    }

    subscribeToScreenSizeChanges() {
        this.breakpointObserver.observe([
            Breakpoints.Web
        ])
            .pipe(untilDestroyed(this))
            .subscribe(
            result => this.updateDrawer(result)
            );
    }

    updateDrawer(result: BreakpointState) {
        const isDesktop = result.matches;

        this.menuMode = isDesktop ? 'shrink' : 'overlap';
        this.menuRevealMode = !isDesktop ? 'slide' : 'expand';
        this.minMenuSize = !isDesktop ? 0 : 60;
        this.shaderEnabled = !isDesktop;
        this.menuOpened = isDesktop;
    }

    @bind
    toggleMenu(e) {
        this.menuOpened = !this.menuOpened;
        e.event.stopPropagation();
    }

    get hideMenuAfterNavigation() {
        return this.menuMode === 'overlap' || this.temporaryMenuOpened;
    }

    get showMenuAfterClick() {
        return !this.menuOpened;
    }

    navigationChanged(event) {
        const path = event.itemData.path,
            pointerEvent = event.event;

        if (path && this.menuOpened) {
            if (event.node.selected) {
                pointerEvent.preventDefault();
            } else {
                this.router.navigate([path]);
            }

            if (this.hideMenuAfterNavigation) {
                this.temporaryMenuOpened = false;
                this.menuOpened = false;
                pointerEvent.stopPropagation();
            }
        } else {
            pointerEvent.preventDefault();
        }
    }

    navigationClick() {
        if (this.showMenuAfterClick) {
            this.temporaryMenuOpened = true;
            this.menuOpened = true;
        }
    }

}
