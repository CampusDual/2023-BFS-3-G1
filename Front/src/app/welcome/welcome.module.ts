import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { WelcomeHomeComponent } from './welcome-home/welcome-home.component';


@NgModule({
  declarations: [WelcomeHomeComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
