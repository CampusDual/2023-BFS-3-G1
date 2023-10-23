import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { OBaseTableCellRenderer } from 'ontimize-web-ngx';

@Component({
  selector: 'app-featured-column-renderer',
  templateUrl: './featured-column-renderer.component.html',
  styleUrls: ['./featured-column-renderer.component.css']
})
export class FeaturedColumnRendererComponent extends OBaseTableCellRenderer {

  @ViewChild('templateref', { read: TemplateRef, static: false }) public templateref: TemplateRef<any>;

  constructor(protected injector: Injector) { 
    super(injector);
  }

  ngOnInit() {
  }

}
