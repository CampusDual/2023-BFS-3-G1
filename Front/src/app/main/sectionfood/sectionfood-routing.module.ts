import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionfoodHomeComponent } from './sectionfood-home/sectionfood-home.component';


const routes: Routes = [
  {
    path : '',
    component: SectionfoodHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionfoodRoutingModule { }
