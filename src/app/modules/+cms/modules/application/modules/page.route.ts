import { Router } from '@angular/router';

import { PageComponent } from './page.component';
import { PageNewComponent } from './components';
import { ApplicationResolve } from '../services/application.resolve';

const PageRoutes = [
  {
    path: '', component: PageComponent, pathMatch: 'full'
  },
  {
    path: 'new', component: PageNewComponent, resolve: { app: ApplicationResolve }
  }
]

export default PageRoutes;
