import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingcartRoutingModule } from './shoppingcart-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { ShoppingcartHomeComponent } from './home/shoppingcart-home.component';


@NgModule({
  declarations: [ShoppingcartHomeComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    ShoppingcartRoutingModule
  ]
})
export class ShoppingcartModule { }
