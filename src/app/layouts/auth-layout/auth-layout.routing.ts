import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ForgotPasswordComponent } from 'src/app/pages/auth/forgot-password/forgot-password.component';
export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'forgotPassword',         component: ForgotPasswordComponent}
];
