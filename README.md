# IonicRouterPlugin for NGXS

[![npm version](https://badge.fury.io/js/%40fivethree%2Fngxs-ionic-router-plugin.svg)](https://www.npmjs.com/@fivethree/ngxs-ionic-router-plugin)

Router Plugin for Ionic 4 and NGXS 3.3.4 or higher.

## 📦 Installation

```console
npm install @fivethree/ngxs-ionic-router-plugin --save

# or if you are using yarn
yarn add @fivethree/ngxs-ionic-router-plugin
```

## 🔨 Usage
Import the module into your root application module:

```typescript
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsIonicRouterPluginModule } from '@fivethree/ngxs-ionic-router-plugin';

@NgModule({
    imports: [
        NgxsModule.forRoot(states),
        NgxsIonicRouterPluginModule.forRoot()
    ]
})
export class AppModule {}
```

Now the route will be reflected in your store under the `ionicRouter` state name.

## 🧭 Navigation

`new NavigateRoot(path: string | UrlTree | any[], options?: NavigationOptions)`

`new NavigateForward(path: string | UrlTree | any[], options?: NavigationOptions)`

`new NavigateBackward(path: string | UrlTree | any[], options?: NavigationOptions)`

`new NavigateBack(options?: AnimationOptions)`


