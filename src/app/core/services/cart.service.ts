import { Injectable, signal } from '@angular/core';
import { Product } from '@models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<Product[]>([]);

  add(product: Product) {
    this.items.update(items => [...items, product]);
  }

  remove(productId: number) {
    this.items.update(items => items.filter(item => item.id !== productId));
  }

  clear() {
    this.items.set([]);
  }
}
