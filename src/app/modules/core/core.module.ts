import { NgModule, Optional, SkipSelf, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { ExceptionService } from 'services';

@NgModule({
  providers: [ ExceptionService ],
  imports: [],
  declarations: [],
  exports: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: ErrorHandler,
          useClass: ExceptionService
        }
      ]
    }
  }
}

