import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Movie } from '../../shared/models/MovieResponse.models';
import { TranslationService } from '../../services/traslation.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  @Input() movies: Movie[] = [];

  constructor(
    public translate: TranslateService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    const languageSubscr = this.translate
    .use(this.translationService.getSelectedLanguage())
    .subscribe();
    this.unsubscribe.push(languageSubscr);
  }

  ngOnDestroy() : void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
