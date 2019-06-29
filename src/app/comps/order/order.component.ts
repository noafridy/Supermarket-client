import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  //street: string = "Please insert street";
  // orderForm: FormGroup;
  checkRequired: boolean = false;
  // checkRequiredStreet: boolean = false;
  cityNames: string[] = ['Pardes Hanna', 'Haifa', 'Hadera', 'Kfar Saba', 'Hod Hasharon', 'Raanana', 'Herzliya', 'Tel Aviv', 'Kiryat Gat', 'Beer Sheva'];
  constructor(private orderService: OrderService, private formBuilder: FormBuilder) { }

  orderForm = this.formBuilder.group({
    city: ['', Validators.required],
    street: ['', Validators.required],
    shipmentDate: ['', Validators.required],
    craditCard: ['', Validators.required, this.validateCreditCard]
  });

  ngOnInit() {
    // this.orderForm = this.formBuilder.group({
    //   city: ['', Validators.required],
    //   street: ['', Validators.required],
    //   shipmentDate: ['', Validators.required],
    //   craditCard: ['', Validators.required]
    // });
  }

  validateCreditCard(cardNumber) {
    //Regex for validating the credit card
    const re = new RegExp('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$');

    if (re.test(cardNumber.value)) {
      return null;
    }
    cardNumber.setErrors({'invalidCardNumber': true});
  }

  get city() {
    return this.orderForm.get('city');
  }

  get street() {
    return this.orderForm.get('street');
  }

  autoFillCity() {
    const userCity = JSON.parse(localStorage.getItem('userInfo')).city;
    this.orderForm.value.city = userCity;
    this.city.setValue(userCity, {
      onlySelf: true
    });
  }

  changeCity(e) {
    this.city.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeCreditCard(e) {
    this.orderForm.value.craditCard = e.target.value;
  }

  autoFillStreet() {
    const userStreet = JSON.parse(localStorage.getItem('userInfo')).street;

    this.orderForm.value.street = userStreet;
    this.street.setValue(userStreet, {
      onlySelf: true
    });
  }

  closeOrderPage() {
    this.orderService.showOrderEE.emit(false);
  }

  get f() {
    return this.orderForm.controls;
  }

  sendForm() {
    this.checkRequired = true;

    this.orderService.addOrder(this.orderForm.value).subscribe(data => {
      if (data.Erorr) {
        alert(data.Erorr);
      } else {

      }
    })
    // const controlers = this.orderForm.value;
    // if (controlers.city === "" ||
    //   controlers.street === "" ||
    //   controlers.shipmentDate === "" ||
    //   controlers.craditCard === "" ) {
    //   return;
    // } 

    // if (this.orderForm.invalid) {
    //   return;
    // }


  }

}
