import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../service/order.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  //street: string = "Please insert street";
  // orderForm: FormGroup;
  inReception: boolean = false;
  checkRequired: boolean = false;
  receiptId: string = '';
  // checkRequiredStreet: boolean = false;
  cityNames: string[] = ['Pardes Hanna', 'Haifa', 'Hadera', 'Kfar Saba', 'Hod Hasharon', 'Raanana', 'Herzliya', 'Tel Aviv', 'Kiryat Gat', 'Beer Sheva'];
  orderForm = this.formBuilder.group({
    city: ['', Validators.required],
    street: ['', Validators.required],
    shipmentDate: ['', Validators.required],
    craditCard: ['', Validators.required, this.validateCreditCard]
  });

  constructor(private orderService: OrderService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  validateCreditCard(cardNumber) {
    //Regex for validating the credit card
    const re = new RegExp('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$');

    if (re.test(cardNumber.value)) {
      cardNumber.setErrors(null);
    } else {
      cardNumber.setErrors({ 'invalidCardNumber': true });
    }
    return true;
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
    // stop here if form is invalid
    if (this.orderForm.invalid) {
      return;
    }
    debugger;
    const objData = {
      user: JSON.parse(localStorage.getItem('userInfo'))._id,
      city: this.orderForm.value.city,
      street: this.orderForm.value.street,
      // orderDate: (new Date()).toISOString,
      DD: this.orderForm.value.shipmentDate,
      craditCard: this.orderForm.value.craditCard,
      totalCost: this.orderService.totalCost,
      ShoppingCart: localStorage.getItem('shoppingCartId')
    };

    this.orderService.addOrder(objData).subscribe(data => {
      if (data.error) {
        alert(data.error);
      } else {
        debugger;
        this.receiptId = data._id;
        this.inReception = true;
      }
    });



  }

}
