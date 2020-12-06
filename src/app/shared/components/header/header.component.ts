import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { LanguageFlag } from '../../../shared/interfaces/language.interface';
import { TranslationService } from '../../../services/traslation.service';
import { AuthProcessService } from '../../../services/auth-sync.service';
import { Subscription } from 'rxjs';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  photoURL: string;
  userSuscription: Subscription;
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
    private _authService: AuthProcessService,
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

    this.userSuscription = this._authService.user$
                              .pipe(map((res: User) => { return res.photoURL }))
                              .subscribe((data: any) => this.photoURL = data)
  }

  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
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

  signOut() {
    this._authService.signOut();
  }
}
