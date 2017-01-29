import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Injectable()
export class CmsResolve implements CanActivate {
    constructor(
        private service: AuthService
    ) { }
    canActivate(): Promise<any> {
        return this.service.checkUser()
    }
}