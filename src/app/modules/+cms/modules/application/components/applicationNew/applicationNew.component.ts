import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidateArray, ValidateCode, ValidateUrl } from 'utils';
import { Subscription } from 'rxjs';

import { Application } from '../../services/application.interface';
import { ApplicationService } from '../../services/application.service';
import { TranslateService, LanguageService, PlatformService } from 'services';


@Component({
  selector: 'application-new',
  templateUrl: 'applicationNew.component.html',
  styleUrls: ['applicationNew.component.scss']
})
export class ApplicationNewComponent implements OnInit {
  private submitted: Boolean = false;
  private form: FormGroup;
  private errorMessage: String;
  private errorShow: Boolean;
  private formatFile: Array<String> = ['jpg', 'png'];
  private platforms: Array<any>;
  private inputPlatform: any;
  private languages: any = [];
  private app: Application;
  private subscription: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private service: ApplicationService,
    private currentRouter: ActivatedRoute,
    private translate: TranslateService,
    private languageService: LanguageService,
    private platformService: PlatformService,
    private router: Router
  ) { }

  ngOnInit() {
    this.app = this.currentRouter.snapshot.data['app'];

    this.form = this.generateForm();
    this.inputPlatform = this.form.controls['platform'];

    this.languageService.getLanguages().subscribe(
      res => this.languages = res
    )

    this.platforms = this.platformService.platforms;


  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  generateForm(): FormGroup {
    if (this.app) {
      return this.formBuilder.group({
        'id': [this.app.id, Validators.required],
        'name': [this.app.name, Validators.required],
        'code': [this.app.code, ValidateCode],
        'platform': [this.app.platform, ValidateArray],
        'languages': [this.app.languages, ValidateArray],
        'domain': [this.app.domain, ValidateUrl],
        'icon': [this.app.icon.name, Validators.required]
      });
    } else {
      return this.formBuilder.group({
        'name': ['', Validators.required],
        'code': ['', ValidateCode],
        'platform': [[], ValidateArray],
        'languages': [[], ValidateArray],
        'domain': ['', ValidateUrl],
        'icon': ['', Validators.required]
      });
    }
  }

  onSubmit(values, isValid) {

    this.submitted = true;

    if (!isValid) {
      this.errorMessage = this.translate.instant('ALL_FIELDS_IS_REQUIRED');
      this.errorShow = true;
      return false;
    }

    this.errorShow = false;

    this.subscription = this.service.saveApp(values).subscribe(
      res => {
        this.router.navigate(['/apps']);
      },
      err => this.errorMessage = err
    )

  }


}
