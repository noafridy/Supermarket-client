import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './comps/registration/registration.component';
import { LoginComponent } from './comps/login/login.component';
import { StoreComponent } from './comps/store/store.component';
import { HomeComponent } from './comps/home/home.component';
import { OrderComponent } from './comps/order/order.component';

//מערך של ראטרים בו נכניס את הנתיבים
const routes: Routes = [
  // { path: "", pathMatch: 'full', component:  },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'store',
    component: StoreComponent,
    pathMatch: 'full'
  },
  { 
    path: 'store/:subcategory',
    component: StoreComponent,
    pathMatch: 'prefix'
  },
  { path: '',  component: HomeComponent },
  { path: 'order',  component: OrderComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
