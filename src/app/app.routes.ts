import { Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'account',
  },
  {
    path: 'cms', loadChildren: 'modules/+cms/cms.module#CmsModule'
  }
]

export default appRoutes;
