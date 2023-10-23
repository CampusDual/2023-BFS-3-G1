import { Component, ViewEncapsulation } from '@angular/core';
import { OntimizeService, OTranslateService } from 'ontimize-web-ngx';
import { ChartSeries, LinePlusBarFocusChartConfiguration, PieChartConfiguration } from 'ontimize-web-ngx-charts';
import { OReportStoreService } from 'ontimize-web-ngx-report';
import { D3LocaleService } from '../../../shared/d3-locale/d3Locale.service';
import { ThemeService } from '../../../shared/theme.service';

@Component({
  selector: "app-wholesaler-stats-home",
  templateUrl: "./wholesaler-stats-home.component.html",
  styleUrls: ["./wholesaler-stats-home.component.css"],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.wholesaler-stats-home]': 'true'
  }
})
export class WholesalerStatsHomeComponent {
  public formLabel: string;
  public id: string;

  public movementTypesChartParams: PieChartConfiguration;

  constructor(private ontimizeService: OntimizeService,
    private translateService: OTranslateService,
    private d3LocaleService: D3LocaleService,
    //private reportStoreService: OReportStoreService,
    private themeService: ThemeService) {
    const d3Locale = this.d3LocaleService.getD3LocaleConfiguration();
    //this._configurePieChart(d3Locale);
  }

  ngOnInit() {}

  public onFormDataLoaded(data: any): void {
    this.formLabel = data.ACCOUNTTYP;
    this.id = data.ACCOUNTID;

    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('movements'));
    if (data.hasOwnProperty('ACCOUNTID') && this.ontimizeService !== null) {
      const filter = {
        ACCOUNTID: data.ACCOUNTID
      };
      const columns = ['MOVEMENT', 'DATE_', 'MOVEMENTTYPEID'];
      this.ontimizeService.query(filter, columns, 'movement', { ACCOUNTID: 4 }).subscribe(resp => {
        if (resp.code === 0) {
          //this.processLineData(resp.data);
        } else {
          console.error(resp);
        }
      });
    }
    //this.getLastMovement();
  }
}
