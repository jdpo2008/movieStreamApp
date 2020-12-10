import { Component, OnInit, OnDestroy, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { debounceTime, filter, map } from 'rxjs/operators';
import { LanguageFlag } from '../../../shared/interfaces/language.interface';
import { TranslationService } from '../../../services/traslation.service';
import { AuthProcessService } from '../../../services/auth-sync.service';
import { Subject, Subscription } from 'rxjs';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  private _searchSubject: Subject<string> = new Subject();

  @ViewChild('searchInput', { static: false }) searchInput:  ElementRef;
  @Output() searchValue: EventEmitter<string> = new EventEmitter();
  
  photoURL: string;
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

    let userSuscrit = this._authService.user$
                              .pipe(map((res: User) => { return res.photoURL }))
                              .subscribe((data: any) => this.photoURL = data);

    this.unsubscribe.push(userSuscrit);

    this._setSearchSubscription();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sc) => sc.unsubscribe());
    this._searchSubject.unsubscribe();
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
  
  updateSearch(value: string) {
    this._searchSubject.next(value);
  }

  private _setSearchSubscription() {
    this._searchSubject.pipe(
      debounceTime(500)
    ).subscribe((search: string) => {
      this.searchValue.emit(search);
    });
  }

}
