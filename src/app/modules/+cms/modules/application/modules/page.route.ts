import { Router } from '@angular/router';

import { PageComponent } from './page.component';
import { PageNewComponent } from './components';
import { ApplicationResolve } from '../services/application.resolve';
import { PageResolve } from './services/page.resolve';

const PageRoutes = [
  {
    path: '', component: PageComponent, pathMatch: 'full'
  },
  {
    path: 'new', component: PageNewComponent, resolve: { app: ApplicationResolve }
  },
  {
    path: 'edit/:pageId', component: PageNewComponent, resolve: { app: ApplicationResolve, page: PageResolve }
  },
]

export default PageRoutes;
