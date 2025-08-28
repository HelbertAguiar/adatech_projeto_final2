import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../../core/models/product.model';

export interface ProdutoFormData {
  produto?: Product;
  titulo: string;
  botaoSalvar: string;
}

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>{{ dados.titulo }}</h2>
    <form [formGroup]="formularioProduto" (ngSubmit)="salvar()">
      <mat-dialog-content>
        <div class="formulario-container">
          <mat-form-field appearance="outline" class="campo-formulario">
            <mat-label>Título</mat-label>
            <input matInput formControlName="title" placeholder="Título do produto" required>
            <mat-error *ngIf="formularioProduto.get('title')?.hasError('required')">
              Título é obrigatório
            </mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="campo-formulario">
            <mat-label>Preço</mat-label>
            <input matInput formControlName="price" type="number" placeholder="0.00" required>
            <mat-error *ngIf="formularioProduto.get('price')?.hasError('required')">
              Preço é obrigatório
            </mat-error>
            <mat-error *ngIf="formularioProduto.get('price')?.hasError('min')">
              Preço deve ser maior que zero
            </mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="campo-formulario">
            <mat-label>Descrição</mat-label>
            <textarea matInput formControlName="description" rows="3" placeholder="Descrição do produto" required></textarea>
            <mat-error *ngIf="formularioProduto.get('description')?.hasError('required')">
              Descrição é obrigatória
            </mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="campo-formulario">
            <mat-label>Categoria</mat-label>
            <input matInput formControlName="category" placeholder="Categoria do produto" required>
            <mat-error *ngIf="formularioProduto.get('category')?.hasError('required')">
              Categoria é obrigatória
            </mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="campo-formulario">
            <mat-label>URL da Imagem</mat-label>
            <input matInput formControlName="image" placeholder="https://exemplo.com/imagem.jpg" required>
            <mat-error *ngIf="formularioProduto.get('image')?.hasError('required')">
              URL da imagem é obrigatória
            </mat-error>
          </mat-form-field>
        </div>
      </mat-dialog-content>
      
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close type="button">Cancelar</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="formularioProduto.invalid">
          {{ dados.botaoSalvar }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .formulario-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
      min-width: 400px;
    }
    .campo-formulario {
      width: 100%;
    }
    mat-dialog-actions {
      margin-bottom: 12px;
      margin-right: 12px;
    }
  `]
})
export class ProdutoFormComponent {
  formularioProduto: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProdutoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: ProdutoFormData
  ) {
    this.formularioProduto = this.fb.group({
      id: [dados.produto?.id || null],
      title: [dados.produto?.title || '', Validators.required],
      price: [dados.produto?.price || '', [Validators.required, Validators.min(0.01)]],
      description: [dados.produto?.description || '', Validators.required],
      category: [dados.produto?.category || '', Validators.required],
      image: [dados.produto?.image || '', Validators.required],
      rating: [dados.produto?.rating || { rate: 0, count: 0 }]
    });
  }
  
  salvar() {
    if (this.formularioProduto.valid) {
      this.dialogRef.close(this.formularioProduto.value);
    }
  }
}
