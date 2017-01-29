import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApplicationService } from './application.service';
import { Application } from './application.interface';

@Injectable()
export class ApplicationResolve implements Resolve<Application> {
    constructor(
        private service: ApplicationService
    ) {

    }
    resolve(route: ActivatedRouteSnapshot): Promise<Application> {
        return this.service.getApp(route.params['appId'])
    }
}
