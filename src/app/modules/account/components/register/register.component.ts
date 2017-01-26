import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'account-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent {
    private form: FormGroup;

    constructor (
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            'name' : ['', Validators.required],
            'email' : ['', Validators.required],
            'address' : ['', Validators.required],
            'city' : ['', Validators.required],
            'country' : ['', Validators.required],
            'password' : ['', Validators.required],
            'repeatPassword' : ['', Validators.required],
            'terms' : ['', Validators.required]
        }, { validator: this.matchingPasswords('password', 'repeatPassword')});
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


}
