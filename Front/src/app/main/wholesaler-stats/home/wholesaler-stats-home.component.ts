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
  formFilter: OFormComponent;

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
  public currentLang: string;

  constructor(
    private ontimizeService: OntimizeService,
    private translateService: OTranslateService,
    private d3LocaleService: D3LocaleService,
    //private reportStoreService: OReportStoreService,
    private themeService: ThemeService
  ) {
    this.currentLang = this.translateService.getCurrentLang();
    const d3Locale = this.d3LocaleService.getD3LocaleConfiguration();
    //this._configurePieChart(d3Locale);
  }

  ngOnInit() {
    this.filterCurrentYear();
  }

  // se ejecuta al hacer clic en el botón del filtro en el tab de ventas
  public onSaleDataDataLoaded(data: any): void {
    //this.processLineData();
    this.createChartFilter();
  }

  // *********** TAB DE RESUMEN ****************
  // creamos el filtro por el que se va a hacer la búsqueda en la tabla de datos de ventas
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

    let startOfYearISO = startOfCurrentYear.toISOString().split("T")[0];
    let nextDayISO = currentDate.toISOString().split("T")[0];

    let startOfLastYearISO = startOfLastYear.toISOString().split("T")[0];
    let pastNextDayISO = pastCurrentDate.toISOString().split("T")[0];

    filtersCurrent.push(
      FilterExpressionUtils.buildExpressionMoreEqual("saledate", startOfYearISO)
    );
    filtersCurrent.push(
      FilterExpressionUtils.buildExpressionLessEqual("saledate", nextDayISO)
    );

    filtersPrevious.push(
      FilterExpressionUtils.buildExpressionMoreEqual(
        "saledate",
        startOfLastYearISO
      )
    );
    filtersPrevious.push(
      FilterExpressionUtils.buildExpressionLessEqual("saledate", pastNextDayISO)
    );

    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("wholesalers")
    );
    let kv = {
      "@basic_expression": filtersCurrent.reduce((exp1, exp2) =>
        FilterExpressionUtils.buildComplexExpression(
          exp1,
          exp2,
          FilterExpressionUtils.OP_AND
        )
      ),
    };
    const columns = ["totalsales"];
    this.ontimizeService
      .query(kv, columns, "wholesalerbalance", { saledate: 93 })
      .subscribe((result) => {
        if (result.data && result.data.length) {
          this.totalsales = result.data[0]["totalsales"];
        } else {
          console.log("Fallo recogiendo info.");
        }
      });
    let kvPreviousYear = {
      "@basic_expression": filtersPrevious.reduce((exp1, exp2) =>
        FilterExpressionUtils.buildComplexExpression(
          exp1,
          exp2,
          FilterExpressionUtils.OP_AND
        )
      ),
    };
    this.ontimizeService
      .query(kvPreviousYear, columns, "wholesalerbalance", { saledate: 93 })
      .subscribe((result) => {
        if (result.data && result.data.length) {
          this.pastTotalsales = result.data[0]["totalsales"];
        } else {
          console.log("Fallo recogiendo info para el año anterior.");
        }
      });
  }
  // *********** FIN TAB DE RESUMEN ****************

  // *********** TAB DE VENTAS ****************
  // crea el filtro para la tabla
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
              fil.value + (60*60*23*1000) + ((59*60*1000) + (59*1000))
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


  // carga los datos de la gráfica (vienen del back)
  createChartFilter() {
    let filters: Array<Expression> = [];
    let kv = {};
    let formValues = this.formFilter.getComponents();
    let initialDate = formValues.filterStartDate.getValue();
    let endDate = formValues.filterEndDate.getValue();

    if (initialDate != undefined) {
      filters.push(
        FilterExpressionUtils.buildExpressionMoreEqual("saledate", initialDate)
      );
    }
    if (endDate != undefined) {
      filters.push(
        FilterExpressionUtils.buildExpressionLessEqual("saledate", endDate)
      );
    }
    console.log("fecha ini: " + initialDate);
    console.log("fecha fin: " + endDate);

    if (filters.length > 0) {
      kv = {
        "@basic_expression": filters.reduce((exp1, exp2) =>
          FilterExpressionUtils.buildComplexExpression(
            exp1,
            exp2,
            FilterExpressionUtils.OP_AND
          )
        ),
      };
    }
    const columns = ["saledate,saletotal"];
    this.ontimizeService
      .query(kv, columns, "wholesalersalesbyday", { saledate: 93 })
      .subscribe((result) => {
        if (result.data && result.data.length) {
          this.dataChart(result);
        } else {
          console.log("Fallo recogiendo info.");
        }
      });
  }

  private dataChart(result) {
    if (result.data && result.data.length) {
      this.configureDiscreteBarChart();
      let dataAdapter = DataAdapterUtils.createDataAdapter(
        this.chartParameters
      );
      this.discretebar.setDataArray(dataAdapter.adaptResult(result.data));
    }
  }

  private configureDiscreteBarChart(): void {
    this.chartParameters.xAxis = "saledate";
    this.chartParameters.yAxis = ["saletotal"];
  }
  // *********** FIN TAB DE VENTAS ****************
}
