import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { OTranslateService } from "ontimize-web-ngx";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  public currentLang: string;

  constructor(
    protected router: Router,
    private translateService: OTranslateService
  ) {
    this.currentLang = this.translateService.getCurrentLang();
  }

  public gotoProducts() {
    this.router.navigate(["/main/sectionfood"]);
    return false;
  }
}
