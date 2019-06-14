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
  refreshEE: EventEmitter<string> = new EventEmitter();
  productDataEE: EventEmitter<Product> = new EventEmitter();
  SearchDataEE:EventEmitter<Product> = new EventEmitter();
  updateDataEE:EventEmitter<Product> = new EventEmitter();
  productUrl: string = "api/product";

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(this.productUrl);
  }

  getProductsByCategory(categoryName : String): Observable<any> {
    return this.http.get(`${this.productUrl}/${categoryName}`);
  }

  addNewProduct(newProduct: Product): Observable<any> {
    return this.http.post(this.productUrl, newProduct, httpOptions);
  }

  getAllCategory(): Observable<any> {
    return this.http.get(`${this.productUrl}/category`);
  }

  getProductsByName(productsName : String): Observable<any> {
    return this.http.get(`${this.productUrl}/name/${productsName}`);
  }

  getProductsByID(productsID : String): Observable<any> {
    return this.http.get(`${this.productUrl}/id/${productsID}`);
  }

  updateProducts(product: Product): Observable<any>{
    return this.http.put(this.productUrl, product, httpOptions);
  }
 
}
