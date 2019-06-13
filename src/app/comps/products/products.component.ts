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
  popup:boolean =false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  showPopup() {
  this.popup=!this.popup;
  }
}
