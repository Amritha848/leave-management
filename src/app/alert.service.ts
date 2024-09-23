import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  config: MatSnackBarConfig;

  constructor(private snackbar: MatSnackBar, private zone: NgZone) {
    this.config = new MatSnackBarConfig();
    this.config.panelClass = ["snackbar-container"];
    this.config.verticalPosition = "bottom";
    this.config.horizontalPosition = "center";
    this.config.duration = 3000;
  }

  snackSuccess(message: any) {
    this.config = {
      duration: 15000, // duration in milliseconds, here it is set to 5 seconds
      panelClass: ["snackbar-container", "success"]
    };
    this.show(message);
  }

  snackError(message: any) {
    this.config = {
      duration: 15000, // duration in milliseconds, here it is set to 5 seconds
      panelClass: ["snackbar-container", "error"]
    };
    this.show(message);
  }

  snackWarning(message: any) {
    this.config.panelClass = ["snackbar-container", "warning"];
    this.show(message);
  }

  show(message: any, config?: MatSnackBarConfig) {
    config = config || this.config;
    this.zone.run(() => {
      this.snackbar.open(message, "x", config);
    });
  }

//   snackError(message: any ,action:string) {
//     this.snackbar.open(message,action);
// }

}
