import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserInfo } from '../../models/userInfo';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // name:String="";
  userInfo: UserInfo = null;
  SearchForm = new FormGroup({
    SearchName: new FormControl('')
  })

  constructor(private userService: UserService, private productService: ProductService) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userService.userInfoEE.subscribe(user => {
      this.userInfo = user;
    })
  }

  userLogout() {
    this.userService.logout().subscribe(msg => {
      localStorage.clear();
      window.location.pathname = '/';
    });
  }

  searchProductByName() {
    this.productService.getProductsByName(this.SearchForm.value.SearchName).subscribe(data => {
      this.productService.SearchDataEE.emit(data);
    })
  }

}

