import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Slug } from 'utils';
import { TranslateService } from 'services';

import { Application } from '../../../services/application.interface';


@Component({
    selector: 'page-new',
    templateUrl: 'pageNew.component.html'
})
export class PageNewComponent implements OnInit {

    private form: FormGroup;
    private appId: string;
    private app: Application;
    private breadcrumbs: any;
    private inputName: any;
    private inputSlug: any;
    private subscriptionApp: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private currentRoute: ActivatedRoute,
        private translate: TranslateService
    ) {

    }

    ngOnInit(): void {

        this.appId = this.currentRoute.snapshot.params['appId'];
        this.app = this.currentRoute.snapshot.data['app'];

        this.breadcrumbs = [
            {
                name: this.translate.instant('APPLICATIONS'),
                link: '/auth/app'
            },
            {
                name: this.translate.instant('PAGES'),
                link: '/auth/page/' + this.appId
            }
        ];

        this.generateForm();


    }

    generateForm() {

        let group: any = {};

        this.form = this.formBuilder.group({
            'app': [this.appId, Validators.required],
            'name': ['', Validators.required],
            'slug': ['', Validators.required],
            'seo': this.formBuilder.group({
                'title': this.generateGroupLanguage(),
                'description': this.generateGroupLanguage(),
                'keywords': this.generateGroupLanguage()
            })
        });

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

}