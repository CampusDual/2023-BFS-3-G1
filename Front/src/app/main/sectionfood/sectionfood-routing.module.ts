import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionfoodHomeComponent } from './sectionfood-home/sectionfood-home.component';
import { SectionfoodDetailComponent } from './sectionfood-detail/sectionfood-detail.component';


const routes: Routes = [
  {path : '',component: SectionfoodHomeComponent},
  {path : ':id',component: SectionfoodDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionfoodRoutingModule { 
  
}
