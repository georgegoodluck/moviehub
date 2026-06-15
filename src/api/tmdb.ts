import axios from "axios";
import type { Movie, MovieListResponse, Genre } from "../types";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

const client = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

export const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const getPosterUrl = (path: string | null, size = "w342") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export const getBackdropUrl = (path: string | null, size = "w1280") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export const getReleaseYear = (date: string) =>
  date ? new Date(date).getFullYear() : "N/A";

export const formatRuntime = (mins: number) =>
  mins ? `${Math.floor(mins / 60)}h ${mins % 60}m` : "N/A";

export const formatMoney = (n: number) =>
  n
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n)
    : "N/A";

export const fetchPopular = async (page = 1): Promise<MovieListResponse> =>
  (await client.get("/movie/popular", { params: { page } })).data;

export const fetchNowPlaying = async (page = 1): Promise<MovieListResponse> =>
  (await client.get("/movie/now_playing", { params: { page } })).data;

export const fetchTopRated = async (page = 1): Promise<MovieListResponse> =>
  (await client.get("/movie/top_rated", { params: { page } })).data;

export const fetchUpcoming = async (page = 1): Promise<MovieListResponse> =>
  (await client.get("/movie/upcoming", { params: { page } })).data;

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  const { data } = await client.get(`/movie/${id}`, {
    params: { append_to_response: "credits" },
  });
  const director =
    data.credits?.crew?.find((c: CrewMember) => c.job === "Director")?.name ??
    "N/A";
  return { ...data, director };
};

export const fetchSimilarMovies = async (
  id: number,
): Promise<MovieListResponse> =>
  (await client.get(`/movie/${id}/similar`)).data;

export const fetchGenres = async (): Promise<Genre[]> =>
  (await client.get("/genre/movie/list")).data.genres;

export const searchMovies = async (
  query: string,
  page = 1,
  params?: Record<string, string>,
): Promise<MovieListResponse> => {
  if (query.trim()) {
    return (
      await client.get("/search/movie", { params: { query, page, ...params } })
    ).data;
  }
  return (
    await client.get("/discover/movie", {
      params: { page, sort_by: "popularity.desc", ...params },
    })
  ).data;
};
