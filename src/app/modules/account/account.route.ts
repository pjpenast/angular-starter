import { Routes } from '@angular/router';
import  AccountComponent from './account.component';
import { LoginComponent, RegisterComponent, PasswordComponent } from './components'; 

const accountRoutes: Routes = [
  {
    path: 'account', component: AccountComponent, children: [
      { path: '', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'password', component: PasswordComponent }
    ]
  }
]

export default accountRoutes;