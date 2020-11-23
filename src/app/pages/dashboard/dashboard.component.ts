import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public translate: TranslateService) { 

    this.translate.addLangs(['es', 'en', 'fr']);
    this.translate.setDefaultLang('es');

    const browserLang = translate.getBrowserLang();
    this.translate.use(browserLang.match(/es|en|fr/) ? browserLang : 'es');
  }

  ngOnInit(): void {
  }

}
