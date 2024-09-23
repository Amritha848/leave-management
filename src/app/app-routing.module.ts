import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import { OptComponent } from './login/opt/opt.component';
import { PasswordresetComponent } from './login/passwordreset/passwordreset.component';
import { ConnectionComponent } from './login/connection/connection.component';
import { VerifyComponent } from './login/verify/verify.component';
import { EmployeesignupComponent } from './register/employeesignup/employeesignup.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
  path: 'register',
  component: RegisterComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'ForgotPassword',
  component:ForgotpassComponent
},
{
  path:'EmployeeLogin',
  component:EmployeeComponent
},
{
  path:'ManagerLogin',
  component:ManagerComponent
},
{
  path:'Verifyotp',
  component:OptComponent
},
{
  path:'ResetPassword',
  component:PasswordresetComponent
},
{
  path:'connection',
  component:ConnectionComponent
},
{
  path:'verify',
  component:VerifyComponent
},

{
  path:'Esignup',
  component:EmployeesignupComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
