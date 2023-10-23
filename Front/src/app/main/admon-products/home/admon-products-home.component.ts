import { Component, OnInit, ViewChild } from '@angular/core';
import { OTableButtonComponent, OTableComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-admon-products-home',
  templateUrl: './admon-products-home.component.html',
  styleUrls: ['./admon-products-home.component.css']
})
export class AdmonProductsHomeComponent implements OnInit {

  @ViewChild('table', { static: true }) table: OTableComponent;

  @ViewChild('button', { static: false })
  protected button: OTableButtonComponent;

  constructor() { }

  ngOnInit() {
  }

}
