export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres?: Genre[];
  runtime?: number;
  budget?: number;
  revenue?: number;
  original_language?: string;
  credits?: Credits;
  director?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface SearchFilters {
  query: string;
  genre: string;
  year: string;
  rating: string;
  sortBy: string;
}
