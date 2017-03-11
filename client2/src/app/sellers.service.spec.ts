/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SellersService, SellerProduct, Seller } from './sellers.service';
import { FormsModule } from "@angular/forms";
import { Observable } from'rxjs/Observable';
import 'rxjs/rx';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


describe('SellersService', () => {
  let subject: SellersService = null;
  let backend: MockBackend = null;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockBackend,
    BaseRequestOptions,
    {
      provide: Http,
      useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backendInstance, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },SellersService],imports: [FormsModule]
    });
  });

  it('should return an empty list of sellers', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let seller: Seller[];
    seller = [];
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify( [] ),
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .getSellers()
      .subscribe((response) => {
        console.log(<Seller[]> response);
        expect(response).toEqual([]);
        //done();
      });
    expect(service).toBeTruthy();
  }));
});
