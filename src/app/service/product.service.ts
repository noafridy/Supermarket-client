import { Injectable ,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { CartProducts } from 'src/app/models/cartProducts';

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
  addProductToCartEE:EventEmitter<CartProducts> = new EventEmitter();
  productUrl: string = "api/product";

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(this.productUrl);
  }

  getProductsByCategory(categoryName : String): Observable<any> {
    return this.http.get(`${this.productUrl}/${categoryName}`);
  }

  addNewProduct(newProduct: Product, fileToUpload: File): Observable<any> {
    // return this.http.post(this.productUrl, newProduct, httpOptions);
    const formData = new FormData();
    formData.append('ProductName', newProduct.ProductName);
    formData.append('category', newProduct.category);
    formData.append('price', newProduct.price + '');
    formData.append('img', fileToUpload.name);
    formData.append('myImage', fileToUpload, fileToUpload.name);
    return this.http.post(this.productUrl, formData);
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

  // deleteProducts(product: Product): Observable<any>{
  //   return this.http.delete(this.productUrl, product, httpOptions);
  // }
 
}
