import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  flagShopping: boolean = false;
  flaglogin: boolean = false;
  // allUser: any[] = [];
  newLoginForm = new FormGroup({
    // its need to be like model
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  userCart = new Cart;

  constructor(private userService: UserService, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      this.flaglogin = true;

      this.cartService.getCart(userInfo._id).subscribe(data => {
        this.flagShopping = (data.cart.length > 0);
        localStorage.setItem('shoppingCartId', data.cartId);
        this.cartService.cartStatusEE.emit(data);
      });
    }
  }

  sendForm() {
    this.userCart.user = this.newLoginForm.value.username;
    this.userService.login(this.newLoginForm.value).subscribe(user => {
      if (user.errorMessage) {
        alert(user.errorMessage);
        return;
      }
      if (user) {
        this.flaglogin = true;
        this.cartService.getCart(user._id).subscribe(data => {
          alert(data.message);
          localStorage.setItem('shoppingCartId', data.cartId);
          this.flagShopping = (data.cart.length > 0);
          this.cartService.cartStatusEE.emit(data);
        });

        localStorage.setItem('userInfo', JSON.stringify(user)); //נשמר היוזר על מפתח יוזראינפו בלוקאלסטוראג
        this.userService.userInfoEE.emit(user);
      }
    });
  }

  addCart() {
  }

}
