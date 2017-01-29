import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import CmsRoute from './cms.route';
import { SharedModule } from '../shared';
import { CmsResolve } from './cms.resolve';
import { CmsComponent } from './cms.component';
import { HeaderComponent } from './components';

@NgModule({
  imports: [
    RouterModule.forChild(CmsRoute),
    SharedModule
  ],
  declarations: [
    CmsComponent,
    HeaderComponent
  ],
  providers: [
    CmsResolve
  ],
  exports: [
  ]
})

export class CmsModule {

}
