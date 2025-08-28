import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmarDialogData {
  titulo: string;
  mensagem: string;
  botaoConfirmar: string;
  botaoCancelar: string;
}

@Component({
  selector: 'app-confirmar-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.titulo }}</h2>
    <mat-dialog-content>
      <p>{{ data.mensagem }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>{{ data.botaoCancelar }}</button>
      <button mat-button [mat-dialog-close]="true" color="warn">{{ data.botaoConfirmar }}</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-actions {
      margin-bottom: 12px;
      margin-right: 12px;
    }
    mat-dialog-content {
      margin-bottom: 20px;
    }
  `]
})
export class ConfirmarDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmarDialogData
  ) {}
}
