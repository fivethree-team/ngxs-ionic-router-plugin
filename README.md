# IonicRouterPlugin for NGXS

[![npm version](https://badge.fury.io/js/%40fivethree%2Fngxs-ionic-router-plugin.svg)](https://www.npmjs.com/@fivethree/ngxs-ionic-router-plugin)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/fivethree-team/ngxs-ionic-router-plugin/blob/master/LICENSE)

Router Plugin for Ionic 4 and NGXS 3.3.4 or higher.

| Angular | @ngxs/store | ionic | @fivethree/@fivethree/ngxs-ionic-router-plugin |
| ------- | ----------- | ----- | ---------------------------------------------- |
| 8/9     | 3.6.x+      | 5.x.x | 0.3.x                                          |
| 8/9     | 3.6.x+      | 4.x.x | 0.2.x                                          |
| 7       | 3.3.4+      | 4.x.x | 0.1.0                                          |

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
  imports: [NgxsModule.forRoot(states), NgxsIonicRouterPluginModule.forRoot()]
})
export class AppModule {}
```

Now the route will be reflected in your store under the `ionicRouter` state name.

## 🧭 Navigation

`new NavigateRoot(path: string | UrlTree | any[], options?: NavigationOptions)`

`new NavigateForward(path: string | UrlTree | any[], options?: NavigationOptions)`

`new NavigateBackward(path: string | UrlTree | any[], options?: NavigationOptions)`

`new NavigateBack(options?: AnimationOptions)`
