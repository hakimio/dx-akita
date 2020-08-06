import {Injector} from '@angular/core';
import {Type} from '@angular/core';

export class AppInjector {

    private static injector: Injector;

    static setInjector(injector: Injector) {
        AppInjector.injector = injector;
    }

    static getService<T>(serviceClasss: Type<T>): T {
        return this.injector.get(serviceClasss);
    }

}
