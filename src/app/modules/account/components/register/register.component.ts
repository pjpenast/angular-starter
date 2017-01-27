import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';

import { ValidateEmail } from 'utils';
import { CountryService } from '../../../../services/country';
import { AuthService } from '../../../../services/auth';
import { TranslateService } from '../../../../services/translate';

@Component({
    selector: 'account-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    private form: FormGroup;
    private subscriptionCountries: Subscription;
    private subscriptionForm: Subscription;
    private subscriptionService: Subscription;
    private countries;
    private VALID: String = 'VALID';
    private INVALID: String = 'INVALID';
    
    private submitted: Boolean = false;
    private errorMessage: String;

    constructor (
        private formBuilder: FormBuilder,
        private countryService: CountryService,
        private service: AuthService,
        private translate: TranslateService,
        private router: Router
    ) {
        this.form = this.formBuilder.group({
            'name' : ['', Validators.required],
            'email' : ['', ValidateEmail],
            'address' : ['', Validators.required],
            'city' : ['', Validators.required],
            'country' : ['', Validators.required],
            'password' : ['', Validators.required],
            'repeatPassword' : ['', Validators.required],
            'terms' : ['', Validators.required]
        }, { validator: this.matchingPasswords('password', 'repeatPassword')});
    }

    ngOnInit() {
        this.subscriptionCountries = this.countryService.getCountries().subscribe(
            res => this.countries = res
        )
        this.subscriptionForm = this.form.statusChanges.subscribe((status:string) => {
            if (status === this.VALID && this.submitted) {
                this.errorMessage = null;
            }
        })
    }

    ngOnDestroy() {
        this.subscriptionCountries.unsubscribe();
        this.subscriptionForm.unsubscribe();

        if (this.subscriptionService)
        this.subscriptionService.unsubscribe();
    }

    matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey];
            let passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
        }
    }

    onSubmit(values, isValid) {

        this.submitted = true;

        if (!isValid) {
            this.errorMessage = this.translate.instant('ALL_FIELDS_IS_REQUIRED');
            return false;
        }

        this.errorMessage = null;
        this.subscriptionService = this.service.register(values).subscribe(
            res => {
                this.router.navigate(['/auth']);
            },
            err => this.errorMessage = err
        )
    }


}
