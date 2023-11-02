import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingcartHomeComponent } from './home/shoppingcart-home.component';


const routes: Routes = [
  {path : '',component: ShoppingcartHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingcartRoutingModule { }
