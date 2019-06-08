import { Injectable } from '@angular/core';
// import { Injectable ,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl: string = "api/product";

  constructor(private http: HttpClient) { }

  getProductsByCategory(categoryName : String): Observable<any> {
    return this.http.get(`${this.productUrl}/${categoryName}`);
  }

  // addNewUser(newUser: User): Observable<any> {
  //   return this.http.post(`${this.url}/join`, newUser, httpOptions);
  // }
  // getAllSongs(): Observable<any> {
  //   return this.http.get(this.url);
  // }

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
