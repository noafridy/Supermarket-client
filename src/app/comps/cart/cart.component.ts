import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartProducts } from 'src/app/models/cartProducts';
import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
// import { ActiveCart } from 'src/app/models/activeCart';
import { OrderService } from '../../service/order.service';
// import { FormGroup} from '@angular/forms';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  isAdmin: boolean = false;
  show: boolean = true;
  allCartProducts: any[] = [];
  userRole: String = "";
  toggleShow: String = "show";
  activeCartId: string;
  total: number = 0;
  inOrder: Boolean = false;
  query: string;

  constructor(private productService: ProductService, private cartService: CartService, private orderService: OrderService) { }
  // constructor(private userService: UserService) { }

  ngOnInit() {
    // this.isOrder = false;
    const user = JSON.parse(localStorage.getItem('userInfo'));
    this.userRole = user.role;
    this.isAdmin = (this.userRole === 'admin');
    debugger;
    this.cartService.getCart(user._id).subscribe(data => {  //רק אחרכ הוא נכנס לפה והכל תקין פה מבחינת נתונים
      this.allCartProducts = data.cart;
      this.activeCartId = data.cartId;
      this.updateTotalPrice(data.cart);
    });

    // a product was added and we just ask from DB the updated cart
    this.productService.addProductToCartEE.subscribe(cartProduct => {
      this.cartService.getCart(user._id).subscribe(data => {
        this.allCartProducts = data.cart;
        this.activeCartId = data.cartId;
        this.updateTotalPrice(data.cart);
      });
    });

    this.orderService.showOrderEE.subscribe(data => {
      this.inOrder = false;
    });
  }

  updateTotalPrice(cartItems) {
    // 1. we extract only the total of each item
    // 2. we then take the array of totals and do a sum on them with the reduce function
    // 3. toFixed - the number of digits after the dot (example: 4.00) here only 2 digits after number
    if (cartItems.length === 0) {
      this.total = 0;
      return;
    }

    this.total = cartItems.map(item => item.totalCost).reduce((accumulator, currentValue) => accumulator + currentValue).toFixed(2);
    this.orderService.totalCost = Number(this.total);
  }

  toggleCart() {
    this.show = !this.show;
    (this.toggleShow === 'show') ? (this.toggleShow = 'hide') : (this.toggleShow = 'show');
    this.cartService.cartSideBarEE.emit(this.show);
  }

  deleteItem(el) {
    const itemId = el.getAttribute('data-item-id');

    // update the cart to contain all products exept the one that we removed
    this.allCartProducts = this.allCartProducts.map(item => { if (item._id !== itemId) return item }).filter(item => item !== undefined);

    // update total
    this.updateTotalPrice(this.allCartProducts);

    // update cart in DB
    this.cartService.deleteCartProducts(itemId).subscribe(response => {
      console.log(response.message);
    });
  }

  showOrder() {
    this.orderService.showOrderEE.emit(true);
    this.inOrder = true;
  }

  highlight(product) {
    if (!this.query) {
      return product;
    }

    return product.replace(new RegExp(this.query, "gi"), match => {
      return '<span class="highlightText">' + match + '</span>';
    });
  }

}
