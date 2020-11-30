import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LanguageFlag } from '../../../interfaces/language.interface';
import { TranslationService } from '../../../services/traslation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  language: LanguageFlag;
  languages: LanguageFlag[] = [
    {
      lang: 'es',
      name: 'Spanish',
      flag: './assets/images/flags/es.svg',
    },
    {
      lang: 'en',
      name: 'English',
      flag: './assets/images/flags/us.svg',
    },
    {
      lang: 'fr',
      name: 'Frances',
      flag: './assets/images/flags/fr.svg',
    },
  ];

  constructor(
    private translationService: TranslationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setSelectedLanguage();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.setSelectedLanguage();
      });
  }

  setLanguageWithRefresh(lang) {
    this.setLanguage(lang);
    window.location.reload();
  }

  setLanguage(lang) {
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translationService.setLanguage(lang);
  }

  setSelectedLanguage(): any {
    this.setLanguage(this.translationService.getSelectedLanguage());
  }
}
