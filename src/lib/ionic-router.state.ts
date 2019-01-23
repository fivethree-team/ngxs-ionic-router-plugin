import { State } from '@ngxs/store';
import { NavController } from '@ionic/angular';
import { NgZone } from '@angular/core';

export interface RouterStateModel {
    state?: any;
}

@State<RouterStateModel>({
    name: 'router',
    defaults: {
        state: undefined,
    }
})
export class IonicRouterState {
    constructor(private navCtrl: NavController,
        private ngZone: NgZone) { }
}
