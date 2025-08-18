import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@shared/components/navbar/navbar.component'
import { ProductCardComponent } from '@shared/components/product-card/product-card.component'
import { ProductService } from "@services/product-service.service"
import { Product } from '@models/product.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [CommonModule,
    NavbarComponent,
    ProductCardComponent,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSliderModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public loading: boolean = false;

  // final '$' Observables
  public listaProdutos: Product[] = [];
  public listaProdutosExibir: Product[] = [];
  public listaCategorias: string[] = [];

  public precoMinimoFiltro!: number;
  public precoMaximoFiltro!: number;
  public ratingMinimoFiltro!: number;
  public ratingMaximoFiltro!: number;

  public categoriaSelecionada: string = 'Todas';
  public precoMinSelecionado!: number;
  public precoMaxSelecionado!: number;
  public ratingMinSelecionado!: number;
  public ratingMaxSelecionado!: number;

  @ViewChild('filtroPrecoMaxID') filtroPrecoMaxCustomizado!: ElementRef<HTMLInputElement>;
  @ViewChild('filtroPrecoMinID') filtroPrecoMinCustomizado!: ElementRef<HTMLInputElement>;
  @ViewChild('filtroRatingMinID') filtroRatingMinCustomizado!: ElementRef<HTMLInputElement>;
  @ViewChild('filtroRatingMaxID') filtroRatingMaxCustomizado!: ElementRef<HTMLInputElement>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loading = true;
    this.productService.getAll().subscribe(products => {
      this.listaProdutos = products;
      if (this.listaProdutos && this.listaProdutos.length > 0) {
        this.inicializaFiltroPreco();
        this.inicializaFiltroRating();
        this.extraiCategorias();
        this.precoMinSelecionado = this.precoMinimoFiltro;
        this.precoMaxSelecionado = this.precoMaximoFiltro;
        this.ratingMinSelecionado = this.ratingMinimoFiltro;
        this.ratingMaxSelecionado = this.ratingMaximoFiltro;
        this.filtrarProdutos();
      }
      this.loading = false;
    });
  }

  inicializaFiltroPreco() {
    this.precoMinimoFiltro = 1;
    this.precoMaximoFiltro = 1 + this.listaProdutos.reduce(
      (max, produto) => {
        return produto.price > max ? produto.price : max;
      }, 0);
  }

  inicializaFiltroRating() {
    const MINIMO_FILTRO = 0;
    this.ratingMinimoFiltro = MINIMO_FILTRO;
    this.ratingMaximoFiltro = 0 + this.listaProdutos.reduce(
      (max, produto) => {
        return Number(produto.rating.rate) > max ? Number(produto.rating.rate) : max;
      }, 0);
  }

  extraiCategorias() {
    this.listaCategorias = Array.from(new Set(this.listaProdutos.map(produto => produto.category)));
  }

  exibeProdutos() {
    this.listaProdutosExibir = [...this.listaProdutos];
  }

  filtrarProdutos() {
    this.loading = true;
    setTimeout(() => {
      this.listaProdutosExibir = this.listaProdutos.filter(produto => {
        const categoriaOk = this.categoriaSelecionada === 'Todas' || produto.category === this.categoriaSelecionada;
        const precoOk = produto.price >= this.precoMinSelecionado && produto.price <= this.precoMaxSelecionado;
        const rateOk = produto.rating.rate >= this.ratingMinSelecionado && produto.rating.rate <= this.ratingMaxSelecionado;
        return categoriaOk && precoOk && rateOk;
      });
      this.loading = false;
    }, 300);
  }

  filtroCategoria({ value }: { value: string }) {
    this.categoriaSelecionada = value;
    this.filtrarProdutos();
  }

  filtroPreco() {
    this.precoMinSelecionado = Number(this.filtroPrecoMinCustomizado.nativeElement.value);
    this.precoMaxSelecionado = Number(this.filtroPrecoMaxCustomizado.nativeElement.value);
    this.filtrarProdutos();
  }

  filtroRating() {
    this.ratingMinSelecionado = Number(this.filtroRatingMinCustomizado.nativeElement.value);
    this.ratingMaxSelecionado = Number(this.filtroRatingMaxCustomizado.nativeElement.value);
    console.log(this.ratingMinSelecionado, this.ratingMaxSelecionado);
    this.filtrarProdutos();
  }

  formatLabelFiltroPreco(value: number): string {

    if (value >= 1000) {
      return '' + String(Math.round(value / 1000)) + 'k';
    }

    return '' + String(value);
  }

}
