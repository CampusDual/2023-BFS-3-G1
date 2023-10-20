import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WholesalerProductsRoutingModule } from './wholesaler-products-routing.module';
import { WholesalerProductsHomeComponent } from './wholesaler-products-home/wholesaler-products-home.component';
import { WholesalerProductsDetailComponent } from './wholesaler-products-detail/wholesaler-products-detail.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { WholesalerProductsNewComponent } from './wholesaler-products-new/wholesaler-products-new.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [WholesalerProductsHomeComponent, WholesalerProductsDetailComponent, WholesalerProductsNewComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    WholesalerProductsRoutingModule,
    SharedModule
  ]
})
export class WholesalerProductsModule { }
