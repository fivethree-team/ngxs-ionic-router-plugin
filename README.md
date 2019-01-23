# IonicRouterPlugin for NGXS

## 📦 Installation

```bash
npm install @fivethree/ionic-router-plugin --save

# or if you are using yarn
yarn add @fivethree/ionic-router-plugin
```

## 🔨 Usage
Import the module into your root application module:

```typescript
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsIonicRouterPluginModule } from '@fivethree/ionic-router-plugin';

@NgModule({
    imports: [
        NgxsModule.forRoot(states),
        NgxsIonicRouterPluginModule.forRoot()
    ]
})
export class AppModule {}
```

Now the route will be reflected in your store under the `ionicRouter` state name.

## Navigation

`new NavigateRoot(path: string | UrlTree | any[], options?: NavigationOptions)`

`new NavigateForward(path: string | UrlTree | any[], options?: NavigationOptions)`

`new NavigateBackward(path: string | UrlTree | any[], options?: NavigationOptions)`

`new NavigateBack(options?: AnimationOptions)`


