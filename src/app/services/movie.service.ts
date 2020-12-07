import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Genres,
  Movie,
  MoviesResponse,
} from '../shared/models/MovieResponse.models';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private BaseURL: string = environment.themoviedbCongi.apiURL;
  private Api_Key: string = environment.themoviedbCongi.apiKey;

  private params = {
    api_key: this.Api_Key,
    language: 'es-ES',
  };

  '&page=1&with_genres=28';

  constructor(private http: HttpClient) {}

  getAllPopular(
    page?: string,
    genre: string = 'null'
  ): Observable<MoviesResponse> {
    let params = {};
    if (genre == 'null') {
      params = {
        ...this.params,
        page,
      };
    } else {
      params = {
        ...this.params,
        page,
        with_genres: genre,
      };
    }

    console.log(genre);
    return this.http.get<MoviesResponse>(`${this.BaseURL}discover/movie?`, {
      params,
    });
  }

  findMovie(search: string): Observable<Movie[]> {
    const params = {
      ...this.params,
      query: search,
    };

    return this.http
      .get<MoviesResponse>(`${this.BaseURL}search/movie`, {
        params,
      })
      .pipe(
        map((resp: MoviesResponse) => {
          return resp.results;
        })
      );
  }

  getGenres(): Observable<Genres[]> {
    return this.http
      .get<any>(`${this.BaseURL}genre/movie/list?`, {
        params: this.params,
      })
      .pipe(map((resp: any) => resp.genres));
  }
}
