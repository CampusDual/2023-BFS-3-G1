import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodHomeComponent } from './food-home/food-home.component';


const routes: Routes = [{
  path : '',
  component: FoodHomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionFoodRoutingModule { }
