import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { ApplicationComponent } from './application.component';
import { ApplicationItemComponent, ApplicationNewComponent } from './components';
import ApplicationRoutes from './application.route';
import { ApplicationService } from './services/application.service';
import { ApplicationResolve } from './services/application.resolve';

import { SharedModule } from 'modules';


@NgModule({
  imports: [
    RouterModule.forChild(ApplicationRoutes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ApplicationComponent,
    ApplicationItemComponent,
    ApplicationNewComponent
  ],
  providers: [
    ApplicationService,
    ApplicationResolve
  ]
})
export class ApplicationModule {

}
