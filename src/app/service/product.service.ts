import { Injectable  } from '@angular/core';
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

  // productUrl: string = "api/product";

  constructor(private http: HttpClient) { }

  // addNewUser(newUser:User):Observable<any>{
  //   return this.http.post(this.url , newUser , httpOptions);
  // }
  
  // getAllSongs(): Observable<any> {
  //   return this.http.get(this.url);
  // }

  // getAllArtists(): Observable<any> {
  //   return this.http.get(this.url+"/artists");
  // }

  // deleteSong(id:string):Observable<any>{
  //   return this.http.delete(`${this.url}/${id}` , httpOptions);
  // }
}
