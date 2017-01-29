import { Routes } from '@angular/router';

import { CmsComponent } from './cms.component';
import { CmsResolve } from './cms.resolve';

const cmsRoutes: Routes = [
    { path: '', canActivate: [ CmsResolve ], component: CmsComponent, children: 
        [
            { path: '', redirectTo: 'apps', pathMatch: 'full'  },
            { path: 'apps', loadChildren: './modules/application/application.module#ApplicationModule' }
        ] 
    }
]

export default cmsRoutes;
