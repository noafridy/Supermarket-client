import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  allCategory: any[] =[];
  newProductForm = new FormGroup({
    ProductName:new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
  })

  constructor(private productService:ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getAllCategory().subscribe( CategoryData => {
      this.allCategory = CategoryData;
    })
  }

  sendForm(){
    debugger
    this.productService.addNewProduct(this.newProductForm.value).subscribe(product=>{
      this.productService.productDataEE.emit(product);
    })
  }
}


// sendForm() {
//   this.userService.login(this.newLoginForm.value).subscribe(user => {
//     if (user.errorMessage) {
//       alert(user.errorMessage);
//       return;
//     }
//     if (user) {
//       localStorage.setItem('userInfo', JSON.stringify(user)); //נשמר היוזר על מפתח יוזראינפו בלוקאלסטוראג
//       this.userService.userInfoEE.emit(user);
//       this.router.navigate(['store']);
//     }
//   });
// }