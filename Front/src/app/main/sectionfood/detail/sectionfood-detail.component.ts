import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  DialogService,
  ODialogConfig,
  OFormComponent,
  OIntegerInputComponent,
  OSnackBarConfig,
  OTranslateService,
  OntimizeService,
  SnackBarService,
} from "ontimize-web-ngx";
import { config } from "rxjs";

@Component({
  selector: "app-sectionfood-detail",
  templateUrl: "./sectionfood-detail.component.html",
  styleUrls: ["./sectionfood-detail.component.css"],
})
export class SectionfoodDetailComponent implements OnInit {
  @ViewChild("oForm", { static: false })
  private oForm: OFormComponent;
  @ViewChild("oForm2", { static: false })
  private oForm2: OFormComponent;
  @ViewChild("qty", { static: false })
  private oQty: OIntegerInputComponent;

  public currentLang: string;

  selectedQty: number = 1;
  constructor(
    private router: Router,
    private ontimizeservice: OntimizeService,
    protected snackBarService: SnackBarService,
    private translateService: OTranslateService
  ) {
    this.currentLang = this.translateService.getCurrentLang();
    this.ontimizeservice.configureService(
      this.ontimizeservice.getDefaultServiceConfiguration("shoppingcart")
    );
  }

  ngOnInit() {}

  addToCart() {
    let formValues = this.oForm.getComponents();
    let price = formValues.price.getValue();
    let product_id = formValues.id.getValue();
    let qty = this.selectedQty;
    let total = +(price * qty).toFixed(2);
    this.ontimizeservice
      .insert(
        { price: price, product_id: product_id, qty: qty, total: total },
        "shoppingcart"
      )
      .subscribe((resp) => {
        if (resp.code === 0) {
          const config: OSnackBarConfig = {
            milliseconds: 5000,
            icon: "shopping_cart",
            iconPosition: "left",
          };
          this.snackBarService.open("PRODUCT_ADDED_TO_CART", config);
          this.backToProducts();
        }
      });
  }

  getQtyDefaultValue() {
    return 1;
  }

  goToShoppingCart(event: any) {
    this.router.navigate(["/main/shoppingcart"]);
  }
  backToProducts() {
    this.router.navigate(["/main/sectionfood"]);
  }
}
