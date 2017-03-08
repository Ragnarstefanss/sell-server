/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SellersService} from './sellers.service';

describe('AppComponent', () => {

  const mockService = {
    successGetProducts: true,
    productList: [{
      id: 7,
      name: "Ullarsokkar",
    }],
    getSellersProduct: function(id) {
        return {
          subscribe: function(fnSuccess, fnError) {
            if(mockService.successGetProducts === true) {
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
        provide: ngbModal
        useValue: mockService
      }
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));

  describe("when sellers service returns empty list of products", () => {
    mockService.successGetProducts = true;
    mockService.productList = []
    it("should display a message indicating that no products are to be displayed" () => {

    });
  })
});
