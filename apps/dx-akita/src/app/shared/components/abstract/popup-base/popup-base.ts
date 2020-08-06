import {EventEmitter, Input, Output} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AppInjector} from '../../../services';

export abstract class PopupBase {

    private isVisibleValue = false;
    protected breakpointObserver: BreakpointObserver;

    constructor() {
        this.breakpointObserver = AppInjector.getService(BreakpointObserver);
    }

    @Input()
    get isVisible() {
        return this.isVisibleValue;
    }
    set isVisible(value) {
        if (value !== this.isVisibleValue) {
            this.isVisibleValue = value;
            this.isVisibleChange.emit(value);
        }
    }

    @Output()
    isVisibleChange = new EventEmitter<boolean>();

    get isFullscreen() {
        return this.breakpointObserver.isMatched(Breakpoints.Handset);
    }

}
