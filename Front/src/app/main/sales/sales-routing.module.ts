import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesHomeComponent } from './home/sales-home.component';
import { SalesDetailComponent } from './detail/sales-detail.component';
import { SalesPayComponent } from './pay/sales-pay.component';



const routes: Routes = [
  { path: "", component: SalesHomeComponent },
  { path: ":id", component: SalesDetailComponent },
  { path: "pay/:id", component: SalesPayComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
