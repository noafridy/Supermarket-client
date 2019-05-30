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

  allUser: any[] =[];
  newLoginForm = new FormGroup({
    // its need to be like model
    username: new FormControl('', Validators.required),
    passwored: new FormControl('',Validators.required),
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  sendForm() {
    // this.userService.addNewUser(this.newLoginForm.value).subscribe(data => {
    //    this.userService.refresh.emit('add');
    //    // this.router.navigate(['/registration']);
    //    this.showeForm = true;
    //  })
   }

}
