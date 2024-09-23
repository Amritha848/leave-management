import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  showSpinner: boolean = true;
  showSuccessMessage: boolean = false;

  constructor(public dialogRef: MatDialogRef<SpinnerComponent>) { }

  ngOnInit() {
    // Simulate a delay for the spinner
    setTimeout(() => {
      this.showSpinner = false;
      this.showSuccessMessage = true;
    }, 2000); // 2 seconds delay for the spinner
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
