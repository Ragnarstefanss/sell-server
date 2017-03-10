import { Component, OnInit,  Input, Output, EventEmitter } from '@angular/core';
import { SellersService, SellerProduct, Seller } from './sellers.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from './seller-dlg/seller-dlg.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Söluaðilar!';

  products: SellerProduct[];

  sellerlist: Seller[];
  private seller: Seller;
  private sellerProduct: SellerProduct[];
  private sellerSelected: Boolean;
  //private newSeller : Seller;
  sellerName: string;
  sellerCatagory: string;
  sellerImagePath : string;
  private newProduct : SellerProduct;


  constructor(private modalService : NgbModal, private service : SellersService) {
    this.sellerName = "";
    this.sellerCatagory = "";
    this.sellerImagePath = "";
  }


  ngOnInit() {
    this.onGetSellers();

    /*
    this.service.getSellerProducts(1).subscribe(result => {
      this.products = result;
    })
    */
  };

  onGetProducts(num : number)
{
   this.service.getSellerProducts(num).subscribe((result) => {
        this.sellerProduct = result;
        },(err) => {
      console.log("Something failed in getSellerProducts");
    });
}

  getSeller(num: number){
    console.log(num);

    var successGetSeller = result => {
      this.seller = result;
      this.sellerSelected = true;
    };

    var successGetSellerProducts = result => {
        this.sellerProduct = result;
    };

    var errorGetSeller = (err) => {
      // TODO: display toastr!
      console.log("Something failed in getSellerById");
    }

    var errorGetSellerProducts = (err) => {
      // TODO: display toastr!
      console.log("Something failed in getSellerProducts");
    }

    this.service.getSellerById(num).subscribe(successGetSeller, errorGetSeller);
    this.service.getSellerProducts(num).subscribe(successGetSellerProducts, errorGetSellerProducts);
  }

  onGetSellers(){
    var successGetSellers = result => {
      this.sellerlist = result;
    };
    var errorHandler = (err) => {
      // TODO: display toastr!
      console.log("Something failed in getSellers");
    }
    this.service.getSellers().subscribe(successGetSellers, errorHandler);
    this.sellerSelected = false;
  }

  onAddSeller(){
    var newSeller : Seller;
    var Exists: boolean;
    Exists = false;
    var oldId: number;
    newSeller = {
      id: 0,
      name: this.sellerName,
      category: this.sellerCatagory,
      imagePath: this.sellerImagePath
    }
    for(var s in this.sellerlist)
    {
      console.log("S id is "+ this.sellerlist[s].id +" and S.name is "+this.sellerlist[s].name);
      if(this.sellerlist[s].name == this.sellerName)
      {
        Exists = true;
        oldId = this.sellerlist[s].id;
      }
    }
    if(Exists == false)
    {
       this.service.postSeller(newSeller).subscribe((result) => {
      console.log("new seller with name "+ result.name + "was added");
      this.onGetSellers();
    });
  }
  else
  {
      console.log("seller exists modifying now");
        this.service.uppdateSeller(oldId,newSeller).subscribe((result) => {
      console.log("seller with name "+ result.name + "was modified");
      this.onGetSellers();
    });
  }
  }

  onProductEdited(p: SellerProduct) {
    console.log(p);
  }

  addSeller() {
    const modalInstance = this.modalService.open(SellerDlgComponent);
    var newSeller : Seller;
    var Exists: boolean;
    Exists = false;
    var oldId: number;

    modalInstance.componentInstance.seller = {
      name: "Ragnar",
      category: "undefined",
      imagePath: "http://krishnendu.org/wp-content/uploads/2016/08/no_image.jpg",
      id: 7
    };

    modalInstance.result.then(obj => {
      console.log("Dialog was closed using OK");
      console.log(obj);
      this.sellerName = obj.name;
      this.sellerCatagory = obj.category;
      this.sellerImagePath = obj.imagePath;
      this.onAddSeller();
    }).catch(err => {
      console.log("Dialog was cancelled");
      console.log(err);
    });
    }
  }
