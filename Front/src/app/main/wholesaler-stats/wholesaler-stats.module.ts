import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WholesalerStatsRoutingModule } from "./wholesaler-stats-routing.module";
import { WholesalerStatsHomeComponent } from "./home/wholesaler-stats-home.component";
import { OntimizeWebModule } from "ontimize-web-ngx";
import { OChartModule } from "ontimize-web-ngx-charts";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [WholesalerStatsHomeComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    WholesalerStatsRoutingModule,
    OChartModule,
    SharedModule,
  ],
})
export class WholesalerStatsModule {}
