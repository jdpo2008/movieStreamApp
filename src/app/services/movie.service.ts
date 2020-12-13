import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private headers: HttpHeaders = new HttpHeaders();
  
  private params = {
    api_key: this.Api_Key,
    language: 'es-ES',
  };

  constructor(private http: HttpClient) {
    this.headers.set("Content-Type", "application/json;charset=utf-8");
  }

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

  addFavorites(id: number) {
    return this.http
      .post<any>(`${this.BaseURL}/movie${id}/rating?`, { 
        params: this.params, headers: this.headers 
      });
  }

}
