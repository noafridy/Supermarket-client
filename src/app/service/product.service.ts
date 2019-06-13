import { Injectable ,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productDataEE: EventEmitter<Product> = new EventEmitter();
  productUrl: string = "api/product";

  constructor(private http: HttpClient) { }

  getProductsByCategory(categoryName : String): Observable<any> {
    return this.http.get(`${this.productUrl}/${categoryName}`);
  }

  addNewProduct(newProduct: Product): Observable<any> {
    return this.http.post(this.productUrl, newProduct, httpOptions);
  }

  getAllCategory(): Observable<any> {
    return this.http.get(`${this.productUrl}/category`);
  }

  // addNewUser(newUser:User):Observable<any>{
  //   return this.http.post(this.url , newUser , httpOptions);
  // }



  // getAllArtists(): Observable<any> {
  //   return this.http.get(this.url+"/artists");
  // }

  // deleteSong(id:string):Observable<any>{
  //   return this.http.delete(`${this.url}/${id}` , httpOptions);
  // }
}
