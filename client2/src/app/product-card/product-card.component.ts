import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SellerProduct } from '../sellers.service'
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input()
  product: SellerProduct;

  @Output()
  productUpdated = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.product.name = "smuuuu";
    this.productUpdated.emit(this.product);
  }

}
