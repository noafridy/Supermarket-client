// import { Injectable } from '@angular/core';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Cart } from '../models/cart';
import { CartProducts } from '../models/cartProducts';
import { NewCartItem } from 'src/app/models/newCartItem';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartStatusEE:EventEmitter<any> = new EventEmitter();
  cartSideBarEE:EventEmitter<boolean> = new EventEmitter();

  cartUrl: string = "api/cart";
  cartProductsUrl: string = "api/cartProduct";

  constructor(private http: HttpClient) { }

  getCart(userID: String): Observable<any> {
    return this.http.get(`${this.cartUrl}/${userID}`);   //user = user id
  }

  getAllCartProducts(cartId: String): Observable<any> {
    return this.http.get(`${this.cartProductsUrl}/${cartId}`);
  }

  addNewCartProducts(newProductCart: NewCartItem): Observable<any> {
    return this.http.post(`${this.cartProductsUrl}`, newProductCart, httpOptions);
  }

  deleteCartProducts(ProductID: String): Observable<any> {
    return this.http.delete(`${this.cartProductsUrl}/${ProductID}`, httpOptions);
  }

  updateCartProducts(): Observable<any> {
    return this.http.put(this.cartProductsUrl, httpOptions);
  }

}
