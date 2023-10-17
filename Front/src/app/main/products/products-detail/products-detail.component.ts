import { Injector, ViewChild, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OFormComponent, OntimizeService, OListPickerComponent, OTableComponent, ORealPipe, ONIFInputComponent } from 'ontimize-web-ngx';


@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.products-detail]': 'true'
  }
})
export class ProductsDetailComponent implements OnInit {

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
