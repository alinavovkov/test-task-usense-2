import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-news-card',
  standalone: false,
  templateUrl: './dialog-news-card.component.html',
  styleUrl: './dialog-news-card.component.scss'
})
export class DialogNewsCardComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogNewsCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  close(): void {
    this.dialogRef.close();
  }

}
