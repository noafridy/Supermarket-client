import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { OrderService } from '../../service/order.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent implements OnInit {

  ProductsLength: number = 0;
  orders: number = 0;
  cartMessage: string = '';
  cartLastPurchase: string;
  cartTotalCost: string = '';

  constructor(private productService: ProductService, private orderService: OrderService, private cartService: CartService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(Products => {
      this.ProductsLength = Products.length;
    });

    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders.length;
    });

    debugger;
    this.cartService.cartStatusEE.subscribe(data => {
      
      if (data.type === 'found_last_order') {
        // print last perches
        this.cartMessage = data.message;
        this.cartTotalCost = 'Last order cost: ' + data.lastOrder.totalCost;
        this.cartLastPurchase = 'Last order Purchase: ' + data.lastOrder.DD;

      } else if (data.type === 'open_cart') {
        const totalCost = (data && data.cart && data.cart[0] && data.cart[0].totalCost) || 0;
        this.cartMessage = data.message;
        this.cartTotalCost = 'Cart total cost: ' + totalCost;
        this.cartLastPurchase = totalCost ? 'Cart Last Purchase: ' + new Date(data.cart[0].ShoppingCart.date).toDateString() : '';
      } else if (data.type === 'first_cart') {
        // just welcome message
        alert(data.message);
        this.cartMessage = data.message;
      }
    });
  }

}
