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
  isSave: boolean = true;
  ID: string = "";
  allCategory: any[] = [];
  newProductForm = new FormGroup({
    ProductName: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
  })

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getAllCategory().subscribe(CategoryData => {
      this.allCategory = CategoryData;
    })

    this.productService.updateDataEE.subscribe(product => {
      this.isSave = false;
      this.ID = product[0]._id;
      debugger;
      this.newProductForm = new FormGroup({
        ProductName: new FormControl(product[0].ProductName, Validators.required),
        category: new FormControl(product[0].category._id, Validators.required),
        price: new FormControl(product[0].price, Validators.required),
        img: new FormControl(product[0].img, Validators.required),
      })
    });

  }

  sendForm() {
    if (this.ID) {
      debugger
      this.productService.updateProducts({...this.newProductForm.value, _id: this.ID}).subscribe(newProduct => {
        debugger
        if (newProduct) {
          this.productService.productDataEE.emit(newProduct);
          alert("The product updated");
          this.productService.refreshEE.emit('update');
        } else {
          alert(newProduct.errorMessage);
        }
        return;
      })
    } else {

      this.productService.addNewProduct(this.newProductForm.value).subscribe(product => {
        debugger
        if (product) {
          this.productService.productDataEE.emit(product);
          alert("The product saved");
          this.productService.refreshEE.emit('save');
        } else {
          alert(product.errorMessage);
          return;
        }

      })
    }

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