import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmonProductsHomeComponent } from './home/admon-products-home.component';
import { AdmonProductsDetailComponent } from './detail/admon-products-detail.component';


const routes: Routes = [
  {path : '',component: AdmonProductsHomeComponent},
  {
    path: ":id",
    component: AdmonProductsDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmonProductsRoutingModule { }
