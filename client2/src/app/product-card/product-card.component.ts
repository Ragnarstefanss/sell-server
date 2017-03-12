import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

export class SellerProduct {
  id: number;
  name: string;
  price: number;
  quantitySold: number;
  quantityInStock: number;
  imagePath: string;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input()
  product: SellerProduct;
  edit: boolean;

  @Output()
  productUpdated = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onOk() {
    this.activeModal.close(this.product);
  }
}
