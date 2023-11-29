import { Component, OnInit, ViewChild } from '@angular/core';
import { OFormComponent, OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-wholesaler-products-detail',
  templateUrl: './wholesaler-products-detail.component.html',
  styleUrls: ['./wholesaler-products-detail.component.css']
})
export class WholesalerProductsDetailComponent implements OnInit {
  public currentLang: string;
  constructor(private translateService: OTranslateService) {this.currentLang = this.translateService.getCurrentLang(); }

  @ViewChild('formdata', { static: false })
  protected formdata: OFormComponent

  ngOnInit( ) {
    this.formdata.reload();
  }

}
