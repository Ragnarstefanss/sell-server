import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from'rxjs/Observable';
import 'rxjs/rx';

export interface SellerProduct {
  id: number;
  name: string;
  price: number;
  quantitySold: number;
  quantityInStock: number;
  imagePath: string;
}

export interface Seller {
  id: number;
  name: string;
  category: string;
  imagePath: string;
}

@Injectable()
export class SellersService {

  constructor(private http: Http) { }

  getSellers() : Observable<Seller[]> {
    return this.http.get('http://localhost:5000/api/sellers')
    .map(response => {
      return <Seller[]> response.json();
    });
  }

  postSeller(newSeller: Seller): Observable<Seller>{
    var param = {
        name: newSeller.name,
        category: newSeller.category,
        imagePath: newSeller.imagePath
      }
    return this.http.post('http://localhost:5000/api/sellers',param)
      .map(response => {
        console.log()
      return <Seller> response.json();
    });
  }

  getSellerById(id: number): Observable<Seller> {
    return this.http.get(`http://localhost:5000/api/sellers/${id}`)
    .map(response => {
      return <Seller> response.json();
    });
  }

  getSellerProducts(id: number) : Observable<SellerProduct[]> {
      return this.http.get(`http://localhost:5000/api/sellers/${id}/products`)
      .map(response => {
        return <SellerProduct[]> response.json();
      });
  }

}
