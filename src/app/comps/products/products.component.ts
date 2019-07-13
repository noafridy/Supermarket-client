import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
import { NewCartItem } from 'src/app/models/newCartItem';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() product: Product;
  amount: Number = 0;
  newCartProducts: NewCartItem;
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
      });

    }
  }

  addToCart() {
    const shoppingCartId = localStorage.getItem('shoppingCartId');
    this.newCartProducts = {
      product: this.product._id,
      quantity: Number(this.amount),
      ShoppingCart: shoppingCartId,
      totalCost: Number(this.amount) * Number(this.product.price)
    };

    this.cartService.addNewCartProducts(this.newCartProducts).subscribe(data => {
      this.productService.addProductToCartEE.emit(data);
      this.showPopup();
    });

  }
}