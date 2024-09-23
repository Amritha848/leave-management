import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/inventory.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  verifyOtp:any= FormGroup;
  message : string='';
  errorMessage: string = '';
  
constructor(
  private fb: FormBuilder,
  private inser: InventoryService,
  private router :Router,

){ }
ngOnInit(){
this.verifyOtp = this.fb.group({
  enterOtp: ['', Validators.required]
});
}
verify(){
  if(this.verifyOtp.valid){
    const enterOtp = this.verifyOtp.get('enterOtp')?.value;
      console.log(enterOtp);
      const token = localStorage.getItem('token');
      console.log(token);
      this.inser.verifyOtp({no: enterOtp, token: token}).subscribe((res: any) => {
        console.log(res)
        if(res.statusCode === 200){
          alert(res.message);
          this.router.navigate(['/ResetPassword'])
        }
      }, (err:any) => {
        alert("Invalid Otp")
      });
  }
}
}
