import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LeaveService } from '../leave.service';
import { AlertService } from '../alert.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../employee/dialog/dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ApproveDialogComponent } from './approve-dialog/approve-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  expanded?: boolean;
  
}
interface Leave {
  leaveId: string;
  fromDate: string;
  toDate: string;
  reason: string;
  type: string;
  status:string;
  expanded?:boolean;
  appliedDate:string;
  userId: string;
  employeeName:string;
  message:string;
}
interface DateInfo {
  email: string;
  joiningDate: string;
  employeeName: string;
  status: string;
  mobileNo: string;
  role: string;
  departmentName: string;
  userId: string;
  expanded?: boolean;
  attendance:string;
  casual:string;
  sick:string;
  privilege:string;

}
interface approve{
leaveId: string;
fromDate: string;
toDate: string;
reason: string;
type: string;
status: string;
appliedDate: string;
userId: string;
employeeName: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  animations: [
    trigger('slideToggle', [
      state('open', style({
        height: '*',
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      transition('open <=> closed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ManagerComponent {
  activeButton: 'dashboard' | 'leaves' | 'holidays' | 'employee' = 'dashboard';
  filterValue = '';
  Data: DateInfo[] = [];
  filteredData: DateInfo[] = [];
  id:string=''
search:any=FormGroup
  status:string='';
  leaves: Leave[] = [];
  userId:string='';
  token:string = '';
  leaveid:string='';
  name:string=''
  displayedColumns: string[] = ['employeeName', 'email', 'role', 'departmentName', 'expandedDetail'];
  dataSource = new MatTableDataSource<DateInfo>(this.Data);
  info: { name: string | null, id: string | null }[] = [];
  showNotification = false;
  show=false;
  reason =  false;
  reasonForm:any= FormGroup;
  approves:approve[] = [];
  reasonm:any = FormGroup;
message:any= '';

  // dashboard(){
  //   const token = localStorage.getItem('token') || ''
  //   this.leave.dashboard(token).subscribe
  // }
  leaveRequests = [
    {
        photo: 'https://randomuser.me/api/portraits/men/24.jpg',
        name: 'Employee Name',
        id: 'EMP00024',
        requestDate: 'Today',
        leavePeriod: '26 Jul, 2024'
    },
    {
        photo: 'https://randomuser.me/api/portraits/men/36.jpg',
        name: 'Employee Name',
        id: 'EMP00036',
        requestDate: '1 Day ago',
        leavePeriod: '27 Jul, 2024 - 30 Jul, 2024'
    },
    // Add more sample requests here
];
holidays = [
  { date: new Date('2024-01-15'), name: 'Sankranthi', day: 'Monday' },
  { date: new Date('2024-01-26'), name: 'Republic Day', day: 'Friday' },
  { date: new Date('2024-03-08'), name: 'Maha Shivaratri', day: 'Friday' },
  { date: new Date('2024-04-09'), name: 'Ugadi', day: 'Tuesday' },
  { date: new Date('2024-04-10'), name: 'Ramzan', day: 'Wednesday' },
  { date: new Date('2024-04-17'), name: 'Srirama Navami', day: 'Wednesday' },
  { date: new Date('2024-05-01'), name: 'Mayday', day: 'Wednesday' },
  { date: new Date('2024-06-17'), name: 'Bakrid', day: 'Monday' },
  { date: new Date('2024-08-15'), name: 'Independence Day', day: 'Thursday' },
  { date: new Date('2024-09-07'), name: 'Vinayaka Chavithi', day: 'Saturday' },
  { date: new Date('2024-10-02'), name: 'Gandhi Jayanthi', day: 'Wednesday' },
  { date: new Date('2024-10-12'), name: 'Dasara', day: 'Saturday' },
  { date: new Date('2024-11-01'), name: 'Deepavali', day: 'Thursday' },
  { date: new Date('2024-12-25'), name: 'Christmas', day: 'Wednesday' }
];

  changeProperties(button: 'dashboard' | 'leaves' | 'holidays' | 'employee') {
    this.activeButton = button;
  }
  showText(button: 'dashboard' | 'leaves' | 'holidays' | 'employee'): void {
    this.activeButton = button;
  }
  applyFilter() {
    if (!this.filterValue) {
      this.filteredData = this.Data;
    } else {
      this.filteredData = this.Data.filter(item =>
        item.employeeName.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        item.email.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        item.mobileNo.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        item.departmentName.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        item.userId.toLowerCase().includes(this.filterValue.toLowerCase())
      );
    }
  }
  toggleRow(element: DateInfo) {
    // Close any already expanded row
    this.dataSource.data.forEach(row => {
      if (row !== element) {
        row.expanded = false;
      }
    });
    // Toggle the clicked row
    element.expanded = !element.expanded;
  }
  toggle(request:Leave){
    request.expanded = ! request.expanded;
  }
  approve(item:any){
    this.status='APPROVED'
    const mtoken = localStorage.getItem('mtoken') || '';
    if (this.reasonm.get('message')) {
      this.message = this.reasonm.get('message').value;
    }
    console.log(this.message);
    this.leave.status(item.leaveId,this.status,mtoken,this.message).subscribe((res:any) =>{
      console.log(res)
      
    })
  }
  disapproved(item:any){
    this.status='DECLINED'
    const mtoken = localStorage.getItem('mtoken') || '';
    if (this.reasonm.get('message')) {
      this.message = this.reasonm.get('message').value;
    }
    console.log(this.status);
    this.leave.status(item.leaveId,this.status,mtoken, this.message).subscribe((res:any) =>{
      console.log(res)
    })
  }
 constructor(
  private leave:LeaveService,
  private alert :AlertService,
  private matDialog: MatDialog,
  private fb:FormBuilder
 ){
  this.search = this.fb.group({
    name: [''],
    email: [''],
    departmentName: [''],
  });
  }
fiterdata:any
 mainData:any
 ngOnInit() {
  this.searchName()

this.reasonForm = this.fb.group({
  declineReason :['']
});
 
  let mtoken = localStorage.getItem('mtoken') || '';
  console.log(mtoken); // Retrieve token from local storage
  const ename = localStorage.getItem('mname');
  const id = localStorage.getItem('userid');
  console.log(ename);
  console.log(id);
  this.info = [{ name: ename, id: id }];
  this.reasonm = this.fb.group({
    message:['']
  })
  this.leave.approve(mtoken).subscribe((res:any) =>{
    this.approves = res
  })
  this.leave.dashboard(mtoken).subscribe((res: any) => {
    console.log(res);
    this.mainData = res;
    if (mtoken) {
      this.leave.leave(mtoken).subscribe(
        (data: Leave[]) => {
          console.log(data)

          this.leaves = data.map((leave: any) => {
            console.log(this.leaves)
            return {
              leaveId: leave.leaveId,
              fromDate: leave.fromDate,
              toDate: leave.toDate,
              reason: leave.reason,
              type: leave.type,
              status: leave.status,
              appliedDate: leave.appliedDate,
              userId: leave.userId,
              employeeName: leave.employeeName,
              expanded: false,
              message:leave.message
              // add this line to ensure 'expanded' is defined
            };
          });
          console.log('leaves:', this.leaves);
        },
        (err: any) => {
          console.error('Error fetching leave data', err);
        }
      );
    } else {
      console.error('User ID or Token not found in local storage');
    }
  });

  this.leave.top.subscribe((res:any)=> {
    console.log(res)
  })

}

approvalbox(request: any) {
  // Your existing approve logic here
  const dialogRef = this.matDialog.open(ApproveDialogComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.cancelLeave(request)
  });
}
approveLeave() {
  // Logic for approving leave goes here

  this.showNotification = true;
  setTimeout(() => {
    this.showNotification = false;
  }, 3000); // Notification will disappear after 3 seconds
}
declineleave(){
  this.show = true;
  setTimeout(() => {
    this.show = false;
  }, 3000);

}
  // if (mtoken) {
  //   this.leave.dashboard(mtoken).subscribe(
  //     (info: any) => {
  //       console.log('Received data:', info);
  //       this.Data = info as DateInfo[];

  //         this.dataSource.data = this.Data; 
  //     },
  //     (err: any) => {
  //       console.error('Error fetching dashboard data:', err);
  //       this.alert.snackError(err.error || 'An error occurred');
  //     }
  //   );
  // }
openDialog() {
  this.matDialog.open(DialogComponent, {
    width: '400px',
  });
}
getLeaveDateClass(leaveType: string): string {
  switch (leaveType) {
    case 'blue':
      return 'blue';
    case 'yellow':
      return 'yellow';
    case 'purple':
      return 'purple';
    default:
      return '';
  }
}
cancelLeave(item: any) {
  // Handle the cancel logic here, for example:
  console.log('Cancel button clicked for leave:', item);

  // Example logic to remove the leave from the list
  this.leaves = this.leaves.filter(l => l !== item);

  // You might also want to make an API call to update the backend
  // this.leaveService.cancelLeave(leave.id).subscribe(response => {
  //   // Handle the response
  // });
}
decline(){
 this.reason = ! this.reason

}
toggleDropdown(request:any) {
  request.expanded = !request.expanded;
}

searchText:any
DataForSearch:any = [];
searchName() {
  const name = this.search.get('name')?.value;
  const mtoken = localStorage.getItem('mtoken') ||''
  if (name) {
    this.leave.filtername(name,mtoken).subscribe((res: any) => {
      console.log(res)
      this.DataForSearch = res;
      // this.dataSource.data = this.Data;
    });
  }
}

searchEmail() {
  const email = this.search.get('email')?.value;
   const mtoken = localStorage.getItem('mtoken') ||''
   
  if (email) {
    this.leave.filteremail(email,mtoken).subscribe((res: any) => {
      this.Data = res;
      this.dataSource.data = this.Data;
    });
  }
}

searchDepartmentName() {
  const departmentName = this.search.get('departmentName')?.value;
   const mtoken = localStorage.getItem('mtoken') ||''
  if (departmentName) {
    this.leave.filterdepartmentName(departmentName,mtoken).subscribe((res: any) => {
      this.Data = res;
      this.dataSource.data = this.Data;
    });
  }
}

}

    
 
 
