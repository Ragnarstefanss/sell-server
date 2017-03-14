import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

export class Seller {
  name: string;
  id: number;
  category: string;
  imagePath: string;
}

@Component({
  selector: 'app-seller-dlg',
  templateUrl: './seller-dlg.component.html',
  styleUrls: ['./seller-dlg.component.css']
})
export class SellerDlgComponent implements OnInit {
  seller: Seller;
  edit:boolean;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() { }

  onCancel() {
    this.activeModal.dismiss();
  }

  onOk() {
    this.activeModal.close(this.seller);
  }

}
