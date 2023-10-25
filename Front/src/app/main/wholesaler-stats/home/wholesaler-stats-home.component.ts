import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  Expression,
  FilterExpressionUtils,
  ODateInputComponent,
  OFilterBuilderComponent,
  OFormComponent,
  OntimizeService,
  OTranslateService,
} from "ontimize-web-ngx";
import {
  ChartSeries,
  LinePlusBarFocusChartConfiguration,
  PieChartConfiguration,
} from "ontimize-web-ngx-charts";
import { OReportStoreService } from "ontimize-web-ngx-report";
import { D3LocaleService } from "../../../shared/d3-locale/d3Locale.service";
import { ThemeService } from "../../../shared/theme.service";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-wholesaler-stats-home",
  templateUrl: "./wholesaler-stats-home.component.html",
  styleUrls: ["./wholesaler-stats-home.component.css"],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class.wholesaler-stats-home]": "true",
  },
})
export class WholesalerStatsHomeComponent implements OnInit {
  @ViewChild("filterStartDate", { static: false })
  public filterStartDate: ODateInputComponent;
  @ViewChild("filterEndDate", { static: false })
  public filterEndDate: ODateInputComponent;

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
    this.getSalesMovements();
  }

  private getSalesMovements() {
    // Llamo al servicio
    this.ontimizeService.configureService(
      this.ontimizeService.getDefaultServiceConfiguration("wholesalers")
    );
    // Defino las columnas que necesito y las variables para guardar los filtros y la
    // expresion final
    const columns = ["saledate", "total"];
    let filters: Array<Expression> = [];
    let ce: Expression;

    if (!isNullOrUndefined(this.filterStartDate)) {
      filters.push(
        FilterExpressionUtils.buildExpressionMoreEqual(
          "saledate",
          this.filterStartDate.getValue()
        )
      );
    }
    if (!isNullOrUndefined(this.filterEndDate)) {
      filters.push(
        FilterExpressionUtils.buildExpressionLessEqual(
          "saledate",
          this.filterEndDate.getValue()
        )
      );
    }
    if (filters.length > 0) {
      ce = filters.reduce((exp1, exp2) =>
        FilterExpressionUtils.buildComplexExpression(
          exp1,
          exp2,
          FilterExpressionUtils.OP_AND
        )
      );
    }

    this.ontimizeService
      .query(ce, columns, "wholesalersalesdetail")
      .subscribe((resp) => {
        if (resp.code === 0) {
          this.processLineData(resp.data);
          this.last_sale_date = resp.data[resp.data.length - 1].saledate;
          this.first_sale_date = resp.data[0].saledate;
        } else {
          console.error(resp);
        }
      });
  }

  private processLineData(data: any[]): void {
    if (data && data.length) {
      const balanceSerie: ChartSeries = {
        key: this.translateService.get("salestotal"),
        values: [],
      };

      data.forEach((item: any, i: number) => {
        let color: string;
        const date = new Date(item.saledate);
        let salestotal = item.salestotal;
        balanceSerie.values.push({ x: date, y: salestotal });
      });
      this.lineData = [balanceSerie];
    }
  }

  public onFormDataLoaded(data: any): void {
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

  createFilter(values: Array<{ attr; value }>): Expression {
    let filters = [];
    values.forEach((fil) => {
      if (fil.value) {
        if (fil.attr === "filterStartDate") {
          filters.push(
            FilterExpressionUtils.buildExpressionLike(fil.attr, fil.value)
          );
        }

        if (fil.attr === "ACCOUNTTYPEID") {
          filters.push(
            FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value)
          );
        }

        //startdate
        if (fil.attr === "STARTDATE") {
          filters.push(
            FilterExpressionUtils.buildExpressionMoreEqual(fil.attr, fil.value)
          );
        }

        //startdate
        if (fil.attr === "ENDDATE") {
          filters.push(
            FilterExpressionUtils.buildExpressionLessEqual(fil.attr, fil.value)
          );
        }

        //balance
        if (fil.attr === "BALANCE") {
          filters.push(
            FilterExpressionUtils.buildExpressionLessEqual(fil.attr, fil.value)
          );
        }
      }
    });
    let ce: Expression;
    if (filters.length > 0) {
      ce = filters.reduce((exp1, exp2) =>
        FilterExpressionUtils.buildComplexExpression(
          exp1,
          exp2,
          FilterExpressionUtils.OP_AND
        )
      );
    }

    return ce;
  }
}
