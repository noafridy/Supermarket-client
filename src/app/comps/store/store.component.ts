import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
// import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  isOrder: boolean = false;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    // this.orderService.showOrderEE.subscribe(this.isOrder);
    this.orderService.showOrderEE.subscribe(data => {
      this.isOrder = data;
    });
  }

}
