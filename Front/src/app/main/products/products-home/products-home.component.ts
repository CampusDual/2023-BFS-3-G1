import { Component, OnInit, ViewChild } from '@angular/core';
import { OTableButtonComponent, OTableComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit {

  @ViewChild('table', { static: true }) table: OTableComponent;

  @ViewChild('button', { static: false })
  protected button: OTableButtonComponent;

  constructor() { }

  ngOnInit() {
  }

}
