import { Router } from '@angular/router';
import { ApplicationComponent } from './application.component';

const ApplicationsRoutes = [
  {
     path: '', component: ApplicationComponent , pathMatch: 'full'
  },
]

export default ApplicationsRoutes;
