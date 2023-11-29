import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { OFormComponent, OTranslateService, OntimizeService } from "ontimize-web-ngx";
import { from } from "rxjs";

@Component({
  selector: "app-sales-detail",
  templateUrl: "./sales-detail.component.html",
  styleUrls: ["./sales-detail.component.css"],
})
export class SalesDetailComponent implements OnInit {

  public salesubtotal: number = 0;
  public saletaxes: number = 0;
  public saletotal: number = 0;
  public saletransport: number = 5;

  private id: number = 0;
  public currentLang: string;

  constructor(private ontimizeService: OntimizeService,
    protected router: Router,private translateService: OTranslateService
    ) {  this.currentLang = this.translateService.getCurrentLang();}

  @ViewChild("oForm", { static: false })
  private oForm: OFormComponent;
 
  


  ngOnInit() {}

  getDataArray() {
    const array: Array<Object> = [];
    array.push({
      key: 1,
      value: "Spain",
    });
    array.push({
      key: 2,
      value: "United States",
    });
    array.push({
      key: 3,
      value: "United Kingdom",
    });
    array.push({
      key: 4,
      value: "Germany",
    });
    return array;
  }

  onDataLoaded(event: any) {
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("saleordersh")
    );

    let formValues = this.oForm.getComponents();
    this.id = formValues.id.getValue();
    const filter = {
      saleordersh_id: this.id,
    };
    const data = ["saleordersh_id"];
    this.ontimizeService
      .query(filter, data, "saleordershtotal")
      .subscribe((resp) => {
        if (resp.code === 0) {
          this.salesubtotal = resp.data[0]["saleordertotal"];
          this.saletaxes = +(this.salesubtotal * 0.10).toFixed(2);
          this.saletotal = +(this.salesubtotal + this.saletaxes + this.saletransport).toFixed(2);
          console.log("total cargado " + this.salesubtotal);
        } else {
          console.error(resp);
        }
      });
  }
  payed():boolean{
    if(this.oForm == undefined || this.oForm.getComponents()== undefined || this.oForm.getComponents().salestatus == undefined || !this.oForm.getComponents().salestatus ){
      return false
    }
    let payedValue = this.oForm.getComponents().salestatus.getValue();
    return payedValue && payedValue == 1    
  }
    
  getValue() {
    return 2;
  }
  
  proceedToPay() {
    let formValues = this.oForm.getComponents();
    this.id = formValues.id.getValue();
    this.router.navigate(["/main/sales/pay/" + this.id])
  }
  
}
