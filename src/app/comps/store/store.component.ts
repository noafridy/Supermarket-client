import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

 
  // newRegistrationForm2 = new FormGroup({
  //   // its need to be like model
  //   city: new FormControl('', Validators.required),
  //   street: new FormControl('', Validators.required),
  //   firslName: new FormControl('',Validators.required),
  //   lastName: new FormControl('', Validators.required)
  // });

  constructor( ) { }
  // constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  // sendForm() {
  //   this.userService.addNewUser(this.newRegistrationForm1.value).subscribe(data => {
  //      this.userService.refresh.emit('add');
  //      // this.router.navigate(['/registration']);
  //      this.showeForm = true;
  //    })
  //  }

}
