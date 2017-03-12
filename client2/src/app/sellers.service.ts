import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from'rxjs/Observable';
import 'rxjs/rx';

export interface SellerProduct {
  id: number,
  name: string,
  price: number,
  quantitySold: number,
  quantityInStock: number,
  imagePath: string,
}

export interface Seller {
  id: number;
  name: string;
  category: string;
  imagePath: string;
}

@Injectable()
export class SellersService {
statusNr: number;
  constructor(private http: Http) { }

  getSellers() : Observable<Seller[]> {
    return this.http.get('http://localhost:5000/api/sellers')
    .map(response => {
      this.statusNr = response.status;
      return <Seller[]> response.json();
    });
  }

  postSeller(newSeller: Seller): Observable<Seller>{
    console.log("imagepath is "+ newSeller.imagePath);
    var param = {
        name: newSeller.name,
        category: newSeller.category,
        imagePath: newSeller.imagePath
      }
    return this.http.post('http://localhost:5000/api/sellers',param)
      .map(response => {
        this.statusNr = response.status;
      return <Seller> response.json();
    });
  }

  getSellerById(id: number): Observable<Seller> {
    return this.http.get(`http://localhost:5000/api/sellers/${id}`)
    .map(response => {
      this.statusNr = response.status;
      return <Seller> response.json();
    });
  }

  getSellerProducts(id: number) : Observable<SellerProduct[]> {
      return this.http.get(`http://localhost:5000/api/sellers/${id}/products`)
      .map(response => {
        this.statusNr = response.status;
        return <SellerProduct[]> response.json();
      });
  }

   uppdateSeller(SellerId:number,upSeller: Seller){
      var param = {
        id:SellerId,
        name: upSeller.name,
        category: upSeller.category,
        imagePath: upSeller.imagePath
      }
      //test

      this.getSellerById(SellerId).subscribe((result) => {
        console.log("id "+ SellerId + "coresponds to the name "+result.name);
      });
      console.log("bleh bleh");
    return this.http.put(`http://localhost:5000/api/sellers/${SellerId}`,param)
      .map(response => {
        console.log("bleh response is "+ JSON.stringify(<Seller> response.json()));
        this.statusNr = response.status;
      return <Seller> response.json();
    });
  }

    postProduct(id:number,newProduct: SellerProduct): Observable<SellerProduct>{
    var param = {
             name: newProduct.name,
         price: newProduct.price,
      quantitySold: newProduct.quantitySold,
      quantityInStock: newProduct.quantityInStock,
      imagePath: newProduct.imagePath
      }
    return this.http.post(`http://localhost:5000/api/sellers/${id}/products`,param)
      .map(response => {
        console.log()
        this.statusNr = response.status;
      return <SellerProduct> response.json();
    });
  }

  updateProduct(SellerId:number,oldId: number,upProduct: SellerProduct){
      var param = {
        id: SellerId,
        prodId: oldId,
         name: upProduct.name,
         price: upProduct.price,
      quantitySold: upProduct.quantitySold,
      quantityInStock: upProduct.quantityInStock,
      imagePath: upProduct.imagePath
      }
      //test
      this.getSellerById(SellerId).subscribe((result) => {
        console.log("id "+ SellerId + "coresponds to the name "+result.name);
      });
    return this.http.put(`http://localhost:5000/api/sellers/${SellerId}/products/${oldId}`,param)
      .map(response => {
        console.log()
        this.statusNr = response.status;
      return <SellerProduct> response.json();
    });
  }

}
