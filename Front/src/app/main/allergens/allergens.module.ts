import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllergensRoutingModule } from './allergens-routing.module';
import { AllergensHomeComponent } from './allergens-home/allergens-home.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { AllergensDetailComponent } from './allergens-detail/allergens-detail.component';


@NgModule({
  declarations: [AllergensHomeComponent, AllergensDetailComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    AllergensRoutingModule
  ]
})
export class AllergensModule { }
