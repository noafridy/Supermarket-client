import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm = new FormGroup({
    // its need to be like model
    // username: new FormControl('', Validators.required),
    // password: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit() {
  }

}
