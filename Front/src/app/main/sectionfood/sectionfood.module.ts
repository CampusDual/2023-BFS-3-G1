import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SectionfoodRoutingModule } from './sectionfood-routing.module';
import { SectionfoodHomeComponent } from './home/sectionfood-home.component';
import { SectionfoodDetailComponent } from './detail/sectionfood-detail.component';


@NgModule({
  declarations: [SectionfoodHomeComponent, SectionfoodDetailComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    SectionfoodRoutingModule
  ]
})
export class SectionfoodModule { }
