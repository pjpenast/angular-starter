import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, TranslateService } from '../../../../services';
import { Subscription } from 'rxjs';


@Component({
    selector: 'cms-header',
    templateUrl: 'cms-header.component.html',
    styleUrls: ['cms-header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    private user: any;
    private currentLanguage: string;
    private subscription: Subscription;

    constructor(
        private service: AuthService,
        private router: Router,
        private translate: TranslateService
    ) {}

    ngOnInit() {
        this.user = this.service.getUser();
        this.currentLanguage = this.translate.currentLang;
    }

    ngOnDestroy() {
        if (this.subscription)
        this.subscription.unsubscribe();
    }

    private logout() {
        this.subscription = this.service.logout().subscribe();
    }

    selectLang(lang:string) {
        this.translate.use(lang);
        this.currentLanguage = this.translate.currentLang;
    }

}