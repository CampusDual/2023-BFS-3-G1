import { Component, OnInit, ViewChild } from "@angular/core";
import { OFormComponent, OntimizeService } from "ontimize-web-ngx";

@Component({
  selector: "app-sales-pay",
  templateUrl: "./sales-pay.component.html",
  styleUrls: ["./sales-pay.component.css"],
})
export class SalesPayComponent implements OnInit {
  public totalsales: number = 0;
  private id: number = 0;

  @ViewChild("oForm", { static: false })
  private oForm: OFormComponent;

  constructor(private ontimizeService: OntimizeService) {}

  ngOnInit() {
   
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("saleordersh")
    );
    const filter = {
      saleordersh_id: this.id
    };
    const columns = ["saleordersh_id"];
    this.ontimizeService
      .query(filter, columns, "saleordersh")
      .subscribe((resp) => {
        if (resp.code === 0) {
          this.totalsales = resp.data[0]["saleordertotal"];
        } else {
          console.error(resp);
        }
      });
  }

  onDataLoaded(event: any) {
 let formValues = this.oForm.getComponents();
    this.id = formValues.id.getValue();
}

  pay(event: any) {
    alert("hola");
  }
}
