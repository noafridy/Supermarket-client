import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userRole: String = "";
  isAdmin: boolean = false;
  toggleShow: String = "show";
  show: boolean = true;

  constructor() { }
  // constructor(private userService: UserService) { }

  ngOnInit() {
    this.userRole = JSON.parse(localStorage.getItem('userInfo')).role;
    this.isAdmin = (this.userRole === 'admin');

  }
  isItAdmin() {

  }

  toggleCart() {
    this.show = !this.show;
    (this.toggleShow === 'show') ? (this.toggleShow = 'hide') : (this.toggleShow = 'show');
  }

}
