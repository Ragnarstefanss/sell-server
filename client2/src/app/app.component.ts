import { Component, OnInit,  Input, Output, EventEmitter } from '@angular/core';
import { SellersService, SellerProduct, Seller } from './sellers.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from './seller-dlg/seller-dlg.component';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Söluaðilar!';

  products: SellerProduct[];

  sellerlist: Seller[];
  seller: Seller;
  sellerProduct: SellerProduct[];
  sellerSelected: Boolean;
  //private newSeller : Seller;
  sellerName: string;
  sellerCatagory: string;
  sellerImagePath : string;
  newProduct : SellerProduct;
  top10 : boolean;


  constructor(private modalService : NgbModal, private service : SellersService) {
    this.sellerName = "";
    this.sellerCatagory = "";
    this.sellerImagePath = "";
  }


  ngOnInit() {
    this.onGetSellers();
    this.top10 = false;
  };

  onGetProducts(num : number)
{
  console.log("get products now");
   this.service.getSellerProducts(num).subscribe((result) => {
        this.sellerProduct = result;
        this.sellerProduct = this.sellerProduct.sort(function(a,b){
          return a.quantitySold < b.quantitySold ? 1 : -1
        });
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
          this.sellerProduct = this.sellerProduct.sort(function(a,b){
          return a.quantitySold < b.quantitySold ? 1 : -1
        });
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
      //console.log("S id is "+ this.sellerlist[s].id +" and S.name is "+this.sellerlist[s].name);
      if(this.sellerlist[s].name == this.sellerName)
      {
        Exists = true;
        oldId = this.sellerlist[s].id;
        console.log("seller exists");
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
/*
  onProductEdited(p: SellerProduct) {
    console.log(p);
  }
*/
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
  onAddProduct(newProduct: SellerProduct)
  {
    console.log("product is");
    console.log(newProduct);
    var Exists: boolean;
    Exists = false;
    var oldId: number;
    if(newProduct.id != 0)
    {
      console.log("id is bigger than 0 so exist = true");
      Exists = true;
      oldId = newProduct.id;
    }
      for(var s in this.sellerProduct)
    {
      //console.log("S id is "+ this.sellerProduct[s].id +" and S.name is "+this.sellerProduct[s].name);
      if(this.sellerProduct[s].name == newProduct.name)
      {
        Exists = true;
        oldId = this.sellerProduct[s].id;
      }
    }
    if(Exists == false)
    {
        this.service.postProduct(this.seller.id,newProduct).subscribe((result) => {
      console.log("new product with name "+ result.name + "was added");
      this.onGetProducts(this.seller.id);
    });
  }
  else
  {
    console.log("seller exists modifying now old id is "+ oldId);
        this.service.updateProduct(this.seller.id,oldId,newProduct).subscribe((result) => {
      console.log("product with name "+ result.name + "was modified");
      this.onGetProducts(this.seller.id);
    });
  }
  }

  editProduct(product: SellerProduct)
  {
    console.log("edit product is");
    console.log(product);
    const modalInstance = this.modalService.open(ProductCardComponent);
    var oldId: number;
    var newProduct : SellerProduct;

    modalInstance.componentInstance.product = {
      name: product.name,
      price: product.price,
      quantityInStock: product.quantityInStock,
      quantitySold: product.quantitySold,
      imagePath: product.imagePath,
      id: product.id
    };
    modalInstance.componentInstance.edit = true;
       modalInstance.result.then(obj => {
      console.log("Dialog was closed using OK");
      console.log(obj);
      newProduct = {
        id: obj.id,
        name: obj.name,
        price: obj.price,
        quantityInStock: obj.quantityInStock,
        quantitySold: obj.quantitySold,
        imagePath: obj.imagePath
      }
      console.log("new product is");
      console.log(newProduct);
      this.onAddProduct(newProduct);
    }).catch(err => {
      console.log("Dialog was cancelled");
      console.log(err);
    });
    }
  
  
    addProduct() {
    const modalInstance = this.modalService.open(ProductCardComponent);
    var newProduct : SellerProduct;
    modalInstance.componentInstance.product = {
      name: "name",
      price: 0,
      quantityInStock: 0,
      imagePath: "http://krishnendu.org/wp-content/uploads/2016/08/no_image.jpg",
      id: 7
    };
    modalInstance.componentInstance.edit = false;

    modalInstance.result.then(obj => {
      console.log("Dialog was closed using OK");
      console.log(obj);
      newProduct = {
        id: 0,
        name: obj.name,
        price: obj.price,
        quantityInStock: obj.quantityInStock,
        quantitySold: obj.quantitySold,
        imagePath: obj.imagePath
      }
      this.onAddProduct(newProduct);
    }).catch(err => {
      console.log("Dialog was cancelled");
      console.log(err);
    });
  }
  
  setTop10()
  {
    this.top10 = true;
  }
  setAllproducts()
  {
    this.top10 = false;
  }

  }
