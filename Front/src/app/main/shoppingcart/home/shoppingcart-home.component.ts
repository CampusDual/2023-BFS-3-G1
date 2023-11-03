import { Component, OnInit } from "@angular/core";
import { OntimizeService } from "ontimize-web-ngx";

@Component({
  selector: "app-shoppingcart-home",
  templateUrl: "./shoppingcart-home.component.html",
  styleUrls: ["./shoppingcart-home.component.css"],
})
export class ShoppingcartHomeComponent implements OnInit {
  constructor(private ontimizeService: OntimizeService) {}

  ngOnInit() {}
  goToSales(event: any) {
    let salesId = 0;
    let shoppingcartLines: Array<any> = [];
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("salesHead")
    );
    let salesHead = { user_: "demo3", reference: "referencia" };
    this.ontimizeService
      .insert(salesHead, "salesHead")
      .subscribe((response) => {
        if (response.code === 0) {
          salesId = response.data.id;
        }
      });

    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("shoppingcart")
    );
    const filter = void 0;
    const columns = [
      "id",
      "user_",
      "product_id",
      "qty",
      "shoppingcart_price",
      "total",
    ];
    this.ontimizeService
      .query(filter, columns, "shoppingcart")
      .subscribe((resp) => {
        if (resp.code === 0) {
          shoppingcartLines = resp.data;
        } else {
          console.error(resp);
        }
      });
    // if(shoppingcartLines.length == 0 ){
    //   return;
    // }
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("sales")
    );

    for (let i = 0; i < shoppingcartLines.length; i++) {
      let saleLine = {
        sales_head_id: salesId,
        product_id: shoppingcartLines[i].product_id,
        user_: shoppingcartLines[i].user_,
        qty: shoppingcartLines[i].qty,
        price: shoppingcartLines[i].shoppingcart_price,
      };
      this.ontimizeService.insert(saleLine, "sales").subscribe((response) => {
        if (response.code === 0) {
          alert("Estructura creada");
        }
      });
    }
  }
}
