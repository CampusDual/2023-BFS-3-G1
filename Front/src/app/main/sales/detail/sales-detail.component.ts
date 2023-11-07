import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sales-detail",
  templateUrl: "./sales-detail.component.html",
  styleUrls: ["./sales-detail.component.css"],
})
export class SalesDetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getDataArray() {
    const array: Array<Object> = [];
    array.push({
      key: 1,
      value: "Spain",
    });
    array.push({
      key: 2,
      value: "United States",
    });
    array.push({
      key: 3,
      value: "United Kingdom",
    });
    array.push({
      key: 4,
      value: "Germany",
    });
    return array;
  }

  getValue() {
    return 2;
  }
}
