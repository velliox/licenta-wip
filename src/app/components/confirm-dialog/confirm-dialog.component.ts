import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string= '';
  message: string = '';
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.message = data.message;
   }

  ngOnInit(): void {
  }


  onConfirm() {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss() {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
  

}
export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}
