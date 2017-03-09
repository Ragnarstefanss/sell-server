import { Component, OnInit } from '@angular/core';
import { SellersService, SellerProduct } from './sellers.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from './seller-dlg/seller-dlg.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  sellers: SellerDlgComponent[];
  products: SellerProduct[];

  //private sellers: Seller[];
  private seller: SellerProduct;


  constructor(private modalService : NgbModal, private service : SellersService) { }

  ngOnInit() {
    var successHandler = result => {
      this.seller = result;
    };
    var errorHandler = (err) => {
      // TODO: display toastr!
      console.log("Something failed");
    }
     this.service.getSellerById(1).subscribe(successHandler, errorHandler);
    /*
    this.service.getSellers().subscribe(result => {
      this.sellers = result;
    })*/

      this.service.getSellerProducts(1).subscribe(result => {
        this.products = result;
      })
    };

    onProductEdited(p: SellerProduct) {
      console.log(p);
    }

    //this.service.getSellerById(1).subscribe(successHandler, errorHandler);
    /*
    this.service.getSellers().subscribe(result => {
      this.sellers = result;
    })
    */


  addSeller() {
    const modalInstance = this.modalService.open(SellerDlgComponent);
    modalInstance.componentInstance.seller = {
      name: "Ragnar",
      category: "Hannyrðir",
      imagePath: "http://ragnarstefansson.com",
      id: 7
    };

    modalInstance.result.then(obj => {
      console.log("Dialog was closed using OK");
      console.log(obj);
    }).catch(err => {
      console.log("Dialog was cancelled");
      console.log(err);
    });
  }


}
