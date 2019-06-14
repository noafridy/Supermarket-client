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
  selectedCategory: String = "Milk&Eggs"
  allProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.refresh();
    this.getProductByCategory(this.selectedCategory);
    this.productService.SearchDataEE.subscribe(products => {
      this.allProducts = products;
    });
  }

  getProductByCategory(category) {
    this.selectedCategory = category;
    this.productService.getProductsByCategory(category).subscribe(data => {
      this.allProducts = data;
    })
  }

  refresh() {
    this.productService.refreshEE.subscribe(data => {
      if (this.selectedCategory) {
        this.productService.getProductsByCategory(this.selectedCategory).subscribe(data => {
          this.allProducts = data;
        });
      } else {
        this.productService.getAllProducts().subscribe(data => {
          this.allProducts = data;
        });
      }

    });


  }

}
