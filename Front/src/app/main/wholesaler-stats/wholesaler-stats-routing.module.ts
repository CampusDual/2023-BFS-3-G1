import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WholesalerStatsHomeComponent } from "./home/wholesaler-stats-home.component";

const routes: Routes = [
  {
    path: "",
    component: WholesalerStatsHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WholesalerStatsRoutingModule {}
