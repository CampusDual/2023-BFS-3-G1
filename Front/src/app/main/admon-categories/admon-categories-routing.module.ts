import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmonCategoriesHomeComponent } from './home/admon-categories-home.component';
import { AdmonCategoriesDetailComponent } from './detail/admon-categories-detail.component';


const routes: Routes = [
  {
    path : '',
    component: AdmonCategoriesHomeComponent
  },
  {
    path: ":id",
    component: AdmonCategoriesDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmonCategoriesRoutingModule { }
