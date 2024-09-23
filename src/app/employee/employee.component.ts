import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { InventoryService } from '../inventory.service';
import { LeaveService } from '../leave.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { AlertService } from '../alert.service';

interface Leave {
  leaveId: string;
  fromDate: string;
  toDate: string;
  reason: string;
  type: string;
  status: string;
  appliedDate:string;
  userId: string;
  employeeName:string;
  sickLeavesCount: number;
  casualLeavesCount: number;
  expanded?: boolean;
  message:string;
}
interface leavetype{
  sickLeaveCounts: 0,
    casualLeaveCounts: 0,
    privilegeLeaveCounts:0
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  animations: [
    trigger('formSlide', [
      state('closed', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      state('open', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('closed => open', [
        animate('0.5s ease-in-out')
      ]),
      transition('open => closed', [
        animate('0.5s ease-in-out')
      ])
    ]),
    trigger('dropdownAnimation', [
      state('closed', style({
        transform: 'translateY(-20px)',
        opacity: 0,
        display: 'none'
      })),
      state('open', style({
        transform: 'translateY(0)',
        opacity: 1,
        display: 'block'
      })),
      transition('closed => open', [
        style({ display: 'block' }),
        animate('0.3s ease-in-out')
      ]),
      transition('open => closed', [
        animate('0.3s ease-in-out', style({ opacity: 0 })),
        style({ display: 'none' })
      ])
    ])
  ],
  providers: [DatePipe]
})
export class EmployeeComponent implements OnInit {
  
  leaveForm: FormGroup;
  selectedLeaveType: any = '';
  showForm = false;
  notificationDropdownOpen = false;
  showProfileBox = false;
  sickcount:any
  casualcount:any
  showProgressBar = false; // Added
  Highcharts: typeof Highcharts = Highcharts;
  leaves: Leave[] = [];
  info: { name: string | null, id: string | null }[] = [];
  remainingp:number = 0;
  remainingc:number = 0;
  remainings:number = 0;
  leaveCounts = {
    sickLeaveCounts: 0,
    casualLeaveCounts: 0,
    privilegeLeaveCounts:0
  };
  defaultChart = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'No Data Available'
    },
    series: [{
      name: 'Leaves',
      data: [
        { name: 'Available', y: 0, color: '#eeeeee' },
        { name: 'Consumed', y: 0, color: '#800080' }
      ]
    }]
  };


  pieChart1: Chart;
  pieChart2: Chart;
  pieChart3: Chart;

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
  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private inser: InventoryService,
    private leaveService: LeaveService,
    private alert: AlertService,
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.leaveForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      type: [''],
      reason: [''],
      status: [''],
 
    });

    const commonChartOptions = {
      chart: { type: 'pie', plotShadow: false, height: 300, width: 350 },
      credits: { enabled: false },
      plotOptions: {
        pie: {
          innerSize: '90%',
          borderWidth: 10,
          borderColor: '',
          slicedOffset: 10,
          dataLabels: { connectorWidth: 0 }
        }
      },
      
    };

    this.pieChart1 = new Chart({
      ...commonChartOptions,
      title: {  align: 'left', floating: true, text: 'Privilage Leave' },
      series: [
        {
          type: 'pie',
          data: [
          ]
        }
      ]
    });

    this.pieChart2 = new Chart({
      ...commonChartOptions,
      title: { align: 'left', floating: true, text: 'Casual Leaves' },
      series: [
        {
          type: 'pie',
          data: [
          ]
        }
      ]
    });

    this.pieChart3 = new Chart({
      ...commonChartOptions,
      title: { align: 'left', floating: true, text: 'Sick Leaves' },
      series: [
        {
          type: 'pie',
          data: [
          ]
        }
      ]
    });
  }

  ngOnInit() {
    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    const ename = localStorage.getItem('name');
    const id = localStorage.getItem('Eid');

    console.log(ename);
    console.log(id);
    this.info = [{ name: ename, id: id }];
    this.inser.leavetype(token).subscribe((res:any) =>{
      this.leaveCounts = res;
    })

    if (id && token) {
      this.leaveService.getLeaves(id, token).subscribe(
        (data: Leave[]) => {
          this.leaves = data;
          this.updateCharts();
          this.remainingc = 20-this.leaveCounts.casualLeaveCounts
          this.remainings = 20-this.leaveCounts.sickLeaveCounts
          this.remainingp = 20-this.leaveCounts.privilegeLeaveCounts
          console.log(this.remainingp)
          console.log(this.remainingc)
          console.log(this.remainings)
        },
        (error) => {
          console.error('Error fetching leave data', error);
        }
      );
    } else {
      console.error('User ID or Token not found in local storage');
    }
  }

  openDialog() {
    this.matDialog.open(DialogComponent, {
      width: '400px',
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  logout() {
    const token = localStorage.getItem('token');
    this.inser.logout(token).subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.router.navigate(['/login']);
      }
    });
  }

  onDateChange(event: any, controlName: string) {
    const formattedDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    this.leaveForm.get(controlName)?.setValue(formattedDate);
  }

  submitForm() {
    if (this.leaveForm.valid) {
      this.showProgressBar = true; // Show progress bar
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('Eid');
      if (id && token) {
        this.leaveService.getLeaves(id, token).subscribe(
          (data: Leave[]) => {
            this.leaves = data;
          },
          (error) => {
            console.error('Error fetching leave data', error);
          }
        );
      } else {
        console.error('User ID or Token not found in local storage');
      }
      console.log('form:',token);
      const fromDate = this.leaveForm.get('fromDate')?.value;
      const toDate = this.leaveForm.get('toDate')?.value;
      const reason = this.leaveForm.get('reason')?.value;
      const type = this.leaveForm.get('type')?.value;
      this.inser.leave({ fromDate, toDate, reason, type, token }).subscribe((res: any) => {
        this.showProgressBar = false; // Hide progress bar
        if (res.statusCode === 201) {
          this.alert.snackSuccess("The request is sent Successfully")
        }
      }, (err: any) => {
        this.showProgressBar = false; // Hide progress bar
        this.alert.snackError(err.error.errmessage);
      });
    }
  }

  getStatusClass(status: string) {
    return {
      'approved': status === 'APPROVED',
      'declined': status === 'DECLINED',
      'pending': status === 'PENDING'
    };
  }
  
  cancelLeave(leave: any) {
    // Handle the cancel logic here, for example:
    console.log('Cancel button clicked for leave:', leave);

    // Example logic to remove the leave from the list
    this.leaves = this.leaves.filter(l => l !== leave);

    // You might also want to make an API call to update the backend
    // this.leaveService.cancelLeave(leave.id).subscribe(response => {
    //   // Handle the response
    // });
  }

  toggleProfileBox() {
    this.showProfileBox = !this.showProfileBox;
  }
  toggleExpand(leave: Leave) {
    leave.expanded = !leave.expanded;
  }

  private updateCharts() {
    this.pieChart1.ref$.subscribe(chart => {
      chart.series[0].setData([
        { y: 20, color: '#eeeeee' },
        {y: this.leaveCounts.privilegeLeaveCounts, color: '#800080' }
      ]);
      this.remainingp= 5-this.leaveCounts.privilegeLeaveCounts;
    });

    this.pieChart2.ref$.subscribe(chart => {
      chart.series[0].setData([
        { y: 20, color: '#eeeeee' },
        {  y: this.leaveCounts.casualLeaveCounts, color: '#FFC000' }
      ]);
      this.remainingp= 5-this.leaveCounts.casualLeaveCounts;
    });

    this.pieChart3.ref$.subscribe(chart => {
      chart.series[0].setData([
        {  y: 20, color: '#eeeeee' },
        {  y: this.leaveCounts.sickLeaveCounts, color: '#007FFF' },
      ]);
    this.remainingp = 5-this.leaveCounts.sickLeaveCounts;
    });
  }

}
