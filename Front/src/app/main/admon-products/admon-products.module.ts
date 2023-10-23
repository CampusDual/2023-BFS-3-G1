import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmonProductsRoutingModule } from './admon-products-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { AdmonProductsHomeComponent } from './home/admon-products-home.component';
import { AdmonProductsDetailComponent } from './detail/admon-products-detail.component';


@NgModule({
  declarations: [AdmonProductsHomeComponent, AdmonProductsDetailComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    AdmonProductsRoutingModule
  ]
})
export class AdmonProductsModule { }
