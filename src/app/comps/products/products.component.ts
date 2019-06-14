import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() product: Product;
  popup: boolean = false;
  userRole: String = "";
  isAdmin: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.userRole = JSON.parse(localStorage.getItem('userInfo')).role;
    this.isAdmin = (this.userRole === 'admin');
  }

  showPopup() {
    if (this.userRole === 'user') {
      this.popup = !this.popup;
    }
    if (this.userRole === 'admin') {
      debugger
      // const id = this.product._id
      this.productService.getProductsByID(this.product._id).subscribe(data => {
        this.productService.updateDataEE.emit(data);
      })

    }
  }
}
