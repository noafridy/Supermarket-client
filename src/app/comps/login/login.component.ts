import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // allUser: any[] = [];
  newLoginForm = new FormGroup({
    // its need to be like model
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  sendForm() {
    this.userService.login(this.newLoginForm.value).subscribe(user => {
      if (user.errorMessage) {
        alert(user.errorMessage);
        return;
      }
      if (user) {
        localStorage.setItem('userInfo', JSON.stringify(user)); //נשמר היוזר על מפתח יוזראינפו בלוקאלסטוראג
        this.userService.userInfoEE.emit(user);
        this.router.navigate(['']);
      }
    });
  }
}
