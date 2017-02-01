import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Slug } from 'utils';
import { TranslateService } from 'services';

import { Application } from '../../../services/application.interface';
import { PageService } from '../../services/page.service';
import { Page } from '../../services/page.interface';


@Component({
    selector: 'page-new',
    templateUrl: 'pageNew.component.html'
})
export class PageNewComponent implements OnInit {

    private form: FormGroup;
    private appId: string;
    private app: Application;
    private page: Page;    
    private breadcrumbs: any;
    private inputName: any;
    private inputSlug: any;
    private subscriptionApp: Subscription;
    private submitted: Boolean;
    private errorMessage: String;
    private errorShow: Boolean;

    constructor(
        private formBuilder: FormBuilder,
        private currentRoute: ActivatedRoute,
        private translate: TranslateService,
        private service: PageService,
        private router: Router
    ) {

    }

    ngOnInit(): void {

        this.appId = this.currentRoute.snapshot.params['appId'];
        this.app = this.currentRoute.snapshot.data['app'];
        this.page = this.currentRoute.snapshot.data['page'];

        console.log(this.page);

        this.breadcrumbs = [
            {
                name: this.translate.instant('APPLICATIONS'),
                link: '/apps'
            },
            {
                name: this.translate.instant('PAGES'),
                link: '/apps/'+this.appId+'/pages'
            }
        ];

        this.generateForm();


    }

    generateForm() {

        let group: any = {};

        if (!this.page) {
            this.form = this.formBuilder.group({
                'app': [this.appId, Validators.required],
                'name': ['', Validators.required],
                'slug': ['', Validators.required],
                'active' : [false]
            });
        } else {
            this.form = this.formBuilder.group({
                'id': [this.page.id, Validators.required],
                'app': [this.page.app, Validators.required],
                'name': [this.page.name, Validators.required],
                'slug': [this.page.slug, Validators.required],
                'active' : [this.page.active]
            });
        }


        this.inputName = this.form.controls['name'];
        this.inputSlug = this.form.controls['slug'];
        this.inputName.valueChanges.subscribe(this.updateName.bind(this));

    }

    checkWeb() {
        if (this.app.platform.indexOf('WEB') >= 0) {
            return true;
        }
    }

    generateGroupLanguage() {
        let group: any = {};

        this.app.languages.forEach(language => {
            group[language] = new FormControl('')
        })

        return new FormGroup(group);
    }

    updateName(value: string) {
        this.inputSlug.setValue(Slug(value));
    }

    updateSlug(event) {
        this.inputSlug.setValue(Slug(event.target.value));
    }

    onSubmit(values: any, isValid: boolean) {
        
        this.submitted = true;

        if (!isValid) {
            this.errorMessage = this.translate.instant('ALL_FIELDS_IS_REQUIRED');
            this.errorShow = true;
            return false;
        }

        this.errorShow = false;

        this.service.savePage(values, this.appId)
            .then((response) => {
                this.router.navigate(['/apps/'+this.app.id+'/pages']);
            })

    }

}