// dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/inventory.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  logout(): void {
    const token = localStorage.getItem('token');
    this.inventoryService.logout(token).subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.router.navigate(['/login']);
        this.dialogRef.close(); // Close the dialog after successful logout
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close the dialog without any action
  }
}
