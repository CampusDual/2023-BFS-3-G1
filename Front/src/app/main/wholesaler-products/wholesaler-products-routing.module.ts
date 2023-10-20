import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WholesalerProductsHomeComponent } from "./wholesaler-products-home/wholesaler-products-home.component";
import { WholesalerProductsDetailComponent } from "./wholesaler-products-detail/wholesaler-products-detail.component";
import { WholesalerProductsNewComponent } from "./wholesaler-products-new/wholesaler-products-new.component";

const routes: Routes = [
  { path: "", component: WholesalerProductsHomeComponent },
  { path: "new", component: WholesalerProductsNewComponent },
  {
    path: ":id",
    component: WholesalerProductsDetailComponent,
    data: {
      oPermission: {
        permissionId: "wholesaler-products-detail-permissions",
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WholesalerProductsRoutingModule {}
