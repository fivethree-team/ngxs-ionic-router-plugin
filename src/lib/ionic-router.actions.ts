import {
    NavigationOptions,
    AnimationOptions
} from '@ionic/angular/dist/providers/nav-controller';
import { UrlTree } from '@angular/router';

export class NavigateRoot {
    static readonly type = '[Router] NavigateRoot';
    constructor(public readonly path: string | UrlTree | any[],
        public readonly options?: NavigationOptions) { }
}

export class NavigateForward {
    static readonly type = '[Router] NavigateForward';
    constructor(public readonly path: string | UrlTree | any[],
        public readonly options?: NavigationOptions) { }
}

export class NavigateBackward {
    static readonly type = '[Router] NavigateBackward';
    constructor(public readonly path: string | UrlTree | any[],
        public readonly options?: NavigationOptions) { }
}

export class NavigateBack {
    static readonly type = '[Router] NavigateBack';
    constructor(public readonly options?: AnimationOptions) { }
}
