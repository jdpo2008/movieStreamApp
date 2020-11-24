import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Movie } from 'src/app/models/MovieResponse.models';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  Movies: Movie[];
  constructor(
    public translate: TranslateService,
    public _movieService: MovieService
  ) {
    this.translate.addLangs(['es', 'en', 'fr']);
    this.translate.setDefaultLang('es');

    const browserLang = translate.getBrowserLang();
    this.translate.use(browserLang.match(/es|en|fr/) ? browserLang : 'es');
  }

  ngOnInit(): void {
    //https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>

    this._movieService
      .getAllPopular('1')
      .subscribe((resp) => (this.Movies = resp));
  }
}
