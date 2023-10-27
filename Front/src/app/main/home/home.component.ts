import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  constructor(protected router: Router) {}

  public gotoProducts() {
    this.router.navigate(["/main/sectionfood"]);
    return false;
  }
}
