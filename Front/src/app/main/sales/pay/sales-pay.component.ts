import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";

import {
  AuthService,
  DialogService,
  Expression,
  FilterExpressionUtils,
  ODialogConfig,
  OFormComponent,
  OSnackBarConfig,
  OTranslateService,
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
  public currentLang: string;
  public dest_name: string;
  public userData: any;

  private id: number = 0;

  @ViewChild("oForm", { static: false })
  private oForm: OFormComponent;
  @ViewChild("paymentRef", { static: true }) paymentRef!: ElementRef;

  constructor(
    private ontimizeService: OntimizeService,
    protected dialogService: DialogService,
    protected router: Router,
    protected snackBarService: SnackBarService,
    private translateService: OTranslateService,
    @Inject(AuthService) private authService: AuthService
  ) {
    this.currentLang = this.translateService.getCurrentLang();
  }

  ngOnInit() {
    this.getUser();
    window.paypal
      .Buttons({
        style: {
          color: "gold",
          label: "paypal",
        },
        createOrder: (data: any, actions: any) => {
          let formValues = this.oForm.getComponents();
          let dest_name = formValues.dest_name.getValue();
          let dest_surname = formValues.dest_name.getValue();
          let dest_address = formValues.dest_address.getValue();
          let dest_cp = formValues.dest_cp.getValue();
          let dest_city = formValues.dest_city.getValue();
          let country_id = formValues.country_id.getValue();

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.saletotal.toString(),
                  currency_code: "EUR",
                },
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING",
              brand_name:"GOURMET IMPORTS"
            },
            payer: {
              email_address: "customer@domain.com",
              phone: {
                phone_type: "HOME",
                phone_number: {
                  national_number: "615960810",
                },
              },
              name: {
                given_name: formValues.dest_name.getValue(),
                surname: formValues.dest_surname.getValue(),
              },
              address: {
                address_line_1: formValues.dest_address.getValue(),
                postal_code: formValues.dest_cp.getValue(),
                country_code: this.userData[0].code,
              },
            },
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            if (details.status === "COMPLETED") {
              console.log(details);
              this.pay();
            }
          });
        },
        onError: (error: any) => {
          console.log(error);
        },
      })
      .render(this.paymentRef.nativeElement);
  }

  private getUser() {
    let filters: Array<Expression> = [];
    const columns = [
      "name",
      "surname",
      "email",
      "address",
      "codpos",
      "phonenumber",
      "city",
      "country_id",
      "code"
    ];

    filters.push(
      FilterExpressionUtils.buildExpressionEquals(
        "user_",
        this.authService.getSessionInfo().user
      )
    );

    let kv = {
      "@basic_expression": filters.reduce((exp1, exp2) =>
        FilterExpressionUtils.buildComplexExpression(
          exp1,
          exp2,
          FilterExpressionUtils.OP_AND
        )
      ),
    };

    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("users")
    );

    this.ontimizeService.query(kv, columns, "user").subscribe((resp) => {
      if (resp.code === 0) {
        this.userData = resp.data;
        console.log(this.userData);
      }
    });
  }
  onDataLoaded(event: any) {
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("saleordersh")
    );

    let formValues = this.oForm.getComponents();
    this.id = formValues.id.getValue();
    // si el nombre y los apellidos están vacios cargo los datos por defecto del usuario
    if (
      formValues.dest_name.getValue() === undefined &&
      formValues.dest_surname.getValue() === undefined
    ) {
      formValues.dest_name.setValue(this.userData[0].name);
      formValues.dest_surname.setValue(this.userData[0].surname);
      formValues.dest_address.setValue(this.userData[0].address);
      formValues.dest_cp.setValue(this.userData[0].codpos);
      formValues.dest_city.setValue(this.userData[0].city);
      formValues.country_id.setValue(this.userData[0].country_id);
    }

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
    this.ontimizeService
      .query({}, ["id", "user_"], "shoppingcart")
      .subscribe((resp) => {
        if (resp.code === 0) {
          const itemsToDelete = resp.data;
          itemsToDelete.forEach((item) => {
            this.ontimizeService
              .delete({ id: item.id, user_: item.user_ }, "shoppingcart")
              .subscribe((deleteResp) => {
                if (deleteResp.code === 0) {
                  console.log("Elemento eliminado con éxito");
                } else {
                  console.error(
                    "Error al eliminar elemento del carrito:",
                    deleteResp.message
                  );
                }
              });
          });
        }
      });
  }

  // isValidCardExp(exp: string): boolean {
  //   return /^\d{2}\/\d{2}$/.test(exp);
  // }

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

  pay() {
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
    if (this.dialogService) {
      const config: ODialogConfig = {
        icon: "credit_card",
        okButtonText: "ACCEPT",
      };
      this.dialogService.alert("PAYED_PAY", "SUCC_PAY", config);
      this.dialogService.dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate(["/main/sales/" + this.id]);
          this.deleteCart();
        }
      });
    }
  }
}
