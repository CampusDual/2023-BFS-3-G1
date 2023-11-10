import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  DialogService,
  ODialogConfig,
  OFormComponent,
  OSnackBarConfig,
  OntimizeService,
  SnackBarService,
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
    protected router: Router,
    protected snackBarService: SnackBarService
  ) { }

  ngOnInit() { }

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
          this.saletaxes = +(this.salesubtotal * 0.21).toFixed(2);
          this.saletotal = +(
            this.salesubtotal +
            this.saletaxes +
            this.saletransport
          ).toFixed(2);
          console.log("total cargado " + this.salesubtotal);
        } else {
          console.error(resp);
        }
      });
  }

  deleteOrderBack() {
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("saleordersh")
    );
    let formValues = this.oForm.getComponents();
    this.id = formValues.id.getValue();
    let filter = {
      id: this.id,
    };
    this.ontimizeService.delete(filter, "saleordersh").subscribe((resp) => {
      if (resp.code === 0) {
        console.log("pedido borrado con exito ");
      } else {
        console.error(resp);
      }
    });
  }

  deleteOrder(event: any) {
    if (this.dialogService) {
      this.dialogService.confirm("DELETEORDER", "ARE_YOU_SURE");
      this.dialogService.dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.deleteOrderBack();
          if (this.dialogService) {
            this.dialogService.info(
              "SALEORDER_CANCELLED",
              "SALEORDER_CANCELLED_SUCCESSFULLY"
            );
            this.dialogService.dialogRef.afterClosed().subscribe((result) => {
              if (result) {
                this.router.navigate(["/main/sectionfood"]);
              }
            });
          }
        } else {
          return;
        }
      });
    }
  }

 
  deleteCart() {
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("shoppingcart")
    );
    this.ontimizeService.query({}, ["id", "user_"], "shoppingcart").subscribe((resp) => {
      if (resp.code === 0) {
        const itemsToDelete = resp.data;
        itemsToDelete.forEach((item) => {
          this.ontimizeService.delete({ id: item.id, user_: item.user_ }, "shoppingcart").subscribe((deleteResp) => {
            if (deleteResp.code === 0) {
              console.log("Elemento eliminado con éxito");
            } else {
              console.error("Error al eliminar elemento del carrito:", deleteResp.message);
            }
          });
        });
      }
    });
  }

  isValidCardExp(exp: string): boolean {
    return /^\d{2}\/\d{2}$/.test(exp);
  }

  
  // pay(event: any, instrument: number) {
  //   let formValues = this.oForm.getComponents();
  //   this.ontimizeService.configureService(
  //     this.ontimizeService.getDefaultServiceConfiguration("saleordersh")
  //   );
  //   const filter = {
  //     id: this.id,
  //   };
  //   let data = {
  //     dest_name: formValues.dest_name.getValue(),
  //     dest_address: formValues.dest_address.getValue(),
  //     dest_cp: formValues.dest_cp.getValue(),
  //     dest_city: formValues.dest_city.getValue(),
  //     country_id: formValues.country_id.getValue(),
  //     card_number: formValues.card_number.getValue(),
  //     card_exp: formValues.card_exp.getValue(),
  //     card_ccv: formValues.card_ccv.getValue(),
  //     salestatus: 1,
  //   };
  //   if(this.dialogService && instrument == 2) {
  //     if(formValues.card_number.getValue() == null || formValues.card_ccv.getValue() == null || formValues.card_exp.getValue()== null){
  //       const config: ODialogConfig = {
  //         icon: "credit_card",
  //         okButtonText: "ACEPTAR",
  //       };
  //       this.dialogService.alert(
  //         "Tarjeta de Credito no valida",
  //         "Por favor rellene correctamente todos los campos",
  //         config
  //       );
  //       return
  //     }

  //   }

  //   this.ontimizeService
  //     .update(filter, data, "saleordersh")
  //     .subscribe((resp) => {
  //       if (resp.code === 0) {
  //         console.log("todo ok");
  //       } else {
  //         console.error(resp);
  //       }
  //     });
  //   if (this.dialogService && instrument == 1) {
  //     const config: ODialogConfig = {
  //       icon: "credit_card",
  //       okButtonText: "ACEPTAR",
  //     };
  //     this.dialogService.alert(
  //       "PEDIDO PAGADO",
  //       "El pago se ha realizado correctamente",
  //       config
  //     );
  //     this.deleteCart();
  //     this.router.navigate(["/main/sales/" + this.id]);
  //   }
    
  // }


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
    if (this.dialogService && instrument == 2) {
      const cardNumber = formValues.card_number.getValue();
      const cardCcv = formValues.card_ccv.getValue();
      const cardExp = formValues.card_exp.getValue();
    
      if (
        cardNumber == null || 
        cardCcv == null || 
        cardExp == null ||
        !/^\d+$/.test(cardNumber) ||  
        cardNumber.length !== 16 ||   
        !/^\d{3}$/.test(cardCcv) ||  
        !this.isValidCardExp(cardExp)      
      ) {
        const config: ODialogConfig = {
          icon: "credit_card",
          okButtonText: "ACEPTAR",
        };
    
        this.dialogService.alert(
          "Tarjeta de Crédito no válida",
          "Por favor, complete correctamente todos los campos de la tarjeta de crédito.",
          config
        );
        return;
      }     

    }
    this.ontimizeService
      .update(filter, data, "saleordersh")
      .subscribe((resp) => {
        if (resp.code === 0) {
          console.log("todo ok");
        } else {
          console.error(resp);
        }
      });
    if (this.dialogService) {
      const config: ODialogConfig = {
        icon: "credit_card",
        okButtonText: "ACEPTAR",
      };
      this.dialogService.alert(
        "PEDIDO PAGADO",
        "El pago se ha realizado correctamente",
        config
      );
      this.deleteCart();
      this.router.navigate(["/main/sales/" + this.id]);
    }
    
  }
}
