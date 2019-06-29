import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './comps/registration/registration.component';
import { LoginComponent } from './comps/login/login.component';
import { HeaderComponent } from './comps/header/header.component';
import { CartComponent } from './comps/cart/cart.component';
import { StoreComponent } from './comps/store/store.component';
import { ProductsComponent } from './comps/products/products.component';
import { NewProductComponent } from './comps/new-product/new-product.component';
import { AllProductsByCategoryComponent } from './comps/all-products-by-category/all-products-by-category.component';
import { AboutComponent } from './comps/about/about.component';
import { StoreDetailsComponent } from './comps/store-details/store-details.component';
import { HomeComponent } from './comps/home/home.component';
import { OrderComponent } from './comps/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HeaderComponent,
    CartComponent,
    StoreComponent,
    ProductsComponent,
    NewProductComponent,
    AllProductsByCategoryComponent,
    AboutComponent,
    StoreDetailsComponent,
    HomeComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  //זהו קובץ טייפסקריפט בו נרשום את כל הרוטים
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
