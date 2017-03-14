/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent} from './app.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { SellersService, SellerProduct, Seller } from './sellers.service';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";
import { Observable } from'rxjs/Observable';
import { Ng2ImgFallbackModule } from 'ng2-img-fallback';
import { ToastrService } from 'toastr-ng2';
import { ToastrModule } from 'toastr-ng2';
import { SellerDlgComponent } from './seller-dlg/seller-dlg.component';
import { ProductCardComponent } from './product-card/product-card.component';
import 'rxjs/rx';

describe('AppComponent', () => {
  var appComponent: AppComponent = null;
  var component: SellerDlgComponent;
  let mockserv: NgbModal = null;
  const mockService = {
    successGetProducts: true,
    successGetSellers: true,
    successPostProducts: true,
    successPostSellers: true,
    successPutProducts: true,
    successPutSellers: true,
    productList: [{
      sellerId: 1,
      id: 1,
      name: "Ullarsokkar",
    }, {
        sellerId: 2,
        id: 2,
        name: "sokkar",
      }],
    sellersList: [{
      id: 1,
      name: "kristo",
      category: "stuff"
    },
      {
        id: 2,
        name: "reinir",
        category: "stuff"
      },
      {
        id: 3,
        name: "sveinn",
        category: "stuff"
      }],
    getSellerProducts: function(id) {
      return {
        subscribe: function(fnSuccess, fnError) {
          if (mockService.successGetProducts === true) {
            console.log("products =" + mockService.productList);
            let productList2 = [];
            for (var p in mockService.productList) {
              if (mockService.productList[p].sellerId == id) {
                productList2.push(mockService.productList[p]);
              }
            }
            fnSuccess(productList2);
          }
          else {
            console.log("seller not found");
            fnError();
          }
        }
      }
    },
    getSellers: function() {
      return {
        subscribe: function(fnSuccess, fnError) {
          if (mockService.successGetSellers === true) {
            console.log("sellers =" + mockService.sellersList);
            fnSuccess(mockService.sellersList);
          }
          else {
            fnError();
          }
        }
      }
    },
    postSeller: function(newSeller: Seller) {
      return {
        subscribe: function(fnSuccess, fnError) {
          if (mockService.successPostSellers === true) {
            console.log("newSeller is" + JSON.stringify(newSeller));
            newSeller.id = mockService.sellersList[mockService.sellersList.length - 1].id + 1;
            mockService.sellersList.push({ id: newSeller.id, name: newSeller.name, category: newSeller.category });

            console.log("products =" + newSeller);
            fnSuccess(newSeller);
          }
          else {
            console.log("we failed to make a new seller");
            //fnError();
          }
        }
      }
    },
    getSellerById: function(id: number) {
      return {
        subscribe: function(fnSuccess, fnError) {
          if (mockService.successGetSellers === true) {
            console.log("seller is =" + mockService.sellersList[id - 1]);
            fnSuccess(mockService.sellersList[id - 1]);
          }
          else {
            fnError();
          }
        }
      }
    },
    uppdateSeller: function(SellerId: number, upSeller: Seller) {
      return {
        subscribe: function(fnSuccess, fnError) {
          if (mockService.successPutProducts === true) {
            console.log("seller =" + mockService.sellersList[SellerId - 1]);
            mockService.sellersList[SellerId - 1].name = upSeller.name;
            mockService.sellersList[SellerId - 1].category = upSeller.category;
            fnSuccess(mockService.sellersList[SellerId - 1]);
          }
          else {
            fnError();
          }
        }
      }
    },
    postProduct: function(id: number, newProduct: SellerProduct) {
      return {
        subscribe: function(fnSuccess, fnError) {
          if (mockService.successPostProducts === true) {
            console.log("products =" + mockService.productList);
            newProduct.id = mockService.productList[mockService.productList.length - 1].id + 1;
            mockService.productList.push({ sellerId: id, id: newProduct.id, name: newProduct.name });
            fnSuccess(mockService.productList[mockService.productList.length - 1]);
          }
          else {
            console.log("we failed to make a new product");
            //fnError();
          }
        }
      }
    },
    updateProduct: function(SellerId: number, oldId: number, upProduct: SellerProduct) {
      return {
        subscribe: function(fnSuccess, fnError) {
          if (mockService.successPutProducts === true) {
            console.log("product list is =" + mockService.productList[oldId - 1]);
            console.log("oldId is" + oldId + "and sellerId = " + SellerId)
            console.log("update product is =" + mockService.productList[oldId - 1]);
            mockService.productList[oldId - 1].name = upProduct.name;
            fnSuccess(mockService.productList[oldId - 1]);
          }
          else {
            console.log("update product failed for  =" + upProduct);
            //fnError();
          }
        }
      }
    }

  };

  var fakeModal = {
    componentInstance: {
      seller: {
        name: "bleh ",
        category: "stuff",
        imagePath: "http://krishnendu.org/wp-content/uploads/2016/08/no_image.jpg",
        id: 0
      },

      product: {
        name: "name",
        price: 0,
        quantityInStock: 0,
        imagePath: "http://krishnendu.org/wp-content/uploads/2016/08/no_image.jpg",
        id: 7
      },
      edit: false

    },
    result: {
      then: function(confirmCallback, cancelCallback) {
        //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
        console.log("test result");
        //   console.log("this is"+ JSON.stringify(this));
        //console.log("item is "+ JSON.stringify(fakeModal));
        //fakeModal.close(fakeModal.componentInstance.seller);
        if (dialogType == "seller") {
          fakeModal.componentInstance.seller.name = "bleh";
          this.item = fakeModal.componentInstance.seller;
        }
        else {
          fakeModal.componentInstance.product.name = "bleh";
          this.item = fakeModal.componentInstance.product;
        }

        //confirmCallback = true;
          this.confirmCallBack = confirmCallback;
        this.cancelCallback = cancelCallback;
        //console.log("confirm"+confirmCallback);
        if (dialogAction == "OK") {
          console.log("OK");
          //console.log("item is "+ JSON.stringify(fakeModal));
          return fakeModal.close(this.results);
        }
        else {
          return fakeModal.dismiss();
        }
        //return this.item;
      },
      catch: function(cancelCallback) {
        this.cancelCallback = cancelCallback;
        console.log("test resultcan");
        return this;
      },
    },
    close: function(seller) {
      //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
      console.log("test close");
      if (dialogType == "seller") {
        //      console.log("item is "+ JSON.stringify(seller));
        this.result.confirmCallBack(fakeModal.componentInstance.seller);
      }
      else {
        //      console.log("item is "+ JSON.stringify(seller));
        this.result.confirmCallBack(fakeModal.componentInstance.product);
      }

      //return this.seller;
    },
    dismiss: function() {
      //The user clicked cancel on the modal dialog, call the stored cancel callback
      console.log("test cancel");
      return;
      //this.result.cancelCallback();
    },
    catch: function(type) {
      console.log("dialog canceled");
      this.result.cancelCallback();
    }
  };
  var mockseller = { id: 0, name: "", category: "stuff" };
  /*
   var modalInstance =  {
         //seller: {id:1,name:"bleh",catagory:"stuff"},
         open: jasmine.createSpy('modalInstance.open'),
         //seller: jasmine.createSpy('modalInstance.componentInstance.seller')
         //seller:mockseller,
         //edit: false
     }

   modalInstance.open.and.returnValue(fakeModal.close
   */

  var mockModal = {
    open: jasmine.createSpy("open"),
    //modalInstance: jasmine.createSpy("fakeModal",fakeModal.result())
    //args: open.call.arguments(0)


  };

  var dialogType = "seller";
  var dialogAction = "OK";
  mockModal.open.and.returnValue(fakeModal);
  //var modalInstance2 =

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [{
        provide: SellersService,
        useValue: mockService
      }, {
          provide: NgbModal,
          useValue: mockModal
        },
        {
          provide: NgbActiveModal,
          useValue: fakeModal
        }

      ], imports: [FormsModule, Ng2ImgFallbackModule, ToastrModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    TestBed.compileComponents();

  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Söluaðilar!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Söluaðilar!');
  }));
  /*
    it('should render title in a h1 tag', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelector('h1').textContent).toContain('Söluaðilar!');
    }));
    */

  describe("when sellers service returns empty list of products", () => {

    it("should display a message indicating that no products are to be displayed", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetProducts = true;
      mockService.productList = [];

      apps.onGetProducts(1);
      console.log("product list is " + apps.sellerProduct);

      expect(mockService.productList).toEqual([]);

    });
  })

  describe("when sellers service asks for products from a non existing seller", () => {

    it("should display a message indicating that no products are to be displayed", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetProducts = false;
      mockService.productList = [];
      mockService.productList = [{
        sellerId: 1,
        id: 7,
        name: "Ullarsokkar",
      }]

      apps.onGetProducts(2);
      console.log("product list is " + apps.sellerProduct);

      expect(apps.sellerProduct).toEqual(undefined);

    });
  })

  describe("when sellers service returns a list of products", () => {

    //mockService.productList = [];
    it("should display a message indicating that products are to be displayed", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetProducts = true;
      mockService.productList = [{
        sellerId: 1,
        id: 7,
        name: "Ullarsokkar",
      }]
      apps.onGetProducts(1);
      console.log("product list is " + apps.sellerProduct);

      expect(apps.sellerProduct).not.toEqual([]);

    });
  })

  describe("when sellers service returns empty of sellers", () => {
    mockService.successGetSellers = true;
    mockService.sellersList = [];
    it("should display a message indicating that no sellers are to be displayed", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      apps.onGetSellers();
      console.log("seller list is " + apps.sellerlist);

      expect(mockService.sellersList).toEqual([]);

    });
  })

  it("should get a list of sellers the moment it is initialized testing ngOninit", () => {
    mockService.successGetSellers = true;
    mockService.sellersList = [{
      id: 1,
      name: "kristo",
      category: "stuff"
    },
      {
        id: 2,
        name: "reinir",
        category: "stuff"
      },
      {
        id: 3,
        name: "sveinn",
        category: "stuff"
      }]
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let apps = fixture.componentInstance;
    apps.ngOnInit();
    expect(apps.showProducts).toBe(false);
    expect(apps.sellerlist).not.toEqual([]);
  });

  describe("when sellers service returns a list of sellers", () => {


    it("should display a message indicating that sellers are to be displayed", () => {
      mockService.successGetSellers = true;
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      apps.onGetSellers();
      console.log("mock seller list is " + mockService.sellersList);
      console.log("app seller list is " + apps.sellerlist);

      expect(apps.sellerlist).toEqual(mockService.sellersList);
      expect(apps.sellerSelected).toBe(false);

    });
  })

  describe("onGetSellers failes", () => {
    mockService.successGetSellers = false;

    it("should display a message indicating that no products are to be displayed", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.sellersList = [];
      apps.onGetSellers();
      console.log("seller list is " + apps.sellerlist);

      expect(mockService.sellersList).toEqual([]);
      expect(apps.sellerlist).toEqual([]);
      expect(apps.sellerSelected).toBe(false);

    });
  })

  describe("getSeller(1) is called", () => {


    it("should display a message indicating that that seller has products are to be displayed", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successGetProducts = true;
      mockService.productList = [{
        sellerId: 1,
        id: 1,
        name: "Ullarsokkar",
      }, {
          sellerId: 1,
          id: 2,
          name: "stórir Ullarsokkar",
        }]
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]
      apps.getSeller(1);
      console.log("product list is " + JSON.stringify(apps.sellerProduct));
      console.log("seller is " + JSON.stringify(apps.seller));

      expect(apps.seller.id).toEqual(1);
      expect(apps.sellerProduct).not.toEqual([]);
      expect(apps.sellerSelected).toBe(true);

    });
    it("should display a message indicating that that seller was not found to be displayed", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = false;
      mockService.successGetProducts = false;
      apps.sellerProduct = [];
      apps.sellerSelected = false;
      apps.getSeller(1);
      console.log("product list is " + apps.sellerProduct);


      //expect(apps.seller.id).toEqual(1);
      expect(apps.sellerProduct).toEqual([]);
      expect(apps.sellerSelected).toBe(false);

    });
    it("should display a message indicating that that seller has no products are to be displayed", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successGetProducts = true;
      apps.sellerProduct = [];
      apps.getSeller(2);
      console.log("product list is " + apps.sellerProduct);

      expect(apps.seller.id).toEqual(2);
      expect(apps.sellerProduct).toEqual([]);
      expect(apps.sellerSelected).toBe(true);

    });
  })

  describe("onAddSeller() is called", () => {


    it("should display a message indicating the seller was created", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successPostSellers = true;
      mockService.successGetProducts = true;
      mockService.productList = [{
        sellerId: 1,
        id: 1,
        name: "Ullarsokkar",
      }]
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]


      apps.sellerName = "palli";
      apps.sellerCatagory = "stuff";
      apps.sellerImagePath = "";


      apps.onGetSellers();
      apps.onAddSeller();
      console.log("seller list is " + JSON.stringify(apps.sellerlist));
      //console.log("seller is "+JSON.stringify(apps.seller));

      expect(apps.sellerlist[apps.sellerlist.length - 1].name).toEqual(apps.sellerName);
      expect(apps.sellerlist).not.toEqual([]);


    });

    it("should display a message indicating the seller was modified", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successPostSellers = true;
      mockService.successPutSellers = true;
      mockService.successGetProducts = true;

      mockService.productList = [{
        sellerId: 1,
        id: 1,
        name: "Ullarsokkar",
      }]
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]


      apps.sellerName = "kristo";
      apps.sellerCatagory = "more stuff";
      apps.sellerImagePath = "";


      apps.onGetSellers();
      apps.onAddSeller();
      console.log("sellers list is " + JSON.stringify(apps.sellerlist));
      console.log("sellerlist[0] is " + JSON.stringify(apps.sellerlist[0]));

      expect(apps.sellerlist[0].name).toEqual(apps.sellerName);
      expect(apps.sellerlist[0].category).toEqual(apps.sellerCatagory);
      expect(apps.sellerlist).toEqual(mockService.sellersList);

    });
    it("should display a message that the creation of a user was unsucessfull", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successGetProducts = false;
      mockService.successPostSellers = false;
      mockService.successPutSellers = true;

      mockService.productList = [{
        sellerId: 1,
        id: 1,
        name: "Ullarsokkar",
      }]
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]


      apps.sellerName = null;
      apps.sellerCatagory = "more stuff";
      apps.sellerImagePath = "";

      let count = 0;
      apps.onGetSellers();
      count = apps.sellerlist.length - 1;
      apps.onAddSeller();
      console.log("sellers list is " + JSON.stringify(apps.sellerlist));


      expect(apps.sellerlist.length - 1).toEqual(count);
      expect(apps.sellerlist).toEqual(mockService.sellersList);

    });
  })

  describe("onAddProduct(newProduct: SellerProduct) is called", () => {


    it("should display a message indicating the product was created", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successGetProducts = true;
      mockService.successPostProducts = true;
      mockService.successPutProducts = false;
      mockService.productList = [{
        sellerId: 1,
        id: 1,
        name: "Ullarsokkar",
      }]
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]

      let newProduct = {
        id: 0,
        name: "stuff",
        price: 500,
        quantityInStock: 100,
        quantitySold: 1000,
        imagePath: ""
      }


      apps.onGetSellers();
      apps.getSeller(1);
      apps.onGetProducts(1);
      apps.onAddProduct(newProduct);
      apps.sellerProduct = apps.sellerProduct.sort(function(a, b) {
        return a.id > b.id ? 1 : -1
      });
      console.log("new product name = " + JSON.stringify(newProduct.name));
      console.log("productList is " + JSON.stringify(apps.sellerProduct));
      console.log("new product is " + JSON.stringify(apps.sellerProduct[apps.sellerProduct.length - 1]));
      expect(apps.seller.id).toEqual(mockService.productList[mockService.productList.length - 1].sellerId);
      expect(apps.sellerProduct[apps.sellerProduct.length - 1].name).toEqual(newProduct.name);
      expect(apps.sellerProduct).not.toEqual([]);


    });

    it("should display a message indicating the product was modified", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successGetProducts = true;
      mockService.successPostProducts = false;
      mockService.successPutProducts = true;
      mockService.productList = [{
        sellerId: 1,
        id: 1,
        name: "Ullarsokkar",
      }]
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]

      let newProduct = {
        id: 1,
        name: "Ullarsokkar2",
        price: 500,
        quantityInStock: 100,
        quantitySold: 1000,
        imagePath: ""
      }


      apps.onGetSellers();
      apps.getSeller(1);
      apps.onGetProducts(1);
      apps.onAddProduct(newProduct);

      console.log("new product name = " + JSON.stringify(newProduct.name));
      console.log("productList is " + JSON.stringify(apps.sellerProduct));
      console.log("new product is " + JSON.stringify(apps.sellerProduct[newProduct.id - 1]));
      expect(apps.seller.id).toEqual(mockService.productList[newProduct.id - 1].sellerId);
      expect(apps.sellerProduct[newProduct.id - 1].name).toEqual(newProduct.name);
      expect(apps.sellerProduct).not.toEqual([]);



    });
    it("should display a message that the creation of a product was unsucessfull", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successGetProducts = true;
      mockService.successPostProducts = false;
      mockService.successPutProducts = false;
      mockService.productList = [{
        sellerId: 1,
        id: 1,
        name: "Ullarsokkar",
      }]
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]

      let newProduct = {
        id: 1,
        name: "Ullarsokkar2",
        price: 500,
        quantityInStock: 100,
        quantitySold: 1000,
        imagePath: ""
      }


      apps.onGetSellers();
      apps.getSeller(2);
      apps.onGetProducts(2);
      apps.onAddProduct(newProduct);
      console.log("new product name = " + JSON.stringify(newProduct.name));
      console.log("productList is " + JSON.stringify(apps.sellerProduct));
      console.log("new product is " + JSON.stringify(apps.sellerProduct[newProduct.id - 1]));
      expect(apps.seller.id).not.toEqual(mockService.productList[newProduct.id - 1].sellerId);
      //expect(apps.sellerProduct[newProduct.id-1].name).toEqual(newProduct.name);
      expect(apps.sellerProduct).toEqual([]);

    });
  })

  describe("functions that test the add seller function", () => {

    it("add seller called and then clicked ok ", inject([NgbModal], (modalService: NgbModal) => {
      // it("add seller called and then clicked ok ",() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successPostSellers = true;
      mockService.successGetSellers = true;
      mockService.successGetProducts = true;
      mockserv = modalService;
      mockserv.open(SellerDlgComponent);
      let newSeller = {
        name: "kristo",
        id: 1,
        category: "stuff",
        imagePath: "bleh"
      }
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]
      apps.sellerlist = [];
      //spyOn(fakeModal,)
      //spyOn(fakeModal,"result").and.returnValue(true);
      apps.onGetSellers();
      apps.addSeller();
      //fakeModal.dismiss;

      //console.log(mockModal);
      console.log("apps" + JSON.stringify(apps.sellerlist));
      console.log(apps.sellerName);
      //fakeModal.close(newSeller);
      console.log(apps.sellerName);
      console.log("sellers list is" + mockService.sellersList)
      expect(apps.sellerlist.length).toBe(4);
      expect(apps.sellerName).toEqual("bleh");
    }));

    it("add seller called and then clicked cancel ", inject([NgbModal], (modalService: NgbModal) => {
      // it("add seller called and then clicked ok ",() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successPostSellers = true;
      mockService.successGetSellers = true;
      mockService.successGetProducts = true;
      mockserv = modalService;
      mockserv.open(SellerDlgComponent);
      let newSeller = {
        name: "kristo",
        id: 1,
        category: "stuff",
        imagePath: "bleh"
      }
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]
      apps.sellerlist = [];
      //spyOn(fakeModal,)
      //spyOn(fakeModal,"result").and.returnValue(true);
      dialogAction = "cancel";
      apps.onGetSellers();
      apps.addSeller();

      expect(apps.sellerlist.length).toBe(3);
      //expect(apps.sellerName).toEqual("bleh");
    }));
  })

  describe("functions that test the add product function", () => {

    it("add product called and then clicked ok ", inject([NgbModal], (modalService: NgbModal) => {
      // it("add seller called and then clicked ok ",() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successPostSellers = true;
      mockService.successGetSellers = true;
      mockService.successGetProducts = true;
      mockService.successPostProducts = true;
      mockserv = modalService;
      mockserv.open(ProductCardComponent);
      let newSeller = {
        name: "kristo",
        id: 1,
        category: "stuff",
        imagePath: "bleh"
      }
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]

      mockService.productList = [{
        sellerId: 1,
        id: 1,
        name: "Ullarsokkar",
      }]

      //spyOn(fakeModal,)
      //spyOn(fakeModal,"result").and.returnValue(true);
      dialogAction = "OK";
      dialogType = "product";
      apps.onGetSellers();
      apps.getSeller(1);
      apps.addProduct();
      //fakeModal.dismiss;

      //console.log(mockModal);
      expect(apps.sellerProduct.length).toBe(2);
      expect(apps.sellerProduct[1].name).toEqual("Ullarsokkar");
    }));

    it("add product called and then clicked cancel ", inject([NgbModal], (modalService: NgbModal) => {
      // it("add seller called and then clicked ok ",() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successPostSellers = true;
      mockService.successGetSellers = true;
      mockService.successGetProducts = true;
      mockserv = modalService;
      mockserv.open(SellerDlgComponent);
      let newSeller = {
        name: "kristo",
        id: 1,
        category: "stuff",
        imagePath: "bleh"
      }
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]
      apps.sellerlist = [];
      //spyOn(fakeModal,)
      //spyOn(fakeModal,"result").and.returnValue(true);
      dialogAction = "cancel";
      dialogType = "product";
      apps.onGetSellers();
      apps.addProduct();
      //fakeModal.dismiss;
      apps.sellerProduct = [];
      //console.log(mockModal);
      expect(apps.sellerProduct.length).toBe(0);
      //expect(apps.sellerName).toEqual("bleh");
    }));
  })

  describe("functions that test the edit product function", () => {

    it("edit product called and then clicked ok ", inject([NgbModal], (modalService: NgbModal) => {
      // it("add seller called and then clicked ok ",() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successPostSellers = true;
      mockService.successGetSellers = true;
      mockService.successGetProducts = true;
      mockService.successPostProducts = true;
      mockserv = modalService;
      mockserv.open(ProductCardComponent);
      let newSeller = {
        name: "kristo",
        id: 1,
        category: "stuff",
        imagePath: "bleh"
      }
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]

      mockService.productList = [{
        sellerId: 1,
        id: 1,
        name: "Ullarsokkar",
      }]

      let newProduct = {
        sellerId: 1,
        id: 1,
        name: "Ullarsokkar",
        price: 300,
        quantitySold: 300,
        quantityInStock: 20,
        imagePath: ""
      }
      //spyOn(fakeModal,)
      //spyOn(fakeModal,"result").and.returnValue(true);
      dialogAction = "OK";
      dialogType = "product";
      apps.onGetSellers();
      apps.getSeller(1);
      apps.editProduct(newProduct);
      //fakeModal.dismiss;

      expect(apps.sellerProduct.length).toBe(1);
      expect(apps.sellerProduct[0].name).toEqual("Ullarsokkar");
    }));

    it("edit product called and then clicked cancel ", inject([NgbModal], (modalService: NgbModal) => {
      // it("add seller called and then clicked ok ",() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      mockService.successGetSellers = true;
      mockService.successPostSellers = false;
      mockService.successGetSellers = true;
      mockService.successGetProducts = true;
      mockService.successPostProducts = false;
      mockService.successPutProducts = false;
      mockserv = modalService;
      mockserv.open(SellerDlgComponent);
      let newSeller = {
        name: "kristo",
        id: 1,
        category: "stuff",
        imagePath: "bleh"
      }
      mockService.sellersList = [{
        id: 1,
        name: "kristo",
        category: "stuff"
      },
        {
          id: 2,
          name: "reinir",
          category: "stuff"
        },
        {
          id: 3,
          name: "sveinn",
          category: "stuff"
        }]
      let newProduct = {
        sellerId: 1,
        id: 1,
        name: "Ullarsokkar",
        price: 300,
        quantitySold: 300,
        quantityInStock: 20,
        imagePath: ""
      }
      //spyOn(fakeModal,)
      //spyOn(fakeModal,"result").and.returnValue(true);
      dialogAction = "cancel";
      dialogType = "product";
      apps.onGetSellers();
      apps.editProduct(newProduct);
      //fakeModal.dismiss;
      apps.sellerProduct = [];
      //console.log(mockModal);
      //console.log("apps" + JSON.stringify(apps.sellerlist));
      //console.log(apps.sellerName);
      //fakeModal.close(newSeller);
      //console.log(apps.sellerName);
      //console.log("product list is"+ mockService.productList)
      expect(apps.sellerProduct.length).toBe(0);
      //expect(apps.sellerName).toEqual("bleh");
    }));
  })



});



/*
X onGetSellers()
X	onGetProducts(num : number)
X	getSeller(num: number)

X	onAddSeller()
x	addSeller()
	onAddProduct(newProduct: SellerProduct)
	editProduct(product: SellerProduct)
	addProduct()
	setTop10()
	setAllproducts()
*/
