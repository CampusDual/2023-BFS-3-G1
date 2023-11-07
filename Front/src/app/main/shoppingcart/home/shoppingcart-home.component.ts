import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  OGridComponent,
  OSnackBarConfig,
  OntimizeService,
  SnackBarService,
} from "ontimize-web-ngx";

@Component({
  selector: "app-shoppingcart-home",
  templateUrl: "./shoppingcart-home.component.html",
  styleUrls: ["./shoppingcart-home.component.css"],
})
export class ShoppingcartHomeComponent implements OnInit {
  @ViewChild("shoppingcartGrid", { static: false })
  private shoppingcartGrid: OGridComponent;
  router: Router;
  constructor(
    private ontimizeservice: OntimizeService,
    private actRoute: ActivatedRoute,
    router: Router,
    protected snackBarService: SnackBarService,
    
    ) {
    this.router = router;
  }

  ngOnInit() {}

  goToSales(event: any) {
    this.ontimizeservice.configureService(
      this.ontimizeservice.getDefaultServiceConfiguration("saleordersh")
    );
    this.ontimizeservice.insert({}, "saleordersh").subscribe((resp) => {
      if (resp.code === 0) {
        let responseid = resp.data.id;
        this.router.navigate(["/main/sales/" + responseid]);
        const config: OSnackBarConfig = {
          milliseconds: 5000,
          icon: "list_alt",
          iconPosition: "left",
        };
        this.snackBarService.open("SALEORDER_CREATED", config);
      }
    });
  }

  increaseQty(listItem: any) {
    listItem.qty += 1;
  }

}
