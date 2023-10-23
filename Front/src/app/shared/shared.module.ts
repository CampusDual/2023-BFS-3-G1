import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OChartModule } from 'ontimize-web-ngx-charts';
import { FeaturedColumnRendererComponent } from '../main/wholesaler-products/home/featured-column-renderer/featured-column-renderer.component';

//import { MENU_COMPONENTS } from './app.menu.config';
//import { MovementTypesCellRendererComponent } from './movement-types-renderer/movement-types-cell-renderer';

@NgModule({
  imports: [
    OntimizeWebModule,
    OChartModule
  ],
  declarations: [
    FeaturedColumnRendererComponent,
    //...MENU_COMPONENTS
  ],
  exports: [
    CommonModule,
    FeaturedColumnRendererComponent
    //...MENU_COMPONENTS
  ],
  //entryComponents: [...MENU_COMPONENTS]
})
export class SharedModule { }
