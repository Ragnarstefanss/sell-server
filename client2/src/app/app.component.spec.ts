/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent} from './app.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { SellersService, SellerProduct, Seller } from './sellers.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";
import { Observable } from'rxjs/Observable';
import 'rxjs/rx';

describe('AppComponent', () => {
  let appComponent: AppComponent = null;
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
            fnSuccess(mockService.productList);
          }
          else {
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

  var mockModal = {
    open: jasmine.createSpy("open"),
  };

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
          useValue: mockService
        }
      ], imports: [FormsModule],
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

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h1').textContent).toContain('Söluaðilar!');
  }));

  describe("when sellers service returns empty list of products", () => {
    mockService.successGetProducts = true;
    mockService.productList = [];
    it("should display a message indicating that no products are to be displayed", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;

      apps.onGetProducts(1);
      console.log("product list is " + apps.sellerProduct);

      expect(mockService.productList).toEqual([]);

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
      mockService.successGetProducts = false;
      apps.sellerProduct = [];
      apps.getSeller(1);
      console.log("product list is " + apps.sellerProduct);

      expect(apps.seller.id).toEqual(1);
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
      expect(apps.sellerProduct).not.toEqual([]);

    });
  })
/*
  describe("functions that test the variable top10", () => {


    it("setTop10 is called top10 should be true ", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      apps.setTop10();
      expect(apps.top10).toBe(true);
    });

    it("setAllproducts() is called top10 should be false ", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      let apps = fixture.componentInstance;
      apps.setAllproducts();
      expect(apps.top10).toBe(false);
    });
  })
*/
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
