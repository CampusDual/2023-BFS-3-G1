import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OTableComponent, OntimizeService } from "ontimize-web-ngx";

@Component({
  selector: "app-shoppingcart-home",
  templateUrl: "./shoppingcart-home.component.html",
  styleUrls: ["./shoppingcart-home.component.css"],
})
export class ShoppingcartHomeComponent implements OnInit {
  @ViewChild ("tableInfo",{static:false})
  private tableInfo: OTableComponent;
  router:Router;
  constructor(
    private ontimizeservice:OntimizeService,
    private actRoute:ActivatedRoute, router: Router) {
      this.router=router;
  }

  ngOnInit() {}


  goToSales(event: any) {
    this.ontimizeservice.configureService(this.ontimizeservice.getDefaultServiceConfiguration('salesHead'));
    this.ontimizeservice.insert({},'salesHead').subscribe((resp) =>{
      if(resp.code ===0){
        let responseid = resp.data.id;
        this.router.navigate(["/main/sales/" + responseid]);
        alert('Pedido realizado con exito, gracias por usar nuestros servicios');
      }
    });
  }
}
