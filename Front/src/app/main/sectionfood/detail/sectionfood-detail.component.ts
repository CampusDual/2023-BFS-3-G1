import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, ODialogConfig, OFormComponent, OntimizeService } from 'ontimize-web-ngx';
import { config } from 'rxjs';

@Component({
  selector: 'app-sectionfood-detail',
  templateUrl: './sectionfood-detail.component.html',
  styleUrls: ['./sectionfood-detail.component.css']
})
export class SectionfoodDetailComponent implements OnInit {
  @ViewChild('oForm', { static: false })
  private oForm: OFormComponent;
  @ViewChild('oForm2',{static:false})
  private oForm2:OFormComponent;
 
  
  
  constructor(private router: Router,private ontimizeservice:OntimizeService) { this.ontimizeservice.configureService(this.ontimizeservice.getDefaultServiceConfiguration('shoppingcart')); }


  ngOnInit() {
  }

  addToCart() {
    let formValues = this.oForm.getComponents();
    let formValues2= this.oForm2.getComponents();
    let price = formValues.price.getValue();
    let product_id=formValues.id.getValue();
    let qty=formValues2.qty.getValue();
    let total=+((price * qty).toFixed(2));
    this.ontimizeservice.insert({'price': price,'product_id':product_id,'qty':qty,'total':total},'shoppingcart').subscribe((resp) =>{
      if(resp.code ===0){
        alert('aaaaaa');
      }
    });
  }


}
