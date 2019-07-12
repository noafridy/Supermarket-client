import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { CartService } from '../../service/cart.service';

// import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  isOrder: boolean = false;
  sideBareOpen: boolean = true;

  constructor(private orderService: OrderService, private cartService: CartService) { }

  ngOnInit() {
    // this.orderService.showOrderEE.subscribe(this.isOrder);
    this.orderService.showOrderEE.subscribe(data => {
      this.isOrder = data;
    });

    this.cartService.cartSideBarEE.subscribe(state => {
      // state = true / false
      this.sideBareOpen = state;
    });

  }



}
