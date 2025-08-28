import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@services/product-service.service';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.productService.getAll().subscribe(p => (this.products = p));
  }

  delete(id: number) {
    this.productService.delete(id).subscribe(() => this.load());
  }
}
