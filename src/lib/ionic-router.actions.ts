import {
  NavigationCancel,
  NavigationError,
  RouterStateSnapshot,
  RoutesRecognized,
  ResolveEnd,
  UrlTree,
} from '@angular/router';

import { RouterTrigger } from './ionic-router.state';
import { AnimationOptions, NavigationOptions } from './symbols';

export class NavigateRoot {
  static readonly type = '[Router] NavigateRoot';
  constructor(
    public readonly path: string | UrlTree | any[],
    public readonly options?: NavigationOptions
  ) {}
}

export class NavigateForward {
  static readonly type = '[Router] NavigateForward';
  constructor(
    public readonly path: string | UrlTree | any[],
    public readonly options?: NavigationOptions
  ) {}
}

export class NavigateBackward {
  static readonly type = '[Router] NavigateBackward';
  constructor(
    public readonly path: string | UrlTree | any[],
    public readonly options?: NavigationOptions
  ) {}
}

export class NavigateBack {
  static readonly type = '[Router] NavigateBack';
  constructor(public readonly options?: AnimationOptions) {}
}

/**
 *
 * Angular Routers internal state events
 *
 */

/**
 * An action dispatched when the router navigates.
 */
export class RouterNavigation<T = RouterStateSnapshot> {
  static readonly type = '[Router] RouterNavigation';
  constructor(
    public routerState: T,
    public event: RoutesRecognized,
    public trigger: RouterTrigger = 'none'
  ) {}
}

/**
 * An action dispatched when the router cancel navigation.
 */
export class RouterCancel<T, V = RouterStateSnapshot> {
  static readonly type = '[Router] RouterCancel';
  constructor(
    public routerState: V,
    public storeState: T,
    public event: NavigationCancel,
    public trigger: RouterTrigger = 'none'
  ) {}
}

/**
 * An action dispatched when the router errors.
 */
export class RouterError<T, V = RouterStateSnapshot> {
  static readonly type = '[Router] RouterError';
  constructor(
    public routerState: V,
    public storeState: T,
    public event: NavigationError,
    public trigger: RouterTrigger = 'none'
  ) {}
}

/**
 * An action dispatched when the `ResolveEnd` event is triggered.
 */
export class RouterDataResolved<T = RouterStateSnapshot> {
  static readonly type = '[Router] RouterDataResolved';
  constructor(
    public routerState: T,
    public event: ResolveEnd,
    public trigger: RouterTrigger = 'none'
  ) {}
}

/**
 * An union type of router actions.
 */
export type RouterAction<T, V = RouterStateSnapshot> =
  | RouterNavigation<V>
  | RouterCancel<T, V>
  | RouterError<T, V>
  | RouterDataResolved<V>;
