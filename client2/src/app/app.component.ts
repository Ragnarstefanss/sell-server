import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SellersService, SellerProduct, Seller } from './sellers.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from './seller-dlg/seller-dlg.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'Söluaðilar!';
  workingPlaceholder = 'http://euronoticia.com/img/missing.jpg';

  products: SellerProduct[];
  sellerlist: Seller[];
  seller: Seller;
  sellerProduct: SellerProduct[];
  sellerSelected: Boolean;
  sellerName: string;
  sellerCatagory: string;
  sellerImagePath: string;
  newProduct: SellerProduct;
  showProducts: Boolean;

  constructor(private modalService: NgbModal, private service: SellersService, private toastrService: ToastrService) {
    this.sellerName = "";
    this.sellerCatagory = "";
    this.sellerImagePath = "";
  }

  ngOnInit() {
    this.onGetSellers();
    this.showProducts = false;
  };

  onGetProducts(num: number) {
    var successSellerProducts = result => {

      if (result.length > 0) {
        this.showProducts = true;
      }
      else {
        this.showProducts = false;
      }

      this.sellerProduct = result;
      this.changeToAll();

    }

    var errorSellerProducts = (err) => {
      this.toastrService.error('Could not get this seller products', 'Failed');
    }

    this.service.getSellerProducts(num).subscribe(successSellerProducts, errorSellerProducts);
  }

  getSeller(num: number) {

    var successGetSeller = result => {
      this.seller = result;
      this.sellerSelected = true;
    };

    var successGetSellerProducts = result => {
      if (result.length > 0) {
        this.showProducts = true;
      }
      else {
        this.showProducts = false;
      }
      this.sellerProduct = result;
      this.changeToAll();
    };

    var errorGetSeller = (err) => {
      this.toastrService.error('Could not get this seller', 'Failed');
    }

    var errorGetSellerProducts = (err) => {
      this.toastrService.error('Could not get seller products', 'Failed');
    }

    this.service.getSellerById(num).subscribe(successGetSeller, errorGetSeller);
    this.service.getSellerProducts(num).subscribe(successGetSellerProducts, errorGetSellerProducts);
  }

  changeToAll() {
    this.sellerProduct = this.sellerProduct.sort(function(a, b) {
      return a.id < b.id ? 1 : -1
    });
  }

  changeToTop10() {
    this.sellerProduct = this.sellerProduct.sort(function(a, b) {
      return a.quantitySold < b.quantitySold ? 1 : -1
    });
  }

  onGetSellers() {
    var successGetSellers = result => {
      this.sellerlist = result;
      //console.log(JSON.stringify(this.sellerlist));
    };
    var errorHandler = (err) => {
      this.toastrService.error('Could not get seller list', 'Failed');
    }
    this.service.getSellers().subscribe(successGetSellers, errorHandler);
    this.sellerSelected = false;
  }

  onAddSeller() {
    var newSeller: Seller;
    var Exists: boolean;
    Exists = false;
    var oldId: number;
    newSeller = {
      id: 0,
      name: this.sellerName,
      category: this.sellerCatagory,
      imagePath: this.sellerImagePath
    }

    if (newSeller.name == null || newSeller.name == "") {
      this.toastrService.warning("seller name is required");
      return;
    }

    for (var s in this.sellerlist) {
      //console.log("S id is "+ this.sellerlist[s].id +" and S.name is "+this.sellerlist[s].name);
      if (this.sellerlist[s].name == this.sellerName) {
        Exists = true;
        oldId = this.sellerlist[s].id;
        //this.toastrService.warning('User already exists!');
      }
    }
    if (Exists == false) {
      this.service.postSeller(newSeller).subscribe((result) => {
        this.toastrService.success(result.name + ' was added to seller list', 'Success');
        this.onGetSellers();
      });
    }
    else {
      this.service.uppdateSeller(oldId, newSeller).subscribe((result) => {
        this.toastrService.warning(result.name + " was modified");
        this.onGetSellers();
      });
    }
  }

  addSeller() {
    const modalInstance = this.modalService.open(SellerDlgComponent);
    var newSeller: Seller;
    var Exists: boolean;
    Exists = false;
    var oldId: number;

    modalInstance.componentInstance.seller = {
      name: "",
      category: "undefined",
      imagePath: "http://krishnendu.org/wp-content/uploads/2016/08/no_image.jpg",
      id: 0
    };
    modalInstance.result.then(obj => {
      console.log("object is" +JSON.stringify(obj));
      this.sellerName = obj.name;
      this.sellerCatagory = obj.category;
      this.sellerImagePath = obj.imagePath;
      console.log("object is" +JSON.stringify(obj));
      this.onAddSeller();
    })
    /*.catch(err => {
      this.toastrService.warning("Dialog was cancelled");
    });
    */
    
    
    
  }

  onAddProduct(newProduct: SellerProduct) {
    var Exists: boolean;
    Exists = false;
    var oldId: number;
    if (newProduct.id != 0) {
      //console.log("id is bigger than 0 so exist = true");
      Exists = true;
      oldId = newProduct.id;
    }
    for (var s in this.sellerProduct) {
      //console.log("S id is "+ this.sellerProduct[s].id +" and S.name is "+this.sellerProduct[s].name);
      if (this.sellerProduct[s].name == newProduct.name) {
        Exists = true;
        oldId = this.sellerProduct[s].id;
      }
    }
    if (Exists == false) {
      this.service.postProduct(this.seller.id, newProduct).subscribe((result) => {
        //TODO
        this.toastrService.success('item was added to product list', 'Success');
        this.onGetProducts(this.seller.id);
      });
    }
    else {
      console.log("seller exists modifying now old id is " + oldId);
      this.service.updateProduct(this.seller.id, oldId, newProduct).subscribe((result) => {
        //TODO
        this.toastrService.warning('item was modified');
        this.onGetProducts(this.seller.id);
      });
    }
  }

  editProduct(product: SellerProduct) {
    const modalInstance = this.modalService.open(ProductCardComponent);
    var oldId: number;
    var newProduct: SellerProduct;

    modalInstance.componentInstance.product = {
      name: product.name,
      price: product.price,
      quantityInStock: product.quantityInStock,
      quantitySold: product.quantitySold,
      imagePath: product.imagePath,
      id: product.id
    };
    modalInstance.componentInstance.edit = true;
    modalInstance.componentInstance
    modalInstance.result.then(obj => {
      newProduct = {
        id: obj.id,
        name: obj.name,
        price: obj.price,
        quantityInStock: obj.quantityInStock,
        quantitySold: obj.quantitySold,
        imagePath: obj.imagePath
      }
      this.onAddProduct(newProduct);
    })
    /*.catch(err => {
      this.toastrService.warning("Dialog was cancelled");
    });
    */
    
  }


  addProduct() {
    const modalInstance = this.modalService.open(ProductCardComponent);
    var newProduct: SellerProduct;
    modalInstance.componentInstance.product = {
      name: "name",
      price: 0,
      quantityInStock: 0,
      imagePath: "http://krishnendu.org/wp-content/uploads/2016/08/no_image.jpg",
      id: 7
    };
    modalInstance.componentInstance.edit = false;

    modalInstance.result.then(obj => {
      newProduct = {
        id: 0,
        name: obj.name,
        price: obj.price,
        quantityInStock: obj.quantityInStock,
        quantitySold: obj.quantitySold,
        imagePath: obj.imagePath
      }
      this.onAddProduct(newProduct);
    })
    /*
    .catch(err => {
      this.toastrService.warning("Dialog was cancelled");
    });
    */
  }

}
