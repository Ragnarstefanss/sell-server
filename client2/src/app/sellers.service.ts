import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/rx';

export interface SellerProduct {
  id: number;
  name: string;
  price: number;
  quantitySold: number;
  quantityInStock: number;
  imagePath: string;
}

@Injectable()
export class SellersService {

  constructor(private http : Http) { }

  getSellers() : Observable<SellerProduct[]> {
    return this.http.get('http://localhost:5000/api/sellers')
    .map(response => {
      return <SellerProduct[]> response.json();
    });
  }

  getSellerById(id: number) : Observable<SellerProduct> {
      return this.http.get(`http://localhost:5000/api/sellers/${id}`)
      .map(response => {
        return <SellerProduct> response.json();
      });
  }

  getSellerProducts(id: number) : Observable<SellerProduct[]> {
      return this.http.get(`http://localhost:5000/api/sellers/${id}/products`)
      .map(response => {
        return <SellerProduct[]> response.json();
      });
  }

}
