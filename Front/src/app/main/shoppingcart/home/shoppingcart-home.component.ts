import { Component, OnInit } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-shoppingcart-home',
  templateUrl: './shoppingcart-home.component.html',
  styleUrls: ['./shoppingcart-home.component.css']
})
export class ShoppingcartHomeComponent implements OnInit {
  

  



  constructor(private ontimizeService: OntimizeService,) { }

  ngOnInit() {

  }
  goToSales(event: any) {
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("shoppingcart")
    );
    const columns = ["id", "qty", "shoppingcart_price", "product_id", "total"];
    const filter = { "id": event.id };
    let price = 0;
    
    this.ontimizeService
      .query(filter, columns, "shoppingcart")
      .subscribe((resp) => {
        if (resp.code === 0) {
          this.recorded = resp.data[0];
        } else {
          console.error(resp);
        }
      });
    this.recorded["total"] = +((this.recorded["shoppingcart_price"] * this.recorded["qty"]).toFixed(2));
    this.ontimizeService
      .update(filter, this.recorded, "shoppingcart")
      .subscribe((response)=>{
        if(response.code === 0){
          alert("Todo listo muchachos");
        }
      })
  }
}
