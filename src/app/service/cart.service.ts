import { Injectable } from '@angular/core';
// import { Injectable ,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from '../models/cart';
import { CartProducts } from '../models/cartProducts';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartUrl: string = "api/cart";

  constructor(private http: HttpClient) { }

  getCart(userID: String): Observable<any> {
    return this.http.get(`${this.cartUrl}/${userID}`);   //user = user id
  }

  addNewProductCart(newProductCart: CartProducts): Observable<any> {
    return this.http.post(`${this.cartUrl}/product`, newProductCart, httpOptions);
  }

}
