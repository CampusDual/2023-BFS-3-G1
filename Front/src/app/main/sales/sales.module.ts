import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SalesHomeComponent } from './home/sales-home.component';
import { SalesDetailComponent } from './detail/sales-detail.component';
import { SalesPayComponent } from './pay/sales-pay.component';



@NgModule({
  declarations: [SalesHomeComponent, SalesDetailComponent, SalesPayComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    SalesRoutingModule,
  ],
})
export class SalesModule {}
