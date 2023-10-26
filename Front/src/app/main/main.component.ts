import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../shared/theme.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent {
  public closedSidenavImage: string;
  public openedSidenavImage: string;
  constructor(protected router: Router, protected themeService: ThemeService) {
    this.checkSidenavImage();
    themeService.onThemeUpdate.subscribe(() => this.checkSidenavImage());
  }

  openAbout() {
    this.router.navigate(["/main/about"]);
  }

  checkSidenavImage() {
    let path = 'assets/images/';
    this.closedSidenavImage = path + (this.themeService.currentTheme.href.indexOf('ontimize-implatform') > -1 ? 'logoclosedcolor.png' : 'logoclosedcolor.png');
    this.openedSidenavImage = path + (this.themeService.currentTheme.href.indexOf('ontimize-implatform') > -1 ? 'logo_welcome.png' : 'logo_welcome.png');
  }

}
