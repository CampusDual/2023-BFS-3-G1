import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OTranslateService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-sales-home',
  templateUrl: './sales-home.component.html',
  styleUrls: ['./sales-home.component.css']
})
export class SalesHomeComponent implements OnInit {
  public currentLang: string;
  constructor(protected router: Router,
    private translateService: OTranslateService
  ) { {  this.currentLang = this.translateService.getCurrentLang();}}

  ngOnInit() {
  }

}
  
