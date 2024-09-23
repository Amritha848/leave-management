import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import { OptComponent } from './login/opt/opt.component';
import { PasswordresetComponent } from './login/passwordreset/passwordreset.component';
import { ConnectionComponent } from './login/connection/connection.component';
import { VerifyComponent } from './login/verify/verify.component';

import { EmployeesignupComponent } from './register/employeesignup/employeesignup.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginsliderComponent } from './login/loginslider/loginslider.component';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher, MatOption, MatOptionModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core'; // Add this line
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartModule } from 'angular-highcharts';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatTableModule } from '@angular/material/table';// Add this line
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './employee/dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './employee/profile/profile.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ApproveDialogComponent } from './manager/approve-dialog/approve-dialog.component';
import { SpinnerComponent } from './register/spinner/spinner.component';
import { SearchPipe } from './search.pipe';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpassComponent,
    EmployeeComponent,
    ManagerComponent,
    OptComponent,
    PasswordresetComponent,
    ConnectionComponent,
    VerifyComponent,
    EmployeesignupComponent,
    LoginsliderComponent,
    LoadingSpinnerComponent,
    DialogComponent,
    ProfileComponent,
    ApproveDialogComponent,
    SpinnerComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    ChartModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule, // Add this line
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatOptionModule
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
