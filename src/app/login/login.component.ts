import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { AlertService } from '../alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:any= FormGroup;
  errorMessage: string = '';
  visible: boolean = true;
  changetype: boolean = true;

  
  

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private inser: InventoryService,
    private alertser:AlertService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginNew() {
    if (this.loginForm.valid) {
      this.inser.loginNew(this.loginForm.value).subscribe((res: any) => {
          if (res.statusCode === 200) {

            localStorage.setItem('userid',res.userid)
            const userid = localStorage.getItem('userid')
            console.log(userid)
            if (res.role === 'ROLE_EMPLOYEE') {
              this.router.navigate(['/EmployeeLogin']);
              localStorage.setItem('name',res.employeeName);
              localStorage.setItem('Eid',res.userid)
            localStorage.setItem('token', res.token);
            } else if (res.role === 'ROLE_MANAGER') {
              this.router.navigate(['/ManagerLogin']);
              localStorage.setItem('mname',res.employeeName);
            localStorage.setItem('mtoken', res.token);
            localStorage.setItem('userid',res.userid);


            }
          }
        },(err:any)=>{
          console.log(err)
          this.alertser.snackError(err.error.errmesessage);
        }
      );
    }
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  register() {
    this.router.navigate(['/register']);
  }
}
