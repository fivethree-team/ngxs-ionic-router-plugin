import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { IonicRouterState } from './ionic-router.state';
import {
  DefaultRouterStateSerializer,
  RouterStateSerializer,
} from './serializer';

@NgModule({
  imports: [NgxsModule.forFeature([IonicRouterState])],
})
export class NgxsIonicRouterPluginModule {
  static forRoot(): ModuleWithProviders<NgxsIonicRouterPluginModule> {
    return {
      ngModule: NgxsIonicRouterPluginModule,
      providers: [
        {
          provide: RouterStateSerializer,
          useClass: DefaultRouterStateSerializer,
        },
      ],
    };
  }
}
