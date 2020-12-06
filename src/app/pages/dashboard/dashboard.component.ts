import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageState, PaginateOptions } from 'ngx-paginate';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Movie,
  MoviesResponse,
} from '../../shared/models/MovieResponse.models';
import { MovieService } from '../../services/movie.service';
import { TranslationService } from '../../services/traslation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit, OnDestroy {
  movies: Movie[];
  data: MoviesResponse;
  suscription: Subscription;
  options: PaginateOptions;
  page = new PageState();

  constructor(
    public translate: TranslateService,
    public _movieService: MovieService,
    private spinner: NgxSpinnerService,
    private translationService: TranslationService
  ) {
    this.page.currentPage = 1;
    this.page.totalItems = 0;
    this.page.numberOfPages = 0;
    this.page.pageSize = 20;

    this.options = {
      spanPages: 2,
      previousPage: true,
      nextPage: true,
      firstPage: true,
      lastPage: true,
      titles: {
        firstPage: 'First',
        previousPage: 'Previous',
        lastPage: 'Last',
        nextPage: 'Next',
        pageSize: 'Items per page',
      },
      pageSizes: [
        {
          value: 5,
          display: '5',
        },
        {
          value: 10,
          display: '10',
        },
        {
          value: 15,
          display: '15',
        },
      ],
    };
  }

  ngOnInit(): void {
    this.setPage(this.page);
    this.translate
      .use(this.translationService.getSelectedLanguage())
      .subscribe();
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  setPage(event: PageState) {
    this.spinner.show();
    this.suscription = this._movieService
      .getAllPopular(String(event.currentPage))
      .subscribe(
        (resp) => {
          this.spinner.hide();
          this.movies = resp.results;
          this.page.currentPage = resp.page;
          this.page.pageSize = resp.results.length;
          this.page.totalItems = resp.total_results;
          this.page.numberOfPages = resp.total_pages;
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
  }
}
