import { NgZone, Injectable, OnDestroy } from '@angular/core';
import {
  NavigationCancel,
  NavigationError,
  Router,
  RouterStateSnapshot,
  RoutesRecognized,
  ResolveEnd,
  UrlSerializer,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';
import { LocationStrategy, Location } from '@angular/common';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { isAngularInTestMode } from '@ngxs/store/internals';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import {
  RouterAction,
  RouterCancel,
  RouterError,
  RouterNavigation,
  RouterDataResolved,
  NavigateBack,
  NavigateBackward,
  NavigateForward,
  NavigateRoot,
} from './ionic-router.actions';
import { RouterStateSerializer } from './serializer';
import { NavController } from '@ionic/angular';

export interface IonicRouterStateModel<T = RouterStateSnapshot> {
  state?: T;
  navigationId?: number;
  trigger: RouterTrigger;
}

export type RouterTrigger = 'none' | 'router' | 'store';

/**
 * @description Will be provided through Terser global definitions by Angular CLI
 * during the production build. This is how Angular does tree-shaking internally.
 */
declare const ngDevMode: boolean;

@State<IonicRouterStateModel>({
  name: 'ionicRouter',
  defaults: {
    state: undefined,
    navigationId: undefined,
    trigger: 'none',
  },
})
@Injectable()
export class IonicRouterState implements OnDestroy {
  /**
   * Determines how navigation was performed by the `RouterState` itself
   * or outside via `new Navigate(...)`
   */
  private _trigger: RouterTrigger = 'none';

  /**
   * That's the serialized state from the `Router` class
   */
  private _routerState: RouterStateSnapshot | null = null;

  /**
   * That's the value of the `RouterState` state
   */
  private _storeState: IonicRouterStateModel | null = null;

  private _lastRoutesRecognized: RoutesRecognized = null!;

  private _subscription = new Subscription();

  @Selector()
  static state<T = RouterStateSnapshot>(state: IonicRouterStateModel<T>) {
    return state && state.state;
  }

  @Selector()
  static url(state: IonicRouterStateModel): string | undefined {
    return state && state.state && state.state.url;
  }

  constructor(
    private _store: Store,
    private _router: Router,
    private _navCtrl: NavController,
    private _serializer: RouterStateSerializer<RouterStateSnapshot>,
    private _ngZone: NgZone,
    private _urlSerializer: UrlSerializer,
    private _locationStrategy: LocationStrategy,
    private _location: Location
  ) {
    this.setUpRouterEventsListener();
    this.checkInitialNavigationOnce();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  @Action(NavigateRoot)
  navigateRoot(_: StateContext<IonicRouterStateModel>, action: NavigateRoot) {
    this._ngZone.run(() =>
      this._navCtrl.navigateRoot(action.path, action.options)
    );
  }

  @Action(NavigateForward)
  navigateForward(
    _: StateContext<IonicRouterStateModel>,
    action: NavigateForward
  ) {
    this._ngZone.run(() =>
      this._navCtrl.navigateForward(action.path, action.options)
    );
  }

  @Action(NavigateBackward)
  navigateBack(
    _: StateContext<IonicRouterStateModel>,
    action: NavigateBackward
  ) {
    this._ngZone.run(() =>
      this._navCtrl.navigateBack(action.path, action.options)
    );
  }

  @Action(NavigateBack)
  goBack(_: StateContext<IonicRouterStateModel>, action: NavigateBack) {
    this._ngZone.run(() => this._navCtrl.back(action.options));
  }

  @Action([RouterNavigation, RouterError, RouterCancel, RouterDataResolved])
  angularRouterAction(
    ctx: StateContext<IonicRouterStateModel>,
    action: RouterAction<IonicRouterStateModel, RouterStateSnapshot>
  ): void {
    ctx.setState({
      ...ctx.getState(),
      trigger: action.trigger,
      state: action.routerState,
      navigationId: action.event.id,
    });
  }

  private setUpRouterEventsListener(): void {
    const subscription = this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.navigationStart();
      } else if (event instanceof RoutesRecognized) {
        this._lastRoutesRecognized = event;
      } else if (event instanceof ResolveEnd) {
        this.dispatchRouterDataResolved(event);
      } else if (event instanceof NavigationCancel) {
        this.dispatchRouterCancel(event);
        this.reset();
      } else if (event instanceof NavigationError) {
        this.dispatchRouterError(event);
        this.reset();
      } else if (event instanceof NavigationEnd) {
        this.navigationEnd();
        this.reset();
      }
    });

    this._subscription.add(subscription);
  }

  private navigationStart(): void {
    this._routerState = this._serializer.serialize(
      this._router.routerState.snapshot
    );

    if (this._trigger !== 'none') {
      this._storeState = this._store.selectSnapshot(IonicRouterState);
    }
  }

  private navigationEnd(): void {
    if (this.shouldDispatchRouterNavigation()) {
      this.dispatchRouterNavigation();
    }
  }

  private shouldDispatchRouterNavigation(): boolean {
    if (!this._storeState) return true;
    return this._trigger !== 'store';
  }

  private dispatchRouterNavigation(): void {
    const nextRouterState = this._serializer.serialize(
      this._lastRoutesRecognized.state
    );

    this.dispatchRouterAction(
      new RouterNavigation(
        nextRouterState,
        new RoutesRecognized(
          this._lastRoutesRecognized.id,
          this._lastRoutesRecognized.url,
          this._lastRoutesRecognized.urlAfterRedirects,
          nextRouterState
        ),
        this._trigger
      )
    );
  }

  private dispatchRouterCancel(event: NavigationCancel): void {
    this.dispatchRouterAction(
      new RouterCancel(
        this._routerState!,
        this._storeState,
        event,
        this._trigger
      )
    );
  }

  private dispatchRouterError(event: NavigationError): void {
    this.dispatchRouterAction(
      new RouterError(
        this._routerState!,
        this._storeState,
        new NavigationError(event.id, event.url, `${event}`),
        this._trigger
      )
    );
  }

  private dispatchRouterAction<T>(action: RouterAction<T>): void {
    this._trigger = 'router';

    try {
      this._store.dispatch(action);
    } finally {
      this._trigger = 'none';
    }
  }

  private dispatchRouterDataResolved(event: ResolveEnd): void {
    const routerState = this._serializer.serialize(event.state);
    this.dispatchRouterAction(
      new RouterDataResolved(routerState, event, this._trigger)
    );
  }

  private reset(): void {
    this._trigger = 'none';
    this._storeState = null;
    this._routerState = null;
  }

  /**
   * No sense to mess up the `setUpRouterEventsListener` method as we have
   * to perform this check only once and unsubscribe after the first event
   * is triggered
   */
  private checkInitialNavigationOnce(): void {
    // Caretaker note: we have still left the `typeof` condition in order to avoid
    // creating a breaking change for projects that still use the View Engine.
    if (
      (typeof ngDevMode === 'undefined' || ngDevMode) &&
      // Angular is running tests in development mode thus we can be sure that this method will be
      // skipped in tests.
      isAngularInTestMode()
    ) {
      return;
    }

    const subscription = this._router.events
      .pipe(
        first(
          (event): event is RoutesRecognized =>
            event instanceof RoutesRecognized
        )
      )
      .subscribe(({ url }) => {
        // `location.pathname` always equals manually entered URL in the address bar
        // e.g. `location.pathname === '/foo'`, but the `router` state has been initialized
        // with another URL (e.g. used in combination with `NgxsStoragePlugin`), thus the
        // `RouterNavigation` action will be dispatched and the user will be redirected to the
        // previously saved URL. We want to prevent such behavior, so we perform this check

        // `url` is a recognized URL by the Angular's router, while `currentUrl` is an actual URL
        // entered in the browser's address bar
        // `PathLocationStrategy.prototype.path()` returns a concatenation of
        // `PlatformLocation.pathname` and normalized `PlatformLocation.search`.

        // `Location.prototype.normalize` strips base href from the URL,
        // if `baseHref` (declared in angular.json) for example is `/en`
        // and the URL is `/test#anchor` - then `_locationStrategy.path(true)` will return `/en/test#anchor`,
        // but `/en/test#anchor` is not known to the Angular's router, so we have to strip `/en`
        // from the URL
        const currentUrl = this._location.normalize(
          this._locationStrategy.path(true)
        );
        const currentUrlTree = this._urlSerializer.parse(currentUrl);
        // We need to serialize the URL because in that example `/test/?redirect=https://google.com/`
        // Angular will recognize it as `/test?redirect=https:%2F%2Fwww.google.com%2F`
        // so we have to run the `currentUrl` via the `UrlSerializer` that will encode characters
        const currentSerializedUrl = this._urlSerializer.serialize(
          currentUrlTree
        );

        // If URLs differ from each other - we've got to perform a redirect to the manually entered URL
        // in the address bar, as it must have a priority
        if (currentSerializedUrl !== url) {
          this._router.navigateByUrl(currentUrl);
        }
      });

    this._subscription.add(subscription);
  }
}
