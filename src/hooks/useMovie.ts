import { useQuery } from "@tanstack/react-query";
import {
  fetchNowPlaying,
  fetchPopular,
  fetchTopRated,
  fetchUpcoming,
  fetchMovieDetails,
  fetchSimilarMovies,
  fetchGenres,
  searchMovies,
} from "../api/tmdb";
import type { SearchFilters } from "../types";

export const useNowPlaying = (page = 1) =>
  useQuery({
    queryKey: ["nowPlaying", page],
    queryFn: () => fetchNowPlaying(page),
  });

export const usePopular = (page = 1) =>
  useQuery({ queryKey: ["popular", page], queryFn: () => fetchPopular(page) });

export const useTopRated = (page = 1) =>
  useQuery({
    queryKey: ["topRated", page],
    queryFn: () => fetchTopRated(page),
  });

export const useUpcoming = (page = 1) =>
  useQuery({
    queryKey: ["upcoming", page],
    queryFn: () => fetchUpcoming(page),
  });

export const useMovieDetails = (id: number) =>
  useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id,
  });

export const useSimilarMovies = (id: number) =>
  useQuery({
    queryKey: ["similar", id],
    queryFn: () => fetchSimilarMovies(id),
    enabled: !!id,
  });

export const useGenres = () =>
  useQuery({ queryKey: ["genres"], queryFn: fetchGenres, staleTime: Infinity });

export const useSearch = (filters: SearchFilters, page = 1) => {
  const params: Record<string, string> = {};
  if (filters.genre) params["with_genres"] = filters.genre;
  if (filters.year) params["primary_release_year"] = filters.year;
  if (filters.rating) params["vote_average.gte"] = filters.rating;
  if (filters.sortBy) params["sort_by"] = filters.sortBy;

  return useQuery({
    queryKey: ["search", filters, page],
    queryFn: () => searchMovies(filters.query, page, params),
    placeholderData: (prev) => prev,
  });
};
