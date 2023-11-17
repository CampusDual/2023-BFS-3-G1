import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  Expression,
  FilterExpressionUtils,
  OFilterBuilderComponent,
  OFormComponent,
  OntimizeService,
  OTableComponent,
  OTranslateService,
} from "ontimize-web-ngx";
import {
  ChartSeries,
  DataAdapterUtils,
  DiscreteBarChartConfiguration,
  LineChartConfiguration,
  LinePlusBarFocusChartConfiguration,
  OChartComponent,
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
  @ViewChild("discretebar", { static: true })
  discretebar: OChartComponent;
  @ViewChild("formFilter", { static: true })
  formFilter:OFormComponent;

  public chartParameters = new LineChartConfiguration();
  public formLabel: string;
  public id: string;
  public totalsales: number = 0;
  public pastTotalsales: number = 0;
  public first_sale_date: Date;
  public last_sale_date: Date;
  public lineData: ChartSeries[];
  public balanceChartParams: LinePlusBarFocusChartConfiguration;
  public currentYear;
  public movementTypesChartParams: PieChartConfiguration;
  public globalFilter;
  public initialDate;
  public endDate; 

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
    this.filterCurrentYear();

    this.getFirstLastMovement();

    // this.processValues();
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
      this.globalFilter = filters.reduce((exp1, exp2) =>
        FilterExpressionUtils.buildComplexExpression(
          exp1,
          exp2,
          FilterExpressionUtils.OP_AND
        )
      );
          return this.globalFilter;
    } else {
      return null;
    }
  }


  createChartFilter(){
    let formValues = this.formFilter.getComponents();
    this.initialDate = formValues.filterStartDate.getValue();
    this.endDate = formValues.filterEndDate.getValue();
  }




  filterCurrentYear() {
    let filtersCurrent: Array<Expression> = [];
    let filtersPrevious: Array<Expression> = [];
    let currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    let startOfCurrentYear = new Date(this.currentYear, 0, 2);
    let startOfLastYear = new Date(currentDate);
    startOfLastYear.setFullYear(this.currentYear - 1);
    startOfLastYear.setMonth(0);
    startOfLastYear.setDate(2);

    currentDate.setDate(currentDate.getDate() + 1);

    let pastCurrentDate = new Date(currentDate);
    pastCurrentDate.setFullYear(currentDate.getFullYear() - 1);

    let startOfYearISO = startOfCurrentYear.toISOString().split('T')[0];
    let nextDayISO = currentDate.toISOString().split('T')[0];

    let startOfLastYearISO = startOfLastYear.toISOString().split('T')[0];
    let pastNextDayISO = pastCurrentDate.toISOString().split('T')[0];

    filtersCurrent.push(FilterExpressionUtils.buildExpressionMoreEqual('saledate', startOfYearISO));
    filtersCurrent.push(FilterExpressionUtils.buildExpressionLessEqual('saledate', nextDayISO));

    filtersPrevious.push(FilterExpressionUtils.buildExpressionMoreEqual('saledate', startOfLastYearISO));
    filtersPrevious.push(FilterExpressionUtils.buildExpressionLessEqual('saledate', pastNextDayISO));


    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("wholesalers")
    );
    let kv = { '@basic_expression': filtersCurrent.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND)) };
    const columns = ['totalsales'];
    this.ontimizeService.query(kv, columns, 'wholesalerbalance', { saledate: 93 }).subscribe(
      result => {
        if (result.data && result.data.length) {
          this.totalsales = result.data[0]['totalsales'];

        } else {
          console.log("Fallo recogiendo info.");
        }
      }
    );
    let kvPreviousYear = { '@basic_expression': filtersPrevious.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND)) };
    this.ontimizeService.query(kvPreviousYear, columns, 'wholesalerbalance', { saledate: 93 }).subscribe(
      result => {
        if (result.data && result.data.length) {
          this.pastTotalsales = result.data[0]['totalsales'];
        } else {
          console.log("Fallo recogiendo info para el año anterior.");
        }
      }
    );

  }

  public onSaleDataDataLoaded(data: any): void {
    this.processLineData();
  }

  private processLineData(): void {
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("wholesalers")
    );
    const columns = ['saledate','saletotal'];
    
    this.ontimizeService.query( this.globalFilter, columns, 'wholesalersalesbyday', { saledate: 93 }).subscribe(
      result => {
       this.dataChart(result);
      }
    );
    
  }

  private dataChart(result){
    if (result.data && result.data.length) {
      this.configureDiscreteBarChart();
      let dataAdapter = DataAdapterUtils.createDataAdapter(this.chartParameters);
      this.discretebar.setDataArray(dataAdapter.adaptResult(result.data));
      }
      
  }
  private configureDiscreteBarChart(): void {
    this.chartParameters.xAxis = "saledate";
    this.chartParameters.yAxis = ["saletotal"];
    
  }



  
}
