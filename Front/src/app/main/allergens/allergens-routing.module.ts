import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllergensHomeComponent } from './allergens-home/allergens-home.component';
import { AllergensDetailComponent } from './allergens-detail/allergens-detail.component';


const routes: Routes = [{
  path : '',
  component: AllergensHomeComponent
},
{
  path: ":id",
  component: AllergensDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllergensRoutingModule { }
