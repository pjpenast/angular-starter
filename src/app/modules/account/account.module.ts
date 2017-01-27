import { NgModule, ModuleWithProviders  } from '@angular/core';
import { RouterModule } from '@angular/router';
import AccountRoute from './account.route';
import AccountComponent from './account.component';
import { LoginComponent, RegisterComponent, PasswordComponent } from './components'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared';
import { AuthService } from '../../services/auth';
import { CountryService } from '../../services/country';

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
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AccountModule,
            providers: [
                AuthService,
                CountryService
            ]
        }
    }
}