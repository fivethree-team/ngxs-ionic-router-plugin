import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { NavigateRoot, NavigateForward, NavigateBackward, NavigateBack } from '@fivethree/ngxs-ionic-router-plugin';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
})
export class ListPage {
  constructor(private store: Store) {}

  onNavigateRootClick() {
    this.store.dispatch(new NavigateRoot('home'));
  }

  onNavigateForwardClick() {
    this.store.dispatch(new NavigateForward('details'));
  }

  onNavigateBackwardClick() {
    this.store.dispatch(new NavigateBackward('home'));
  }

  onNavigateBackClick() {
    this.store.dispatch(new NavigateBack());
  }
}
