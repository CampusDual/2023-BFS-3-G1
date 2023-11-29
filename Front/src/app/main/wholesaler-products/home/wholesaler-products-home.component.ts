import { Component, OnInit } from '@angular/core';
import { OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-wholesaler-products-home',
  templateUrl: './wholesaler-products-home.component.html',
  styleUrls: ['./wholesaler-products-home.component.css']
})
export class WholesalerProductsHomeComponent implements OnInit {
  public currentLang: string;

  constructor(private translateService: OTranslateService,) {this.currentLang = this.translateService.getCurrentLang(); }

  ngOnInit() {
  }

}
