import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesHomeComponent } from './categories-home/categories-home.component';
import { CategoriesDetailComponent } from './categories-detail/categories-detail.component';

const routes: Routes = [{
  path : '',
  component: CategoriesHomeComponent
},
{
  path: ":id",
  component: CategoriesDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
