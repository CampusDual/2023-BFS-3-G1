import { Component, OnInit, ViewChild } from "@angular/core";
import { OFormComponent, OntimizeService } from "ontimize-web-ngx";

@Component({
  selector: "app-sales-pay",
  templateUrl: "./sales-pay.component.html",
  styleUrls: ["./sales-pay.component.css"],
})
export class SalesPayComponent implements OnInit {
  public salesubtotal: number = 0;
  public saletaxes: number = 0;
  public saletotal: number = 0;
  public saletransport: number = 5;

  private id: number = 0;

  @ViewChild("oForm", { static: false })
  private oForm: OFormComponent;

  constructor(private ontimizeService: OntimizeService) {}

  ngOnInit() {}

  onDataLoaded() {
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("saleordersh")
    );

    let formValues = this.oForm.getComponents();
    this.id = formValues.saleordersh_id.getValue();
    const filter = {
      saleordersh_id: this.id,
    };
    const columns = ["saleordersh_id", "saleordertotal"];
    this.ontimizeService
      .query(filter, columns, "saleordersh")
      .subscribe((resp) => {
        if (resp.code === 0) {
          this.salesubtotal = resp.data[0]["saleordertotal"];
          this.salesubtotal += this.saletransport;
          this.saletaxes = +(this.salesubtotal * 0.21).toFixed(2);
          this.saletotal = +(this.salesubtotal + this.saletaxes).toFixed(2);
        } else {
          console.error(resp);
        }
      });
  }

  pay(event: any) {
    let formValues = this.oForm.getComponents();
    this.id = formValues.saleordersh_id.getValue();
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("saleordersh")
    );
    const filter = {
      id: this.id,
    };
    const data = {
      salestatus: 1,
    };
    this.ontimizeService
      .update(filter, data, "saleordersh")
      .subscribe((resp) => {
        if (resp.code === 0) {
          console.log("todo ok");
        } else {
          console.error(resp);
        }
      });
  }
}
