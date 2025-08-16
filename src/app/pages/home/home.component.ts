import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@shared/components/navbar/navbar.component'
import { ProductCardComponent } from '@shared/components/product-card/product-card.component'
import { ProductService } from "@services/product-service.service"
import { Product } from '@models/product.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NavbarComponent, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  // final '$' Observables
  public listaProdutos: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll().subscribe(products => {
      this.listaProdutos = products;
      if (this.listaProdutos && this.listaProdutos.length > 0) {
        this.renderizaProdutos();
      }
    });
  }
  
  renderizaProdutos() {
    // Lógica para renderizar os produtos
    console.log({'lista': this.listaProdutos});
  }

}
