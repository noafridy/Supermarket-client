import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserInfo } from '../../models/userInfo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userInfo: UserInfo = null;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userService.userInfoEE.subscribe(user => {
      this.userInfo = user;
    })
  }

  userLogout() {
    this.userService.logout().subscribe(msg => {
      localStorage.setItem('userInfo', "{}" );
      window.location.pathname = '/';
    });
  }

}
