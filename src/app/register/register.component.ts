import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { AlertService } from '../alert.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from './spinner/spinner.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  visible: boolean = true;
  changetype: boolean = true;
  registerformE:any= FormGroup;
  errorMessage: string = '';
  visibleEmployeeForm: boolean = false;
  visibleManagerForm: boolean = false;
  managerIds: string[] = [];
  employeeIds: string[] = ['2427RS01E1', '2427RS01E2', '2427RS01E3', '2427RS01E4', '2427RS01E5', '2427RS01E6', '2427RS01E9', '2427RS01E7', '2427RS01B7', '2425RS01V5'];
  departments: string[] = ['Software', 'J1C', 'Monitering', 'Rapido', 'Digital Marketing'];
  roles: string[] = ['ROLE_EMPLOYEE', 'ROLE_MANAGER'];
  clicked: boolean = false;
  emailFormControl:any=FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.inventoryService.manager().subscribe(
      (res: any) => {
        this.managerIds = res;
      },
      (err: any) => {
        console.log(err);
      }
    );

    this.registerformE = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', Validators.required],
      departmentName: ['', Validators.required],
      manager: [null || '']
    });
  }

  showEmployeeForm() {
    this.visibleEmployeeForm = true;
    this.visibleManagerForm = false;
  }

  showManagerForm() {
    this.visibleManagerForm = true;
    this.visibleEmployeeForm = false;
  }

  registerE() {
    this.clicked = true;
    if (this.registerformE.valid) {
      const dialogRef = this.dialog.open(SpinnerComponent, {
        width: '300px',
      });

      let role = this.registerformE.value.role;
      if (role === 'ROLE_MANAGER') {
        delete this.registerformE.value.manager;
      } else {
        this.registerformE.value.manager = { userId: this.managerIds[0] };
      }

      this.inventoryService.registerNew(this.registerformE.value).subscribe(
        (res: any) => {
          console.log(res);
          if (res?.statusCode === 201) {
            dialogRef.afterClosed().subscribe(() => {
              setTimeout(() => {
                
              }, 10000); // Wait for 5 seconds before navigating
            });
            this.router.navigate(['/login']);
          } else {
            dialogRef.close();
          }
        },
        (err: any) => {
          console.log(err);
          this.alertService.snackError(err.error.errmessage);
          dialogRef.close();
        }
      );
    }
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  get f() { return this.registerformE.controls; }
}
