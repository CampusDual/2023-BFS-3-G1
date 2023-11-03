import { Component, OnInit } from "@angular/core";
import { OntimizeService } from "ontimize-web-ngx";

@Component({
  selector: "app-shoppingcart-home",
  templateUrl: "./shoppingcart-home.component.html",
  styleUrls: ["./shoppingcart-home.component.css"],
})
export class ShoppingcartHomeComponent implements OnInit {
  constructor(private ontimizeservice:OntimizeService) {}

  ngOnInit() {}
  goToSales(event: any) {
    this.ontimizeservice.configureService(this.ontimizeservice.getDefaultServiceConfiguration('salesHead'));
    this.ontimizeservice.insert({},'salesHead').subscribe((resp) =>{
      if(resp.code ===0){
        alert('abbbbbbaaa');
      }
    });
  }
}
