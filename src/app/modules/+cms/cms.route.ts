import { Routes } from '@angular/router';
import CmsComponent from './cms.component';

const cmsRoutes: Routes = [
  {
    path: '', component: CmsComponent, pathMatch: 'fullPatch', children:
    [
      {
        path: 'app', component:
      }
    ]
  },
]

export default cmsRoutes;
