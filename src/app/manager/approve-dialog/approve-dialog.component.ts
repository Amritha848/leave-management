import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-approve-dialog',
  templateUrl: './approve-dialog.component.html',
  styleUrls: ['./approve-dialog.component.css']
})
export class ApproveDialogComponent {
  constructor(public dialogRef: MatDialogRef<ApproveDialogComponent>) {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000); // Close after 3 seconds
  }
}
