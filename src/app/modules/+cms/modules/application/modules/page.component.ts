import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'

import { TranslateService } from 'services';
import { PageService } from './services/page.service';
import { Page } from './services/page.interface';

@Component({
    selector: 'cms-page',
    templateUrl: 'page.component.html'
})
export class PageComponent implements OnInit {

    private subscription: Subscription;
    private appId: string;
    private pages: Array<Page> = [];
    private breadcrumbs: any;

    constructor(
        private router: Router,
        private currentRoute: ActivatedRoute,
        private service: PageService,
        private translate: TranslateService
    ) {

    }
    
    ngOnInit(): void {

        this.breadcrumbs = [
            {
                name: this.translate.instant('APPLICATIONS'),
                link: '/apps'
            }
        ]

        this.appId = this.currentRoute.snapshot.params['appId'];
        this.subscription = this.service.getPages(this.appId).subscribe(
            res => this.pages = res
        );
    }

}