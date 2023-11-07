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

  // incrementQty(listItem: any) {
  //   listItem.qty += 1;
    
  //   const dataToUpdate = {
  //     id: listItem.id,
  //     qty: listItem.qty,
  //   };
  //   this.ontimizeservice.configureService(
  //     this.ontimizeservice.getDefaultServiceConfiguration("shoppingcart")
  //   );
  //   this.ontimizeservice.update(dataToUpdate,"shoppinfcart").subscribe((resp) => {
  //     if (resp.code === 0) {
  //       const config: OSnackBarConfig = {
  //         milliseconds: 5000,
  //         icon: "check_circle",
  //         iconPosition: "left",
  //       };
  //       this.snackBarService.open("Quantity updated successfully", config);
  //     } else {
  //       console.error("Error updating quantity:", resp.message);
  //     }
  //   });
  // }



  deleteCartItem(listItem: any) {
    this.ontimizeservice.configureService(
           this.ontimizeservice.getDefaultServiceConfiguration("shoppingcart")
         );
    const keyMap = {
      id: listItem.id,
      user_: listItem.user_, 
    };
    this.ontimizeservice.delete(keyMap, "shoppingcart").subscribe((resp) => {
      if (resp.code === 0) { 
        const config: OSnackBarConfig = {
          milliseconds: 5000,
          icon: "check_circle",
          iconPosition: "left",
        };
        this.snackBarService.open("Item deleted successfully", config);
        this.shoppingcartGrid.reloadData();
      } else {
        console.error("Error deleting item:", resp.message);
      }
    });
  }
}
