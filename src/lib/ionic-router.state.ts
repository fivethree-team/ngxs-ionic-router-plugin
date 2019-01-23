import {
    State,
    Action,
    StateContext
} from '@ngxs/store';
import { NavController } from '@ionic/angular';
import { NgZone } from '@angular/core';
import {
    NavigateRoot,
    NavigateForward,
    NavigateBackward,
    NavigateBack
} from './ionic-router.actions';

export interface IonicRouterStateModel {
    state?: any;
}

@State<IonicRouterStateModel>({
    name: 'ionicRouter',
    defaults: {
        state: undefined
    }
})
export class IonicRouterState {
    constructor(private navCtrl: NavController,
        private ngZone: NgZone) { }

    @Action(NavigateRoot)
    navigateRoot(context: StateContext<IonicRouterStateModel>, action: NavigateRoot) {
        this.ngZone.run(() => this.navCtrl.navigateRoot(action.path, action.options));
        context.setState({ state: action });
    }

    @Action(NavigateForward)
    navigateForward(context: StateContext<IonicRouterStateModel>, action: NavigateForward) {
        this.ngZone.run(() => this.navCtrl.navigateForward(action.path, action.options));
        context.setState({ state: action });
    }

    @Action(NavigateBackward)
    navigateBack(context: StateContext<IonicRouterStateModel>, action: NavigateBackward) {
        this.ngZone.run(() => this.navCtrl.navigateBack(action.path, action.options));
        context.setState({ state: action });
    }

    @Action(NavigateBack)
    goBack(context: StateContext<IonicRouterStateModel>, action: NavigateBack) {
        this.ngZone.run(() => this.navCtrl.back(action.options));
        context.setState({ state: action });
    }
}
