import { createSelector } from '@ngxs/store';
import {
  IonicRouterState,
  IonicRouterStateModel,
} from '@fivethree/ngxs-ionic-router-plugin';

export const selectActiveUrl = () =>
  createSelector(
    [IonicRouterState],
    (state: IonicRouterStateModel) => state.state.root
  );
