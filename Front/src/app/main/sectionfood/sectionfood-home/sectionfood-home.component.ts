import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Expression, FilterExpressionUtils, OFilterBuilderComponent } from 'ontimize-web-ngx';
import { OReportStoreService } from 'ontimize-web-ngx-report';

@Component({
  selector: 'app-sectionfood-home',
  templateUrl: './sectionfood-home.component.html',
  styleUrls: ['./sectionfood-home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SectionfoodHomeComponent implements OnInit {

  @ViewChild('filterBuilder', { static: true })
  filterBuilder: OFilterBuilderComponent;

  constructor() { }

  ngOnInit() {
  }

  public createFilter(values: Array<{ attr: string, value: any }>): Expression {
    // Prepare simple expressions from the filter components values
    const filters: Expression[] = [];
    values.forEach(fil => {
      if (fil.value == true) {
        fil.value= false;
        filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));        
      }
    });

    // Build complex expression
    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
    } else {
      return null;
    }
  }

}
