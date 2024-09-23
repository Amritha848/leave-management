import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/inventory.service';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {
  resetForm:any= FormGroup;
  message: string = '';
  errorMessage: string = '';
  visible: boolean = true;
  changetype: boolean = true;
  
  constructor(
    private fb: FormBuilder,
    private inser: InventoryService,
    private router: Router,
    private alertser: AlertService
  ) { }
  
  ngOnInit() {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
  
  reset() {
    if (this.resetForm.valid) {
      const newPassword = this.resetForm.get('password')?.value;
      const confirmPassword = this.resetForm.get('confirmPassword')?.value;
      const userid = localStorage.getItem('EID')
      
      if (newPassword && confirmPassword) {
        console.log('newPassword:', newPassword);
        console.log('confirmPassword:', confirmPassword);
        
        this.inser.reset({ newpassword:newPassword,confirmpassword:confirmPassword}).subscribe((res: any) => {
          if (res.statusCode === 200) {
            this.alertser.snackSuccess(res.message);
            this.router.navigate(['/login']); // Assuming you want to navigate after success
          }
        }, (err: any) => {
          console.log(err);
          this.alertser.snackError(err.error.errmesessage);
        });
      } else {
        this.errorMessage = 'Both fields are required.';
      }
    } else {
      this.errorMessage = 'Form is not valid';
    }
  }
  
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
