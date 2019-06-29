import { Injectable,EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url: string = "api/order";
 
  showOrderEE: EventEmitter<boolean> = new EventEmitter();

  constructor (private http: HttpClient) { }

  addOrder (newOrder:Order):Observable<any> {
    return this.http.post(this.url, newOrder, httpOptions);
  }

}
