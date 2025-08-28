import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private cartService = inject(CartService);
  items = this.cartService.items;
  total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price, 0)
  );

  remove(id: number) {
    this.cartService.remove(id);
  }
}
