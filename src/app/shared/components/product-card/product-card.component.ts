import { Component } from '@angular/core';
import { Product } from '@models/product.model';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from '@pipes/truncate.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '@services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-product-card',
  imports: [
    CommonModule,
    MatIconModule,
    TruncatePipe,
    RouterLink,
    MatSnackBarModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() produto!: Product;
  protected readonly Math = Math;

  constructor(
    private carrinhoServico: CartService,
    private snackBar: MatSnackBar
  ) {}

  adicionarAoCarrinho(evento: Event): void {
    evento.stopPropagation();
    evento.preventDefault();
    this.carrinhoServico.add(this.produto);
    this.snackBar.open(
      `${this.produto.title} adicionado ao carrinho!`,
      'Ver Carrinho',
      {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'success-snackbar'
      }
    ).onAction().subscribe(() => {
      window.location.href = '/cart';
    });
  }

  classeEstrela(indice: number): string {
    return indice < Math.floor(this.produto.rating.rate) ? 'star-full' : 'star-empty';
  }

  iconeEstrela(indice: number): string {
    return indice < Math.floor(this.produto.rating.rate) ? 'star' : 'star_border';
  }

  verDetalhes(evento: Event): void {
    evento.stopPropagation();
    evento.preventDefault();
  }

}
