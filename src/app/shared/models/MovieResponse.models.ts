export class MoviesResponse {
  results: Movie[];
  page: number;
  total_results: number;
  dates: Dates;
  total_pages: number;
}

export class Dates {
  maximum: Date;
  minimum: Date;
}

export class Movie {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_language: OriginalLanguage;
  original_title: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: Date;
}

export class Genres {
  id: string;
  name: string;
}

export enum OriginalLanguage {
  En = 'en',
  It = 'it',
  Ja = 'ja',
  Ko = 'ko',
}
