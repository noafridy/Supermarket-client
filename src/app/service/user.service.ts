import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { UserInfo } from '../models/userInfo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInfoEE: EventEmitter<UserInfo> = new EventEmitter();
  refresh: EventEmitter<string> = new EventEmitter();
  url: string = "api/user";

  constructor(private http: HttpClient) { }

  addNewUser(newUser:User):Observable<any>{
    return this.http.post(`${this.url}/join` , newUser , httpOptions);
  }

  login(user:User):Observable<any>{
    return this.http.post(`${this.url}/login`, user , httpOptions);
  }

  logout():Observable<any>{
    return this.http.post(`${this.url}/logout`, null, httpOptions);
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
