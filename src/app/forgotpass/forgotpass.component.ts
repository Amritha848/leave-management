import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  register: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router,
    private alertser: AlertService
  ) {
    this.register = this.fb.group({
      toEmail: [''], 
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.register.valid) {
      const inputValue = this.register.get('toEmail')?.value;

      // Determine if inputValue is an email or phone number
      if (this.isEmail(inputValue)) {
        // Call API for email
        this.inventoryService.sendOtp({ email: inputValue }).subscribe(
          (res: any) => {
            if (res.statusCode === 200) {
              this.alertser.snackSuccess(res.message)
              this.router.navigate(['/Verifyotp']);
            }
          },
          (err: any) => {
            this.alertser.snackError(err.error.errmesessage);
          }
        );
      } else {
        // Call API for phone number
        this.inventoryService.sendOTP({ no: '+91' + inputValue }).subscribe(
          (res: any) => {
            console.log(res);
            if (res.statusCode === 200) {
              this.alertser.snackSuccess(res.message)
              this.router.navigate(['/Verifyotp']);
            }
          },
          (err: any) => {
            this.alertser.snackError(err.error.errmesessage);
          }
        );
      }
    }
  }

  // Utility function to check if the input is an email
  private isEmail(value: string): boolean {
    // Simple email validation check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  }
}
