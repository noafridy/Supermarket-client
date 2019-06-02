import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  allUser: any[] =[];
  showeForm:boolean=false;
  newRegistrationForm1 = new FormGroup({
    // its need to be like model
    ID: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    passwored: new FormControl('',Validators.required),
    passwored2: new FormControl('', Validators.required)
  });
  newRegistrationForm2 = new FormGroup({
    // its need to be like model
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    firslName: new FormControl('',Validators.required),
    lastName: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  sendForm() {
   this.userService.addNewUser(this.newRegistrationForm1.value).subscribe(data => {
      this.userService.refresh.emit('add');
      // this.router.navigate(['/registration']);
      this.showeForm = true;
    })
  }

}
