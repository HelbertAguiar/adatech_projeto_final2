import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private carrinhoServico = inject(CartService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  itens = this.carrinhoServico.items;
  total = computed(() =>
    this.itens().reduce((soma, item) => soma + item.price, 0)
  );
  
  carregando = false;

  remover(id: number) {
    this.carrinhoServico.remove(id);
  }
  
  finalizarCompra() {
    this.carregando = true;
    
    setTimeout(() => {
      this.carregando = false;
      this.carrinhoServico.clear();
      
      this.snackBar.open('Compra finalizada com sucesso!', 'Fechar', {
        duration: 5000,
        panelClass: 'success-snackbar',
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      
      this.router.navigate(['/']);
    }, 1500);
  }
}
