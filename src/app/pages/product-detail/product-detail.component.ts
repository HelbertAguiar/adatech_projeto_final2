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
  produto?: Product;
  carregando = true;
  qtdEstrelas: number[] = [1, 2, 3, 4, 5];
  adicionadoAoCarrinho = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoServico: ProductService,
    private carrinhoServico: CartService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit() {
    this.carregando = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produtoServico.getById(id).subscribe({
      next: (produto: Product) => {
        this.produto = produto;
        this.carregando = false;
      },
      error: (erro: any) => {
        console.error('Erro ao carregar produto:', erro);
        this.carregando = false;
        this.snackBar.open('Erro ao carregar detalhes do produto', 'Fechar', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }

  adicionarAoCarrinho() {
    if (this.produto) {
      this.carrinhoServico.add(this.produto);
      this.adicionadoAoCarrinho.set(true);
      this.snackBar.open(`${this.produto.title} adicionado ao carrinho!`, 'Visualizar Carrinho', {
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
    if (!this.produto) return 'star-empty';
    return index < Math.round(this.produto.rating.rate) ? 'star-full' : 'star-empty';
  }

  getStarIcon(index: number): string {
    if (!this.produto) return 'star_border';
    
    const rating = this.produto.rating.rate;
    if (index < Math.floor(rating)) {
      return 'star'; // Estrela cheia
    } else if (index < Math.ceil(rating) && !Number.isInteger(rating)) {
      return 'star_half'; // Meia estrela
    } else {
      return 'star_border'; // Estrela vazia
    }
  }
  
  produtoEmPromocao(): boolean {
    return this.produto !== undefined && this.produto.rating.rate > 4.2;
  }
  
  calcularDesconto(): string {
    if (!this.produto) return '0%';
    return this.produto.rating.rate > 4.5 ? '10%' : '5%';
  }
  
  precoPromocional(): number | undefined {
    if (!this.produto) return undefined;
    const desconto = this.produto.rating.rate > 4.5 ? 0.9 : 0.95;
    return this.produto.price * desconto;
  }
}
