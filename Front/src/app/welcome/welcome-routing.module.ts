import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeHomeComponent } from './welcome-home/welcome-home.component';


const routes: Routes = [{
  path : '',
  component: WelcomeHomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
