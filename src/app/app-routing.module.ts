import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './comps/registration/registration.component';
import { LoginComponent } from './comps/login/login.component';
import { StoreComponent } from './comps/store/store.component';

//מערך של ראטרים בו נכניס את הנתיבים
const routes: Routes = [
  // { path: "", pathMatch: 'full', component:  },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: StoreComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
