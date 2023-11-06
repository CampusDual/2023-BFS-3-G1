import { Component, OnInit, ViewChild } from "@angular/core";
import { OTableComponent, OntimizeService } from "ontimize-web-ngx";

@Component({
  selector: "app-shoppingcart-home",
  templateUrl: "./shoppingcart-home.component.html",
  styleUrls: ["./shoppingcart-home.component.css"],
})
export class ShoppingcartHomeComponent implements OnInit {
  @ViewChild ("tableInfo",{static:false})
  private tableInfo: OTableComponent;
  constructor(private ontimizeservice:OntimizeService) {}

  ngOnInit() {}
  goToSales(event: any) {
    this.ontimizeservice.configureService(this.ontimizeservice.getDefaultServiceConfiguration('salesHead'));
    this.ontimizeservice.insert({},'salesHead').subscribe((resp) =>{
      if(resp.code ===0){
        this.tableInfo.reloadData();
        alert('Pedido realizado con exito, gracias por usar nuestros servicios');
      }
    });
  }
}
