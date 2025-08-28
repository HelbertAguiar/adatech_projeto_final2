import { Component, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product-service.service';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  product?: Product;
  carregando = true;
  qtdEstrelas: number[] = [1, 2, 3, 4, 5];
  adicionadoAoCarrinho = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit() {
    this.carregando = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(id).subscribe({
      next: (produto) => {
        this.product = produto;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar produto:', erro);
        this.carregando = false;
        this.snackBar.open('Erro ao carregar detalhes do produto', 'Fechar', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.add(this.product);
      this.adicionadoAoCarrinho.set(true);
      this.snackBar.open(`${this.product.title} adicionado ao carrinho!`, 'Visualizar Carrinho', {
        duration: 3000,
        panelClass: 'success-snackbar',
        horizontalPosition: 'end',
        verticalPosition: 'top'
      }).onAction().subscribe(() => {
        this.router.navigate(['/cart']);
      });
    }
  }
  
  voltar() {
    this.location.back();
  }
  
  getEstrelaClass(index: number): string {
    if (!this.product) return 'star-empty';
    return index < Math.round(this.product.rating.rate) ? 'star-full' : 'star-empty';
  }

  getStarIcon(index: number): string {
    if (!this.product) return 'star_border';
    
    const rating = this.product.rating.rate;
    if (index < Math.floor(rating)) {
      return 'star'; // Estrela cheia
    } else if (index < Math.ceil(rating) && !Number.isInteger(rating)) {
      return 'star_half'; // Meia estrela
    } else {
      return 'star_border'; // Estrela vazia
    }
  }
  
  produtoEmPromocao(): boolean {
    return this.product !== undefined && this.product.rating.rate > 4.2;
  }
  
  calcularDesconto(): string {
    if (!this.product) return '0%';
    return this.product.rating.rate > 4.5 ? '10%' : '5%';
  }
  
  precoPromocional(): number | undefined {
    if (!this.product) return undefined;
    const desconto = this.product.rating.rate > 4.5 ? 0.9 : 0.95;
    return this.product.price * desconto;
  }
}
