import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  newProductForm = new FormGroup({
    ProductName:new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
  })

  constructor() { }
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


