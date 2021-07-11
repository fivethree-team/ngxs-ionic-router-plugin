import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  Params,
  RouteReuseStrategy,
  RouterStateSnapshot,
} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsIonicRouterPluginModule } from '@fivethree/ngxs-ionic-router-plugin';
import { IonicRouterStateSerializer } from '@fivethree/ngxs-ionic-router-plugin';

interface RouterStateParams {
  root: {
    url: string;
    params: Params;
    queryParams: Params;
    data: any;
  };
}

class CustomRouterStateSerializer
  implements IonicRouterStateSerializer<RouterStateParams> {
  serialize(routerState: RouterStateSnapshot): RouterStateParams {
    const {
      url,
      root: { queryParams },
    } = routerState;

    let { root: route } = routerState;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const { params, data } = route;

    return { root: { url, params, queryParams, data } };
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxsModule.forRoot([]),
    NgxsIonicRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: IonicRouterStateSerializer,
      useClass: CustomRouterStateSerializer,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
