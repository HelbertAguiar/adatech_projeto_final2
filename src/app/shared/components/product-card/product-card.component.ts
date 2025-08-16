import { Component } from '@angular/core';
import { Product } from '@models/product.model'
import { Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-product-card',
  imports: [ CommonModule ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product!: Product;

}
