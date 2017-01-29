import { Router } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { ApplicationResolve } from './services/application.resolve';
import { ApplicationNewComponent } from './components';

const ApplicationsRoutes = [
  {
     path: '', component: ApplicationComponent, pathMatch: 'full'
  },
  {
    path: 'new', component: ApplicationNewComponent
  },
  {
    path: 'edit/:appId', component: ApplicationNewComponent, resolve: { app: ApplicationResolve }
  },
  {
    path: ':appId/pages', loadChildren: './modules/page.module#PageModule'
  }
]

export default ApplicationsRoutes;
