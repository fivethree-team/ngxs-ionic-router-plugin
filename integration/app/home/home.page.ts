import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { NavigateForward } from '@fivethree/ngxs-ionic-router-plugin';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private store: Store) {}

  onNavigateForwardClick() {
    this.store.dispatch(new NavigateForward('list'));
  }
}
