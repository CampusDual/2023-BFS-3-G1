import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { FeaturedColumnRendererComponent } from '../main/wholesaler-products/wholesaler-products-home/featured-column-renderer/featured-column-renderer.component';

@NgModule({
  imports: [
    OntimizeWebModule
  ],
  declarations: [
    FeaturedColumnRendererComponent
  ],
  exports: [
    CommonModule,
    FeaturedColumnRendererComponent
  ]
})
export class SharedModule { }
