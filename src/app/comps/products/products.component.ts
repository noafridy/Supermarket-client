import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
import { CartProducts } from 'src/app/models/cartProducts';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() product: Product;
  amount: Number = 0;
  newCartProducts: CartProducts;

  popup: boolean = false;
  userRole: String = "";
  isAdmin: boolean = false;


  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.userRole = JSON.parse(localStorage.getItem('userInfo')).role;
    this.isAdmin = (this.userRole === 'admin');
  }

  showPopup() {
    if (this.userRole === 'user') {
      this.popup = !this.popup;
    }
    if (this.userRole === 'admin') {
      this.productService.getProductsByID(this.product._id).subscribe(data => {
        this.productService.updateDataEE.emit(data);
      })

    }
  }

  addToCart() {
    debugger
    // this.productService.addProductToCartEE.emit({ ...this.product, amount: this.amount });

    this.newCartProducts = { ...this.product, amount: this.amount }

    // this.cartService.addNewProductCart({
    //   price:this.newCartProducts.price, 
    //    name: this.product._id
    //   }).subscribe(data => {
      // debugger
      // if (data.Erorr) {
      //   alert(data.Erorr);
      // } else {
      //   this.productService.addProductToCartEE.emit(data);
      // }

    // })

    // this.productService.addNewProduct(this.newProductForm.value).subscribe(product => {
    //   if (product) {
    //     this.productService.productDataEE.emit(product);
    //     alert("The product saved");
    //     this.productService.refreshEE.emit('save');
    //   } else {
    //     alert(product.errorMessage);
    //     return;
    //   }

    // })
    this.showPopup();
  }

}
