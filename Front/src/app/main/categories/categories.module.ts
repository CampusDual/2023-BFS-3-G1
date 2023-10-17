import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesHomeComponent } from './categories-home/categories-home.component';
import { CategoriesDetailComponent } from './categories-detail/categories-detail.component';


@NgModule({
  declarations: [CategoriesHomeComponent, CategoriesDetailComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,    
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
