import { NavigationExtras } from '@angular/router';

export class NavigateRoot {
    static get type() {
        // NOTE: Not necessary to declare the type in this way in your code.
        // See https://github.com/ngxs/store/pull/644#issuecomment-436003138
        return '[Router] NavigateRoot';
    }
    constructor(public readonly payload: string,
        public readonly extras?: NavigationExtras) { }
}
export class NavigateForward {
    static readonly type = '[Router] NavigateForward';
    constructor(public readonly payload: string,
        public readonly extras?: NavigationExtras) { }
}
export class NavigateBackward {
    static readonly type = '[Router] NavigateBackward';
    constructor(public readonly payload: string,
        public readonly extras?: NavigationExtras) { }
}

export class NavigateBack {
    static readonly type = '[Router] NavigateBack';
}
