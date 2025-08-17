import { Component } from '@angular/core';
import { Product } from '@models/product.model'
import { Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from '@pipes/truncate.pipe';

@Component({
  selector: 'app-product-card',
  imports: [ CommonModule, MatIconModule, TruncatePipe ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product!: Product;

}
