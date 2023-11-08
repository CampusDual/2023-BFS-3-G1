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
  public salesubtotal: number = 0;
  public saletaxes: number = 0;
  public saletotal: number = 0;
  public saletransport: number = 5;


  constructor(
    private ontimizeservice: OntimizeService,
    private actRoute: ActivatedRoute,
    router: Router,
    protected snackBarService: SnackBarService,
    
    ) {
    this.router = router;
  }

  ngOnInit() {
    this.calculateAndDisplaySalesTotals(); 
  }

  calculateAndDisplaySalesTotals() {
    this.ontimizeservice.configureService(
      this.ontimizeservice.getDefaultServiceConfiguration("shoppingcart")
    );
    this.ontimizeservice.query({}, ["qty", "shoppingcart_price"], "shoppingcart").subscribe((resp) => {
      if (resp.code === 0) {
        const cartItems = resp.data;
        this.salesubtotal = cartItems.reduce(
          (subtotal, item) => subtotal + item.qty * item.shoppingcart_price,
          0
        );
        this.saletaxes = +(this.salesubtotal * 0.21).toFixed(2);
        this.saletotal = +(this.salesubtotal + this.saletaxes + this.saletransport).toFixed(2);
      } else {
        console.error(resp);
      }
    });
  }

  goToSales(event: any) {
    this.ontimizeservice.configureService(
      this.ontimizeservice.getDefaultServiceConfiguration("saleordersh")
    );
    this.ontimizeservice.insert({}, "saleordersh").subscribe((resp) => {
      if (resp.code === 0) {
        let responseid = resp.data.id;
        this.router.navigate(["/main/sales/detail/" + responseid]);
        const config: OSnackBarConfig = {
          milliseconds: 5000,
          icon: "list_alt",
          iconPosition: "left",
        };
        this.snackBarService.open("SALEORDER_CREATED", config);
      }
    });
  }
  backToProducts(event: any) {
    this.router.navigate(["/main/sectionfood"]);
  }

  updateCartItem(listItem: any, option:number) {
    this.ontimizeservice.configureService(
      this.ontimizeservice.getDefaultServiceConfiguration("shoppingcart")
    );
    const keyMap = {
      id: listItem.id,
      user_: listItem.user_, 
    };
    let newQty = listItem.qty;
    let price = listItem.shoppingcart_price;
    
    
    if(option ===1){
      newQty++; 
    }else if (option === 0 && newQty > 0){
      newQty--;
    }
    let total : number = newQty * price;
 
    const attrMap = {
      qty: newQty,
      total :total
    };
    this.ontimizeservice.update(keyMap, attrMap, "shoppingcart").subscribe((resp) => {
      if (resp.code === 0) {
        this.calculateAndDisplaySalesTotals();
        const config: OSnackBarConfig = {
          milliseconds: 5000,
          icon: "check_circle",
          iconPosition: "left",
        };
        this.snackBarService.open("Quantity updated successfully", config);
        this.shoppingcartGrid.reloadData();
      } else {
        console.error("Error updating item:", resp.message);
      }
    });
  }



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
        this.calculateAndDisplaySalesTotals();
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
