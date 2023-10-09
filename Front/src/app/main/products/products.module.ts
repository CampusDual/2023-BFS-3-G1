import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsHomeComponent } from './products-home/products-home.component';


@NgModule({
  declarations: [ProductsHomeComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
