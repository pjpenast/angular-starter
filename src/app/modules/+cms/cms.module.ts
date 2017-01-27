import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import CmsRoute from './cms.route';
import { ApplicationModule } from './modules';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    RouterModule.forRoot(CmsRoute),
    ApplicationModule,
    SharedModule
  ],
  declarations: [

  ],
  providers: [

  ],
  exports: [
  ]
})

export class CmsModule {

}
