import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WholesalerStatsRoutingModule } from './wholesaler-stats-routing.module';
import { WholesalerStatsHomeComponent } from './wholesaler-stats-home/wholesaler-stats-home.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [WholesalerStatsHomeComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    WholesalerStatsRoutingModule
  ]
})
export class WholesalerStatsModule { }
