import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApplicationComponent } from './application.component';
import { ApplicationItemComponent } from './components';
import ApplicationRoutes from './application.route';


@NgModule({
  imports: [
    RouterModule.forRoot(ApplicationRoutes),
  ],
  declarations: [
    ApplicationComponent,
    ApplicationItemComponent
  ]
})
export class ApplicationModule {

}
