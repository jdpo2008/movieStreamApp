import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Genres, Movie, MoviesResponse } from '../models/MovieResponse.models';

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

  constructor(private http: HttpClient) {}

  getAllPopular(page?: string): Observable<Movie[]> {
    const params = {
      ...this.params,
      page,
    };
    return this.http
      .get<MoviesResponse>(`${this.BaseURL}movie/popular?`, {
        params,
      })
      .pipe(map((data) => data.results));
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
    return this.http.get<Genres[]>(`${this.BaseURL}genre/movie/list?`, {
      params: this.params,
    });
  }
}
