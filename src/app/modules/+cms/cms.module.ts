import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import CmsRoute from './cms.route';
import { ApplicationModule } from './modules';

@NgModule({
  imports: [
    RouterModule.forRoot(CmsRoute),
    ApplicationModule
  ],
  declarations: [

  ],
  providers: [

  ]
})

export class CmsModule {

}
