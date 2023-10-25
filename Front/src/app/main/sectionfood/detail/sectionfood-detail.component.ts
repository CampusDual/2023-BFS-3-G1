import { Component, OnInit } from '@angular/core';
import { DialogService, ODialogConfig } from 'ontimize-web-ngx';
import { config } from 'rxjs';

@Component({
  selector: 'app-sectionfood-detail',
  templateUrl: './sectionfood-detail.component.html',
  styleUrls: ['./sectionfood-detail.component.css']
})
export class SectionfoodDetailComponent implements OnInit {

  constructor(protected dialogService:DialogService) { }

  
  ngOnInit() {
  }

  showInfo(evt: any) {
    if (this.dialogService) {
    this.dialogService.info('Redirecting to "Carrito de la compra',
        'Carrito de la compra probably comming soon ;)');
    }
}

}

