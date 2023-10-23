import { Injector, ViewChild, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OFormComponent, OntimizeService, OListPickerComponent, OTableComponent, ORealPipe, ONIFInputComponent } from 'ontimize-web-ngx';


@Component({
  selector: 'app-admon-products-detail',
  templateUrl: './admon-products-detail.component.html',
  styleUrls: ['./admon-products-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.products-detail]': 'true'
  }
})
export class AdmonProductsDetailComponent implements OnInit {

  public params: object;

  constructor() { }

  ngOnInit() {
  }

  onDataLoaded(e: object) {
    this.params = this.getParameters();
  }

  getParameters() {
    let params = {
      //'id': this.id.getValue()
    }

    return params;
  }

}
