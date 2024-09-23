import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/inventory.service';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-opt',
  templateUrl: './opt.component.html',
  styleUrls: ['./opt.component.css']
})
export class OptComponent implements OnInit {
  otpForm: FormGroup;
  message: string = '';
  errorMessage: string = '';

  @ViewChild('otp1') otp1!: ElementRef;
  @ViewChild('otp2') otp2!: ElementRef;
  @ViewChild('otp3') otp3!: ElementRef;
  @ViewChild('otp4') otp4!: ElementRef;
  @ViewChild('otp5') otp5!: ElementRef;
  @ViewChild('otp6') otp6!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private inser: InventoryService,
    private router: Router,
    private alertser: AlertService
  ) {
    this.otpForm = this.fb.group({
      enterOtp: [''],
      otp: ['']
    });
  }

  ngOnInit() {}

  verify() {
    if (this.otpForm.valid) {
      const enterOtp = this.otpForm.get('enterOtp')?.value;
      const concatenatedOtp = this.getOtpValue();

      if (enterOtp) {
        this.verifyOtpApi(enterOtp);
      }
      if (concatenatedOtp) {
        this.verifyOtp(concatenatedOtp);
      }
    }
  }

  verifyOtpApi(otp: string) {
    this.inser.verifyOtp({ no: otp }).subscribe(
      (res: any) => {
        console.log(res);
        if (res.statusCode === 200) {
          this.alertser.snackSuccess(res.message);
          this.router.navigate(['/ResetPassword']);
        }
      },
      (err: any) => {
        this.alertser.snackError(err.error.errmesessage);
      }
    );
  }

  verifyOtp(otp: string) {
    this.inser.verifyOTP({ no: otp }).subscribe(
      (res: any) => {
        console.log(res);
        if (res.statusCode === 200) {
          this.alertser.snackSuccess(res.message);
          this.router.navigate(['/ResetPassword']);
        }
      },
      (err: any) => {
        this.alertser.snackError(err.error.errmesessage);
      }
    );
  }

  getOtpValue(): string {
    const otp = [
      this.otp1.nativeElement.value,
      this.otp2.nativeElement.value,
      this.otp3.nativeElement.value,
      this.otp4.nativeElement.value,
      this.otp5.nativeElement.value,
      this.otp6.nativeElement.value,
    ].join('');
    return otp;
  }

  moveFocus(currentInput: HTMLInputElement, nextInput: HTMLInputElement | null) {
    if (currentInput.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }
}
