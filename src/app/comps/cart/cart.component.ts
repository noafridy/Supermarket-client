import { Component, OnInit } from '@angular/core';
import { CartProducts } from 'src/app/models/cartProducts';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allCartProducts: CartProducts[] = [];
  userRole: String = "";
  isAdmin: boolean = false;
  toggleShow: String = "show";
  show: boolean = true;

  constructor(private productService: ProductService) { }
  // constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadCartItems();
    this.userRole = JSON.parse(localStorage.getItem('userInfo')).role;
    this.isAdmin = (this.userRole === 'admin');

    this.productService.addProductToCartEE.subscribe(cartProduct => {
      this.allCartProducts.push(cartProduct);
      localStorage.setItem('userCart', JSON.stringify(this.allCartProducts));
    });

  }

  loadCartItems() {
    const localItems = JSON.parse(localStorage.getItem('userCart')); //המרה לגיסון - קריאה מתוך הלוקאל
    if (localItems) {   //אם יש בזכרון פריטים
      this.allCartProducts = localItems;  //   עדכון פריטים במערך
    }
  }

  toggleCart() {
    this.show = !this.show;
    (this.toggleShow === 'show') ? (this.toggleShow = 'hide') : (this.toggleShow = 'show');
  }

}
