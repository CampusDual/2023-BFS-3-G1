import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from "ontimize-web-ngx";
import { AdmonCategoriesRoutingModule } from './admon-categories-routing.module';
import { AdmonCategoriesHomeComponent } from './home/admon-categories-home.component';
import { AdmonCategoriesDetailComponent } from './detail/admon-categories-detail.component';


@NgModule({
  declarations: [AdmonCategoriesHomeComponent, AdmonCategoriesDetailComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    AdmonCategoriesRoutingModule
  ]
})
export class AdmonCategoriesModule { }
