import { Component, OnInit } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-sales-pay',
  templateUrl: './sales-pay.component.html',
  styleUrls: ['./sales-pay.component.css']
})
export class SalesPayComponent implements OnInit {
  public totalsales: number = 0;
  constructor( private ontimizeService: OntimizeService) { }

  ngOnInit(){
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("salesHead")
    );
    const columns = ["salesheadtotal"];
    this.ontimizeService
      .query(void 0, columns, "salesheadtotal")
      .subscribe((resp) => {
        if (resp.code === 0) {
          this.totalsales = resp.data[0]["salesheadtotal"];
        } else {
          console.error(resp);
        }
      });
  }

  salesHeadPay(event:any){
  
  }


}
