import { Component, OnInit } from '@angular/core';
import { OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-wholesaler-products-new',
  templateUrl: './wholesaler-products-new.component.html',
  styleUrls: ['./wholesaler-products-new.component.css']
})
export class WholesalerProductsNewComponent implements OnInit {

  public currentLang: string;

  constructor(private translateService: OTranslateService,) {this.currentLang = this.translateService.getCurrentLang(); }

  ngOnInit() {
  }

}
