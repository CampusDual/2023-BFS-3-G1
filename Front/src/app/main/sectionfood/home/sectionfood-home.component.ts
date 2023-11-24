import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import {
  Expression,
  FilterExpressionUtils,
  OFilterBuilderComponent,
  OFormComponent,
  OIntegerInputComponent,
  OSnackBarConfig,
  OTranslateService,
  OntimizeService,
  SnackBarService,
} from "ontimize-web-ngx";
import { SectionfoodDetailComponent } from "../detail/sectionfood-detail.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-sectionfood-home",
  templateUrl: "./sectionfood-home.component.html",
  styleUrls: ["./sectionfood-home.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class SectionfoodHomeComponent implements OnInit {
  @ViewChild("filterBuilder", { static: true })
  filterBuilder: OFilterBuilderComponent;
  @ViewChild("oForm", { static: false })
  private oForm: OFormComponent;
  @ViewChild("qty", { static: false })
  private oQty: OIntegerInputComponent;
  public currentLang: string;

  constructor(
    protected dialog: MatDialog,
    private ontimizeservice: OntimizeService,
    protected snackBarService: SnackBarService,
    protected sanitizer: DomSanitizer,
    protected router: Router,
    private translateService: OTranslateService
  ) {this.currentLang = this.translateService.getCurrentLang();
    }

  ngOnInit() {
    console.log("lenguaje: "+ this.currentLang)
  }

  // creamos el filtro por el que se va a hacer la búsqueda
  public createFilter(values: Array<{ attr: string; value: any }>): Expression {
    // Prepare simple expressions from the filter components values
    const filters: Expression[] = []; //almacena los filtros que se enviaran al back
    // recorremos los filtros que vienen desde el formulario
    // si es booleano es un alergeno o vegano, como nos interesan los que NO tengan ese alergeno si viene un true
    // lo pasamos a false para buscar los productos con el alergeno a false
    values.forEach((fil) => {
      if (fil.attr.startsWith("al_") && fil.value == true) {
        fil.value = false;
        // añadimos el filtro modificado a la coleccion
        filters.push(
          FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value)
        );
      } else if (
        (fil.attr == "category_id" || fil.attr == "country_id") &&
        fil.value !== ""
      ) {
        filters.push(
          FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value)
        );
      }
    });

    // Build complex expression
    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) =>
        FilterExpressionUtils.buildComplexExpression(
          exp1,
          exp2,
          FilterExpressionUtils.OP_AND
        )
      );
    } else {
      return null;
    }
  }

  public openDetail(data: any): void {
    this.dialog.open(SectionfoodDetailComponent, {
      height: "330px",
      width: "520px",
      data: data,
    });
  }

  public gotoProducts(listId: number) {
    this.router.navigate(["/main/sectionfood/" + listId + "?isdetail=true"]);
    return false;
  }
  getQtyDefaultValue() {
    return 1;
  }

  addToCart(id: number , price: number) {
    this.ontimizeservice.configureService(
      this.ontimizeservice.getDefaultServiceConfiguration("shoppingcart")
    );
    console.log(id)
    let product_id = id
    let qty = 1
    let total = qty * price
    this.ontimizeservice
      .insert(
        { price : price , product_id: product_id, qty: qty, total: total },
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
        }
      });
  }
}
