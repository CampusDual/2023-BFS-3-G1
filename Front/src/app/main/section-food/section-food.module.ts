import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionFoodRoutingModule } from './section-food-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { FoodHomeComponent } from './food-home/food-home.component';


@NgModule({
  declarations: [FoodHomeComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    SectionFoodRoutingModule
  ]
})
export class SectionFoodModule { }
