import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, public translate: TranslateService) {
    translate.addLangs(['es', 'en', 'fr']);
    translate.setDefaultLang('es');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/es|en|fr/) ? browserLang : 'es');
  }

  ngOnInit(): void {
   this.router.navigate[("pages/dashboard")];
  }

}
