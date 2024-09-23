import { Component,OnInit} from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { InventoryService } from 'src/app/inventory.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {
  sendOtp:any= FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private inser: InventoryService,
    private router: Router
  ) {}
  ngOnInit(){
    this.sendOtp = this.fb.group({
      toEmail: ['', Validators.required]
    });
  }
  email(){
    if (this.sendOtp.valid) {
      const Email = this.sendOtp.get('toEmail')?.value;
      console.log(Email);

      
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');
      console.log(token);
      this.inser.sendOtp({no: Email, token: token}).subscribe((res: any) => {
        console.log(res)
        if(res.statusCode === 200){
          alert(res.message);
          this.router.navigate(['/verify'])
        }
        
      }, (err:any) => {
        if(Email===''){
          this.errorMessage="Enter the Email";
        }
        else if( token === ''){
          this.errorMessage = "Account does not exist Register first"
        }
      });
  }
  }
  }

