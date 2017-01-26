import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'account-password',
    templateUrl: 'password.component.html',
    styleUrls: ['password.component.scss']
})
export class PasswordComponent {
    private form: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    )

    {
        this.form = this.formBuilder.group({
            'email' : ['', Validators.required]
        });
    }


}