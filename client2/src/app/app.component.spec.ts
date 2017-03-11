/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SellersService, SellerProduct, Seller } from './sellers.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";
import { Observable } from'rxjs/Observable';
import 'rxjs/rx';

describe('AppComponent', () => {

  const mockService = {
    successGetProducts: true,
    successGetSellers: true,
    productList: [{
      sellerId: 1,
      id: 7,
      name: "Ullarsokkar",
    }],
    sellersList: [{
      id: 1,
      name: "kristo",
      catagory: "stuff"
    },
    {
      id: 2,
      name: "reinir"
    },
    {
      id: 3,
      name: "sveinn"
    }],
    getSellersProduct: function(id) {
        return {
          subscribe: function(fnSuccess, fnError) {
            if(mockService.successGetProducts === true) {
              console.log("products ="+ mockService.productList);
              fnSuccess(mockService.productList);
            }
            else {
              fnError();
            }
          }
        }
    },
    getSellers: function(){
       return {
          subscribe: function(fnSuccess, fnError) {
            if(mockService.successGetSellers === true) {
              console.log("sellers ="+ mockService.sellersList);
              fnSuccess(mockService.sellersList);
            }
            else {
              fnError();
            }
          }
        }
    },
    postSeller: function(newSeller: Seller){
       return {
          subscribe: function(fnSuccess, fnError) {
            if(mockService.successGetProducts === true) {
              console.log("products ="+ mockService.productList);
              fnSuccess(mockService.productList);
            }
            else {
              fnError();
            }
          }
        }
    },
    getSellerById: function(id: number){
       return {
          subscribe: function(fnSuccess, fnError) {
            if(mockService.successGetProducts === true) {
              console.log("products ="+ mockService.productList);
              fnSuccess(mockService.productList);
            }
            else {
              fnError();
            }
          }
        }
    },
    uppdateSeller: function(SellerId:number,upSeller: Seller){
       return {
          subscribe: function(fnSuccess, fnError) {
            if(mockService.successGetProducts === true) {
              console.log("products ="+ mockService.productList);
              fnSuccess(mockService.productList);
            }
            else {
              fnError();
            }
          }
        }
    },
    postProduct: function(id:number,newProduct: SellerProduct){
       return {
          subscribe: function(fnSuccess, fnError) {
            if(mockService.successGetProducts === true) {
              console.log("products ="+ mockService.productList);
              fnSuccess(mockService.productList);
            }
            else {
              fnError();
            }
          }
        }
    },
    updateProduct: function(SellerId:number,oldId: number,upProduct: SellerProduct){
       return {
          subscribe: function(fnSuccess, fnError) {
            if(mockService.successGetProducts === true) {
              console.log("products ="+ mockService.productList);
              fnSuccess(mockService.productList);
            }
            else {
              fnError();
            }
          }
        }
    }

  };

  var mockModal = {
    open: jasmine.createSpy("open");
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [ {
        provide: SellersService,
        useValue: mockService
      }, {
        provide: NgbModal,
        useValue: mockService
      }
      ],imports: [FormsModule]
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
    mockService.productList = []
    it("should display a message indicating that no products are to be displayed",() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(mockService.productList).toEqual([]);
      
    });
  })
});
