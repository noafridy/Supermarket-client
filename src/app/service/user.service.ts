import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  refresh: EventEmitter<string> = new EventEmitter();
  url: string = "http://localhost:3000/api/user";

  constructor(private http: HttpClient) { }

  addNewUser(newUser:User):Observable<any>{
    return this.http.post(this.url , newUser , httpOptions);
  }

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
