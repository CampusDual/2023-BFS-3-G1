import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  DialogService,
  ODialogConfig,
  OFormComponent,
  OntimizeService,
} from "ontimize-web-ngx";

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

  constructor(
    private ontimizeService: OntimizeService,
    protected dialogService: DialogService,
    protected router: Router
  ) {}

  ngOnInit() {}

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
          this.salesubtotal += this.saletransport;
          this.saletaxes = +(this.salesubtotal * 0.21).toFixed(2);
          this.saletotal = +(this.salesubtotal + this.saletaxes).toFixed(2);
          console.log("total cargado " + this.salesubtotal);
        } else {
          console.error(resp);
        }
      });
  }

  pay(event: any, instrument: number) {
    let formValues = this.oForm.getComponents();
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("saleordersh")
    );
    const filter = {
      id: this.id,
    };
    let data = {
      dest_name: formValues.dest_name.getValue(),
      dest_address: formValues.dest_address.getValue(),
      dest_cp: formValues.dest_cp.getValue(),
      dest_city: formValues.dest_city.getValue(),
      country_id: formValues.country_id.getValue(),
      card_number: formValues.card_number.getValue(),
      card_exp: formValues.card_exp.getValue(),
      card_ccv: formValues.card_ccv.getValue(),
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

    if (this.dialogService && instrument == 1) {
      const config: ODialogConfig = {
        icon: "credit_card",
        okButtonText: "ACEPTAR",
      };
      this.dialogService.alert(
        "PEDIDO PAGADO",
        "El pago se ha realizado correctamente",
        config
      );
      this.router.navigate(["/main/sectionfood"]);
    }
  }
}
