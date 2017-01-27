import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth';
import { TranslateService } from '../../../../services/translate';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ValidateEmail } from 'utils';

@Component({
    selector: 'account-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent {
  private loginForm: FormGroup;
  private errorMessage: string;

  constructor(
    private translate: TranslateService,
    private service: AuthService,
    private router: Router
  ) {


    this.loginForm = new FormGroup({
      email: new FormControl('', ValidateEmail),
      password: new FormControl('', Validators.required)
    })

  }

  onSubmit(values, isValid): boolean {
      if (!isValid) {
          this.errorMessage = this.translate.instant('ALL_FIELDS_IS_REQUIRED');
          return false;
      }

      this.service.login(values).subscribe(
         data => console.log(data),
         err => {
            this.errorMessage = this.translate.instant(err);  
         }
       );

      return true;
  }


}
