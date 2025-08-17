import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@shared/components/navbar/navbar.component'
import { ProductCardComponent } from '@shared/components/product-card/product-card.component'
import { ProductService } from "@services/product-service.service"
import { Product } from '@models/product.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NavbarComponent, ProductCardComponent, FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule],
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
