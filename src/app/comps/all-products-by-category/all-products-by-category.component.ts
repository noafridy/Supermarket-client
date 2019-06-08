import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-all-products-by-category',
  templateUrl: './all-products-by-category.component.html',
  styleUrls: ['./all-products-by-category.component.css']
})
export class AllProductsByCategoryComponent implements OnInit {

  allProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsByCategory('Milk&Eggs').subscribe(data => {
      this.allProducts = data;
    })

    // this.userService.login(this.newLoginForm.value).subscribe(user => {
    //   if (user.errorMessage) {
    //     alert(user.errorMessage);
    //     return;
    //   }
    //   if (user) {
    //     localStorage.setItem('userInfo', JSON.stringify(user)); //נשמר היוזר על מפתח יוזראינפו בלוקאלסטוראג
    //     this.userService.userInfoEE.emit(user);
    //     this.router.navigate(['']);
    //   }
    // });


  }

}
