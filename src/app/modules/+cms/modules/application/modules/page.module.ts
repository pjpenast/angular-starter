import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { SharedModule } from 'modules';

import { PageComponent } from './page.component';
import { PageItemComponent, PageNewComponent } from './components';
import { PageService } from './services/page.service';
import { PageResolve } from './services/page.resolve';
import { ApplicationResolve } from '../services/application.resolve';


import PageRoutes from './page.route';


@NgModule({
  imports: [
    RouterModule.forChild(PageRoutes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PageComponent,
    PageNewComponent,
    PageItemComponent
  ],
  providers: [
      ApplicationResolve,
      PageService,
      PageResolve
  ]
})
export class PageModule {

}
