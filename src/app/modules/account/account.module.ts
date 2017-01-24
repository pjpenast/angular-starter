import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import AccountRoute from './account.route';
import AccountComponent from './account.component';
import { LoginComponent, RegisterComponent, PasswordComponent } from './components'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(AccountRoute),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent,
        PasswordComponent
    ]
})

export class AccountModule {

}