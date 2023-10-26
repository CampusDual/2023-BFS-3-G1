import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  Expression,
  FilterExpressionUtils,
  OFilterBuilderComponent,
  OntimizeService,
  OTableComponent,
  OTranslateService,
} from "ontimize-web-ngx";
import {
  ChartSeries,
  LinePlusBarFocusChartConfiguration,
  PieChartConfiguration,
} from "ontimize-web-ngx-charts";
import { D3LocaleService } from "../../../shared/d3-locale/d3Locale.service";
import { ThemeService } from "../../../shared/theme.service";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-wholesaler-stats-home",
  templateUrl: "./wholesaler-stats-home.component.html",
  styleUrls: ["./wholesaler-stats-home.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class WholesalerStatsHomeComponent implements OnInit {
  @ViewChild("filterBuilder", { static: true })
  filterBuilder: OFilterBuilderComponent;
  @ViewChild("sales", { static: true })
  sales: OTableComponent;

  public formLabel: string;
  public id: string;
  public totalsales: number = 0;
  public first_sale_date: Date;
  public last_sale_date: Date;
  public lineData: ChartSeries[];
  public balanceChartParams: LinePlusBarFocusChartConfiguration;

  public movementTypesChartParams: PieChartConfiguration;

  constructor(
    private ontimizeService: OntimizeService,
    private translateService: OTranslateService,
    private d3LocaleService: D3LocaleService,
    //private reportStoreService: OReportStoreService,
    private themeService: ThemeService
  ) {
    const d3Locale = this.d3LocaleService.getD3LocaleConfiguration();
    //this._configurePieChart(d3Locale);
  }

  ngOnInit() {
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("wholesalers")
    );
    const columns = ["totalsales"];
    this.ontimizeService
      .query(void 0, columns, "wholesalerbalance")
      .subscribe((resp) => {
        if (resp.code === 0) {
          this.totalsales = resp.data[0]["totalsales"];
        } else {
          console.error(resp);
        }
      });
    this.getFirstLastMovement();
  }

  private getFirstLastMovement() {
    const columns = ["saledate"];
    this.ontimizeService
      .query(void 0, columns, "wholesalersalesdetail")
      .subscribe((resp) => {
        if (resp.code === 0) {
          this.last_sale_date = resp.data[resp.data.length - 1].saledate;
          this.first_sale_date = resp.data[0].saledate;
        } else {
          console.error(resp);
        }
      });
  }

  // creamos el filtro por el que se va a hacer la búsqueda
  createFilter(values: Array<{ attr; value }>): Expression {
    let filters: Array<Expression> = [];
    values.forEach((fil) => {
      if (fil.value) {
        if (fil.attr === "saledate_start") {
          filters.push(
            FilterExpressionUtils.buildExpressionMoreEqual(
              "saledate",
              fil.value
            )
          );
        }
        if (fil.attr === "saledate_end") {
          filters.push(
            FilterExpressionUtils.buildExpressionLessEqual(
              "saledate",
              fil.value
            )
          );
        }
      }
    });

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

  public onSaleDataDataLoaded(data: any): void {    
      this.processLineData(data);   
  }

 private processLineData(data: any[]): void {
    if (data && data.length) {
      const salesSerie: ChartSeries = {
        key: this.translateService.get('SALES'),
        values: []
      }
      data.forEach((item: any, i: number) => {                      
        salesSerie.values.push({ x: item.saledate, y: item.total });       
      });      
      this.lineData = [salesSerie];
    }
  }

  public onTableDataLoaded(data: any): void {
    this.formLabel = data.ACCOUNTTYP;
    this.id = data.ACCOUNTID;

    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("wholesalers")
    );
    if (data.hasOwnProperty("totalsales") && this.ontimizeService !== null) {
      const filter = {
        ACCOUNTID: data.ACCOUNTID,
      };
      const columns = ["MOVEMENT", "DATE_", "MOVEMENTTYPEID"];
      this.ontimizeService
        .query({}, columns, "movement", { ACCOUNTID: 4 })
        .subscribe((resp) => {
          if (resp.code === 0) {
            //this.processLineData(resp.data);
          } else {
            console.error(resp);
          }
        });
    }
    //this.getLastMovement();
  }

  private _configureLineBarChart(locale: any): void {
    this.balanceChartParams = new LinePlusBarFocusChartConfiguration();
    this.balanceChartParams.margin.top = 20;
    this.balanceChartParams.margin.right = 80;
    this.balanceChartParams.margin.bottom = 40;
    this.balanceChartParams.margin.left = 120;
    this.balanceChartParams.focusEnable = false;
    this.balanceChartParams.yDataType = locale.numberFormat("$,f");
    this.balanceChartParams.y1Axis.showMaxMin = false;
    this.balanceChartParams.xDataType = (d) =>
      locale.timeFormat("%d %b %Y")(new Date(d));
    this.balanceChartParams.x1Axis.tickPadding = 10;
    this.balanceChartParams.y1Axis.tickPadding = 10;
    this.balanceChartParams.legend.margin.top = 0;
    this.balanceChartParams.legend.margin.right = 0;
    this.balanceChartParams.legend.margin.bottom = 0;
    this.balanceChartParams.legend.margin.left = 0;
  }
}
