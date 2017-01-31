import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PageService } from './page.service';
import { Page } from './page.interface';

@Injectable()
export class PageResolve implements Resolve<Page> {
    constructor(
        private service: PageService
    ) {

    }
    resolve(route: ActivatedRouteSnapshot): Promise<Page> {
        return this.service.getPage(route.params['pageId'])
    }
}
