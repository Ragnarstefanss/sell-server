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
        expect(subject.statusNr).toBe(200);
        expect(response).toEqual([]);
        //done();
      });
    expect(service).toBeTruthy();
  }));
  it('should return a non empty list of sellers', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let sellers: Seller[];
    sellers = [{"id":1,"name":"Hannyrðaþjónusta Hannesar","category":"Fatnaður","imagePath":"http://i.imgur.com/OYVpe2W.jpg?fb"}];
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify( sellers ),
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .getSellers()
      .subscribe((response) => {
        expect(subject.statusNr).toBe(200);
        expect(response).not.toEqual([]);
        //done();
      });
    expect(service).toBeTruthy();
  }));
    it('should return an existing seller', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let seller: Seller;
    seller = {"id":1,"name":"Hannyrðaþjónusta Hannesar","category":"Fatnaður","imagePath":"http://i.imgur.com/OYVpe2W.jpg?fb"};
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify( seller ),
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .getSellerById(1)
      .subscribe((response) => {
        console.log("response from getSellerById(1) = "+ response.name);
        expect(subject.statusNr).toBe(200);
        expect(response).not.toEqual([]);
        //done();
      });
    expect(service).toBeTruthy();
  }));
     it('should return nothing and set the status code to 404', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let seller: Seller;
    seller = {"id":1,"name":"Hannyrðaþjónusta Hannesar","category":"Fatnaður","imagePath":"http://i.imgur.com/OYVpe2W.jpg?fb"};
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        //body: JSON.stringify([]),
        status: 404
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .getSellerById(2)
      .subscribe((response) => {
        console.log("response from getSellerById(2) = "+ response);
        expect(subject.statusNr).toBe(404);
        expect(response).not.toEqual([]);
        //done();
      });
    expect(service).toBeTruthy();
  }));

    it('test seller post seller with name catagory and imagepath', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let newSeller: Seller;
    newSeller = {"id":0,"name":"Smíðaverkstæði Sigríðar", "category":"Skartgripir","imagePath": "https://i.imgur.com/ywaPivVh.jpg"};
    let seller: Seller[];
    seller = [{"id":1,"name":"Hannyrðaþjónusta Hannesar","category":"Fatnaður","imagePath":"http://i.imgur.com/OYVpe2W.jpg?fb"}];
    backend.connections.subscribe((connection: MockConnection) => {
      let newSeller2: Seller;
      newSeller2 = newSeller;
      newSeller2.id = seller[seller.length - 1].id + 1;
      seller.push(newSeller2);
      let options = new ResponseOptions({
        body: JSON.stringify(newSeller2),
        status: 201
      });
      connection.mockRespond(new Response(options));
      
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      
      .postSeller(newSeller)
      .subscribe((response) => {
        console.log("response from postSeller(newSeller) = "+ response);
        expect(subject.statusNr).toBe(201);
        expect(response).toEqual({"id":2,"name":"Smíðaverkstæði Sigríðar", "category":"Skartgripir","imagePath": "https://i.imgur.com/ywaPivVh.jpg"});
        //done();
      });
    expect(service).toBeTruthy();
  }));

     it('test seller post seller with no name returns statuscode 400', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let newSeller: Seller;
    newSeller = {"id":null,"name":null, "category":"Skartgripir","imagePath": "https://i.imgur.com/ywaPivVh.jpg"};
    let seller: Seller[];
    seller = [{"id":1,"name":"Hannyrðaþjónusta Hannesar","category":"Fatnaður","imagePath":"http://i.imgur.com/OYVpe2W.jpg?fb"}];
    backend.connections.subscribe((connection: MockConnection) => {
      //newSeller.id = seller[seller.length - 1].id + 1;
      //seller.push(newSeller);
      let options = new ResponseOptions({
        body: JSON.stringify('Error 400: Seller needs a name!'),
        status: 400
      });
      connection.mockRespond(new Response(options));
      
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      
      .postSeller(newSeller)
      .subscribe((response) => {
        console.log("response from postSeller(newSeller) = "+ response);
        expect(subject.statusNr).toBe(400);
        expect(response).toEqual('Error 400: Seller needs a name!');
        //done();
      });
    expect(service).toBeTruthy();
  }));

      it('test existing seller with correct name statuscode 200 catagory', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let newSeller: Seller;
    newSeller = {"id":1,"name":"Hannyrðaþjónusta Hannesar", "category":"Skartgripir","imagePath": "https://i.imgur.com/ywaPivVh.jpg"};
    let seller: Seller[];
    seller = [{"id":1,"name":"Hannyrðaþjónusta Hannesar","category":"Fatnaður","imagePath":"http://i.imgur.com/OYVpe2W.jpg?fb"}];
    backend.connections.subscribe((connection: MockConnection) => {
      seller[0].category = newSeller.category;
      seller[0].imagePath = newSeller.imagePath;
      //seller.push(newSeller);
      let options = new ResponseOptions({
        body: JSON.stringify(seller[0]),
        status: 200
      });
      connection.mockRespond(new Response(options));
      
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      
      .postSeller(newSeller)
      .subscribe((response) => {
        console.log("response from postSeller(newSeller) = "+JSON.stringify(response));
        expect(subject.statusNr).toBe(200);
        expect(response).toEqual(newSeller);
        //done();
      });
    expect(service).toBeTruthy();
  }));

        it('test existing seller with changed name statuscode 400', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let newSeller: Seller;
    newSeller = {"id":1,"name":"Hannyrðaþjónusta Hannesars", "category":"Skartgripir","imagePath": "https://i.imgur.com/ywaPivVh.jpg"};
    let seller: Seller[];
    seller = [{"id":1,"name":"Hannyrðaþjónusta Hannesar","category":"Fatnaður","imagePath":"http://i.imgur.com/OYVpe2W.jpg?fb"}];
    backend.connections.subscribe((connection: MockConnection) => {
      //seller[0].category = newSeller.category;
      //seller[0].imagePath = newSeller.imagePath;
      //seller.push(newSeller);
      let options = new ResponseOptions({
        body: JSON.stringify('Error 400: Seller name is required!'),
        status: 400
      });
      connection.mockRespond(new Response(options));
      
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      
      .postSeller(newSeller)
      .subscribe((response) => {
        console.log("response from postSeller(newSeller) = "+JSON.stringify(response));
        expect(subject.statusNr).toBe(400);
        expect(response).toEqual('Error 400: Seller name is required!');
        //done();
      });
    expect(service).toBeTruthy();
  }));

         it('	test non existing seller statuscode 404', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let newSeller: Seller;
    newSeller = {"id":5,"name":"Hannyrðaþjónusta Hannesars", "category":"Skartgripir","imagePath": "https://i.imgur.com/ywaPivVh.jpg"};
    let seller: Seller[];
    seller = [{"id":1,"name":"Hannyrðaþjónusta Hannesar","category":"Fatnaður","imagePath":"http://i.imgur.com/OYVpe2W.jpg?fb"}];
    backend.connections.subscribe((connection: MockConnection) => {
      //seller[0].category = newSeller.category;
      //seller[0].imagePath = newSeller.imagePath;
      //seller.push(newSeller);
      let options = new ResponseOptions({
        body: JSON.stringify('Error 404: No seller found!'),
        status: 404
      });
      connection.mockRespond(new Response(options));
      
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      
      .postSeller(newSeller)
      .subscribe((response) => {
        console.log("response from postSeller(newSeller) = "+JSON.stringify(response));
        expect(subject.statusNr).toBe(404);
        expect(response).toEqual('Error 404: No seller found!');
        //done();
      });
    expect(service).toBeTruthy();
  }));

        it('test update seller successfully and return an updated seller along with status code 200', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
     subject = service;
    backend = mockBackend;
    let updatedSeller: Seller;
    updatedSeller = {"id":1,"name":"Hannyrðaþjónusta Hannesars", "category":"Skartgripir","imagePath": "https://i.imgur.com/ywaPivVh.jpg"};
    let seller: Seller[];
    seller = [{"id":1,"name":"Hannyrðaþjónusta Hannesar","category":"Fatnaður","imagePath":"http://i.imgur.com/OYVpe2W.jpg?fb"}];
    backend.connections.subscribe((connection: MockConnection) => {
      seller[0].name = updatedSeller.name;
      seller[0].category = updatedSeller.category;
      seller[0].imagePath = updatedSeller.imagePath;
      //seller.push(newSeller);
      let options = new ResponseOptions({
        body: JSON.stringify(seller[0]),
        status: 200
      });
      connection.mockRespond(new Response(options));
      
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      
      .uppdateSeller(updatedSeller.id,updatedSeller)
      .subscribe((response) => {
        console.log("response from uppdateSeller(updatedSeller) = "+JSON.stringify(response));
        expect(subject.statusNr).toBe(200);
        expect(response).toEqual(updatedSeller);
        //done();
      });
    expect(service).toBeTruthy();
  }));

        it('test update seller with empty name and return a status code 400', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
     subject = service;
    backend = mockBackend;
    let updatedSeller: Seller;
    updatedSeller = {"id":1,"name":"", "category":"Skartgripir","imagePath": "https://i.imgur.com/ywaPivVh.jpg"};
    let seller: Seller[];
    seller = [{"id":1,"name":"Hannyrðaþjónusta Hannesar","category":"Fatnaður","imagePath":"http://i.imgur.com/OYVpe2W.jpg?fb"}];
    backend.connections.subscribe((connection: MockConnection) => {
      //seller[0].name = updatedSeller.name;
      //seller[0].category = updatedSeller.category;
      //seller[0].imagePath = updatedSeller.imagePath;
      //seller.push(newSeller);
      let options = new ResponseOptions({
        body: JSON.stringify('Error 400: Seller name is required!'),
        status: 400
      });
      connection.mockRespond(new Response(options));
      
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      
      .uppdateSeller(updatedSeller.id,updatedSeller)
      .subscribe((response) => {
        console.log("response from uppdateSeller(updatedSeller) = "+JSON.stringify(response));
        expect(subject.statusNr).toBe(400);
        expect(response).toEqual('Error 400: Seller name is required!');
        //done();
      });
    expect(service).toBeTruthy();
  }));

          it('test update seller with invalid seller Id and return a status code 404', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
     subject = service;
    backend = mockBackend;
    let updatedSeller: Seller;
    updatedSeller = {"id":5,"name":"", "category":"Skartgripir","imagePath": "https://i.imgur.com/ywaPivVh.jpg"};
    let seller: Seller[];
    seller = [{"id":1,"name":"Hannyrðaþjónusta Hannesar","category":"Fatnaður","imagePath":"http://i.imgur.com/OYVpe2W.jpg?fb"}];
    backend.connections.subscribe((connection: MockConnection) => {
      //seller[0].name = updatedSeller.name;
      //seller[0].category = updatedSeller.category;
      //seller[0].imagePath = updatedSeller.imagePath;
      //seller.push(newSeller);
      let options = new ResponseOptions({
        body: JSON.stringify('Error 404: No seller found!'),
        status: 404
      });
      connection.mockRespond(new Response(options));
      
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      
      .uppdateSeller(updatedSeller.id,updatedSeller)
      .subscribe((response) => {
        console.log("response from uppdateSeller(updatedSeller) = "+JSON.stringify(response));
        expect(subject.statusNr).toBe(404);
        expect(response).toEqual('Error 404: No seller found!');
        //done();
      });
    expect(service).toBeTruthy();
  }));



    it('should return a empty list of products', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let products: SellerProduct[];
    products = [];

    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify( products ),
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .getSellerProducts(1)
      .subscribe((response) => {
        console.log("response from getSellerProducts(1) = "+JSON.stringify(response));
        expect(subject.statusNr).toBe(200);
        expect(response).toEqual([]);
        //done();
      });
    expect(service).toBeTruthy();
  }));
  it('should return a non empty list of products', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let products: SellerProduct[];
    products = [{
  "id": 1,
  "name": "Ullarvettlingar",
  "price": 1899,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
},
{
  "id": 2,
  "name": "Ullarsokkar",
  "price":  2199,
  "quantitySold": 488,
  "quantityInStock": 9,
  "imagePath": "http://i.imgur.com/0XKznD4.jpg?1"
}];
    
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify( products ),
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .getSellerProducts(1)
      .subscribe((response) => {
        expect(subject.statusNr).toBe(200);
        console.log("response from getSellerProducts(1) = "+JSON.stringify(response));
        expect(response).not.toEqual([]);
        //done();
      });
    expect(service).toBeTruthy();
  }));

    it('test Product post seller with name price stock and impath', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let products: SellerProduct[];
    let newProduct: SellerProduct;
    newProduct = {
  "id": null,
  "name": "stuff",
  "price": 400,
  "quantitySold": 0,
  "quantityInStock": 100,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
}
    products = [{
  "id": 1,
  "name": "Ullarvettlingar",
  "price": 1899,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
},
{
  "id": 2,
  "name": "Ullarsokkar",
  "price":  2199,
  "quantitySold": 488,
  "quantityInStock": 9,
  "imagePath": "http://i.imgur.com/0XKznD4.jpg?1"
}];
    
    backend.connections.subscribe((connection: MockConnection) => {
      newProduct.id = products[products.length - 1].id + 1;
      products.push(newProduct);
      let options = new ResponseOptions({
        body: JSON.stringify( newProduct ),
        status: 201
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .postProduct(1,newProduct)
      .subscribe((response) => {
        expect(subject.statusNr).toBe(201);
        console.log("response from postProduct(1,newProduct) = "+JSON.stringify(response));
        expect(response.id).toEqual(3);
        //done();
      });
    expect(service).toBeTruthy();
  }));

      it('test Product post seller invalid sellerId only returns statuscode 404', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let products: SellerProduct[];
    let newProduct: SellerProduct;
    newProduct = {
  "id": null,
  "name": "null",
  "price": 400,
  "quantitySold": 0,
  "quantityInStock": 100,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
}
    products = [{
  "id": 1,
  "name": "Ullarvettlingar",
  "price": 1899,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
},
{
  "id": 2,
  "name": "Ullarsokkar",
  "price":  2199,
  "quantitySold": 488,
  "quantityInStock": 9,
  "imagePath": "http://i.imgur.com/0XKznD4.jpg?1"
}];
    
    backend.connections.subscribe((connection: MockConnection) => {
      //newProduct.id = products[products.length - 1].id + 1;
      //products.push(newProduct);
      let options = new ResponseOptions({
        body: JSON.stringify( 'Error 404: Seller with the given ID was not found' ),
        status: 404
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .postProduct(5,newProduct)
      .subscribe((response) => {
        expect(subject.statusNr).toBe(404);
        console.log("response from postProduct(5,newProduct) = "+JSON.stringify(response));
        expect(response).toEqual('Error 404: Seller with the given ID was not found');
        //done();
      });
    expect(service).toBeTruthy();
  }));

        it('test Product post product with no name', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let products: SellerProduct[];
    let newProduct: SellerProduct;
    newProduct = {
  "id": null,
  "name": null,
  "price": 400,
  "quantitySold": 0,
  "quantityInStock": 100,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
}
    products = [{
  "id": 1,
  "name": "Ullarvettlingar",
  "price": 1899,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
},
{
  "id": 2,
  "name": "Ullarsokkar",
  "price":  2199,
  "quantitySold": 488,
  "quantityInStock": 9,
  "imagePath": "http://i.imgur.com/0XKznD4.jpg?1"
}];
    
    backend.connections.subscribe((connection: MockConnection) => {
      //newProduct.id = products[products.length - 1].id + 1;
      //products.push(newProduct);
      let options = new ResponseOptions({
        body: JSON.stringify( "Error 400: A product must have a name specified" ),
        status: 400
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .postProduct(1,newProduct)
      .subscribe((response) => {
        expect(subject.statusNr).toBe(400);
        console.log("response from postProduct(1,newProduct) = "+JSON.stringify(response));
        expect(response).toEqual("Error 400: A product must have a name specified");
        //done();
      });
    expect(service).toBeTruthy();
  }));

    it('test existing product with correct name statuscode 200 change price', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let products: SellerProduct[];
    let newProduct: SellerProduct;
    newProduct = {
  "id": 1,
  "name": "Ullarvettlingar",
  "price": 1500,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
}
    products = [{
  "id": 1,
  "name": "Ullarvettlingar",
  "price": 1899,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
},
{
  "id": 2,
  "name": "Ullarsokkar",
  "price":  2199,
  "quantitySold": 488,
  "quantityInStock": 9,
  "imagePath": "http://i.imgur.com/0XKznD4.jpg?1"
}];
    
    backend.connections.subscribe((connection: MockConnection) => {
      products[0].price = newProduct.price;
      //products.push(newProduct);
      let options = new ResponseOptions({
        body: JSON.stringify( products[0] ),
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .updateProduct(1,1,newProduct)
      .subscribe((response) => {
        expect(subject.statusNr).toBe(200);
        console.log("response from updateProduct(1,1,newProduct) = "+JSON.stringify(response));
        expect(response).not.toEqual(null);
        expect(response.price).toEqual(1500);
        expect(response.id).toEqual(products[0].id);
        //done();
      });
    expect(service).toBeTruthy();
  }));

      it('test existing product with no name statuscode 400', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let products: SellerProduct[];
    let newProduct: SellerProduct;
    newProduct = {
  "id": 1,
  "name": null,
  "price": 1500,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
}
    products = [{
  "id": 1,
  "name": "Ullarvettlingar",
  "price": 1899,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
},
{
  "id": 2,
  "name": "Ullarsokkar",
  "price":  2199,
  "quantitySold": 488,
  "quantityInStock": 9,
  "imagePath": "http://i.imgur.com/0XKznD4.jpg?1"
}];
    
    backend.connections.subscribe((connection: MockConnection) => {
      //products[0].price = newProduct.price;
      //products.push(newProduct);
      let options = new ResponseOptions({
        body: JSON.stringify( "Error 400: A product must have a name specified" ),
        status: 400
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .updateProduct(1,1,newProduct)
      .subscribe((response) => {
        expect(subject.statusNr).toBe(400);
        console.log("response from updateProduct(1,1,newProduct) = "+JSON.stringify(response));
        expect(response).toEqual("Error 400: A product must have a name specified");
        //done();
      });
    expect(service).toBeTruthy();
  }));

  it('test existing product with incorrect seller id statuscode 400', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let products: SellerProduct[];
    let newProduct: SellerProduct;
    newProduct = {
  "id": 1,
  "name": "Ullarvettlingar",
  "price": 1500,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
}
    products = [{
  "id": 1,
  "name": "Ullarvettlingar",
  "price": 1899,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
},
{
  "id": 2,
  "name": "Ullarsokkar",
  "price":  2199,
  "quantitySold": 488,
  "quantityInStock": 9,
  "imagePath": "http://i.imgur.com/0XKznD4.jpg?1"
}];
    
    backend.connections.subscribe((connection: MockConnection) => {
      //products[0].price = newProduct.price;
      //products.push(newProduct);
      let options = new ResponseOptions({
        body: JSON.stringify( "400: Product does not belong to this seller!" ),
        status: 400
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .updateProduct(2,1,newProduct)
      .subscribe((response) => {
        expect(subject.statusNr).toBe(400);
        console.log("response from updateProduct(2,1,newProduct) = "+JSON.stringify(response));
        expect(response).toEqual("400: Product does not belong to this seller!");
        //done();
      });
    expect(service).toBeTruthy();
  }));

    it('test non existing product statuscode 404', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let products: SellerProduct[];
    let newProduct: SellerProduct;
    newProduct = {
  "id": 5,
  "name": "Ullarvettlingar2",
  "price": 1500,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
}
    products = [{
  "id": 1,
  "name": "Ullarvettlingar",
  "price": 1899,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
},
{
  "id": 2,
  "name": "Ullarsokkar",
  "price":  2199,
  "quantitySold": 488,
  "quantityInStock": 9,
  "imagePath": "http://i.imgur.com/0XKznD4.jpg?1"
}];
    
    backend.connections.subscribe((connection: MockConnection) => {
      //products[0].price = newProduct.price;
      //products.push(newProduct);
      let options = new ResponseOptions({
        body: JSON.stringify( "Error: product not found!" ),
        status: 404
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .updateProduct(1,5,newProduct)
      .subscribe((response) => {
        expect(subject.statusNr).toBe(404);
        console.log("response from updateProduct(1,5,newProduct) = "+JSON.stringify(response));
        expect(response).toEqual("Error: product not found!");
        //done();
      });
    expect(service).toBeTruthy();
  }));

      it('test product with non existing seller id statuscode 404', inject([SellersService,MockBackend], (service: SellersService, mockBackend: MockBackend) => {
    subject = service;
    backend = mockBackend;
    let products: SellerProduct[];
    let newProduct: SellerProduct;
    newProduct = {
  "id": 1,
  "name": "Ullarvettlingar2",
  "price": 1500,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
}
    products = [{
  "id": 1,
  "name": "Ullarvettlingar",
  "price": 1899,
  "quantitySold": 500,
  "quantityInStock": 12,
  "imagePath": "http://i.imgur.com/MZOmRnH.jpg"
},
{
  "id": 2,
  "name": "Ullarsokkar",
  "price":  2199,
  "quantitySold": 488,
  "quantityInStock": 9,
  "imagePath": "http://i.imgur.com/0XKznD4.jpg?1"
}];
    
    backend.connections.subscribe((connection: MockConnection) => {
      //products[0].price = newProduct.price;
      //products.push(newProduct);
      let options = new ResponseOptions({
        body: JSON.stringify( 'Error 404: Seller with the given ID was not found' ),
        status: 404
      });
      connection.mockRespond(new Response(options));
    });
    //spyOn(service, 'getSellers').and.returnValue(Observable.of(Response))
    subject
      .updateProduct(5,5,newProduct)
      .subscribe((response) => {
        expect(subject.statusNr).toBe(404);
        console.log("response from updateProduct(5,5,newProduct) = "+JSON.stringify(response));
        expect(response).toEqual('Error 404: Seller with the given ID was not found');
        //done();
      });
    expect(service).toBeTruthy();
  }));
  /*
	
	updateProduct(SellerId:number,oldId: number,upProduct: SellerProduct)

		test product with non existing seller id



  */

});
