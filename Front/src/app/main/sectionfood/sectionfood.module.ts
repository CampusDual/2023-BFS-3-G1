import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionfoodRoutingModule } from './sectionfood-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SectionfoodHomeComponent } from './sectionfood-home/sectionfood-home.component';
import { SectionfoodDetailComponent } from './sectionfood-detail/sectionfood-detail.component';


@NgModule({
  declarations: [SectionfoodHomeComponent, SectionfoodDetailComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    SectionfoodRoutingModule
  ]
})
export class SectionfoodModule { }
