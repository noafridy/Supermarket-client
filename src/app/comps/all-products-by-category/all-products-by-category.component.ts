import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products-by-category',
  templateUrl: './all-products-by-category.component.html',
  styleUrls: ['./all-products-by-category.component.css']
})
export class AllProductsByCategoryComponent implements OnInit {

  allProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProductByCategory('Milk&Eggs');
  }

   getProductByCategory(category) {
    this.productService.getProductsByCategory(category).subscribe(data => {
      this.allProducts = data;
    })
  
  }

}
