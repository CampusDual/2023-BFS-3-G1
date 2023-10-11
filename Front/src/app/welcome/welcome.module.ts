import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { WelcomeHomeComponent } from './welcome-home/welcome-home.component';
import { MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatMenuModule, MatButtonModule, MatGridListModule } from '@angular/material';


@NgModule({
  declarations: [WelcomeHomeComponent],
  imports: [
    CommonModule,
    OntimizeWebModule,
    WelcomeRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatGridListModule
  ],
  exports: [  
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,    
]
})



export class WelcomeModule { }
