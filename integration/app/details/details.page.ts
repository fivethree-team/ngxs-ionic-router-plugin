import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  NavigateRoot,
  NavigateBackward,
  NavigateBack,
} from '@fivethree/ngxs-ionic-router-plugin';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  constructor(private store: Store) {}

  onNavigateRootClick() {
    this.store.dispatch(new NavigateRoot('home'));
  }

  onNavigateBackwardClick() {
    this.store.dispatch(new NavigateBackward('list'));
  }

  onNavigateBackClick() {
    this.store.dispatch(new NavigateBack());
  }
}
