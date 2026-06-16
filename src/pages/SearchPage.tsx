import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import SearchBar from "../components/ui/SearchBar";
import MovieGrid from "../components/movie/MovieGrid";
import { useSearch, useGenres } from "../hooks/useMovies";
import type { SearchFilters } from "../types";

const DEFAULT: SearchFilters = {
  query: "",
  genre: "",
  year: "",
  rating: "",
  sortBy: "popularity.desc",
};

const YEARS = Array.from({ length: 35 }, (_, i) =>
  String(new Date().getFullYear() - i),
);

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";

  const [filters, setFilters] = useState<SearchFilters>({
    ...DEFAULT,
    query: currentQuery,
  });
  const [page, setPage] = useState(1);
  const [prevQuery, setPrevQuery] = useState(currentQuery);

  const { data, isLoading, isError } = useSearch(filters, page);
  const { data: genres = [] } = useGenres();

  if (currentQuery !== prevQuery) {
    setPrevQuery(currentQuery);
    setFilters((prev) => ({ ...prev, query: currentQuery }));
    setPage(1);
  }

  function set<K extends keyof SearchFilters>(key: K, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  const hasFilters = !!(filters.genre || filters.year || filters.rating);

  const selectClass =
    "text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition";

  return (
    <div className="px-8 py-6 flex flex-col gap-6">
      {/* Search bar */}
      <div className="flex items-center gap-3">
        <SearchBar
          value={filters.query}
          onChange={(q) => {
            setSearchParams(q ? { q } : {});
            set("query", q);
          }}
        />
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      {/* Results count */}
      {filters.query && !isLoading && (
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">
            Results for <span className="text-blue-600">"{filters.query}"</span>
          </h2>
          <span className="text-sm text-slate-400">
            {data?.total_results.toLocaleString()} results
          </span>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <select
          value={filters.genre}
          onChange={(e) => set("genre", e.target.value)}
          className={selectClass}
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          value={filters.year}
          onChange={(e) => set("year", e.target.value)}
          className={selectClass}
        >
          <option value="">All Years</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={filters.rating}
          onChange={(e) => set("rating", e.target.value)}
          className={selectClass}
        >
          <option value="">All Ratings</option>
          {["9", "8", "7", "6"].map((r) => (
            <option key={r} value={r}>
              {r}+
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => set("sortBy", e.target.value)}
          className={selectClass}
        >
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc">Rating</option>
          <option value="release_date.desc">Release Date</option>
          <option value="title.asc">Title A–Z</option>
        </select>

        {hasFilters && (
          <button
            onClick={() =>
              setFilters((prev) => ({ ...DEFAULT, query: prev.query }))
            }
            className="text-sm text-blue-600 hover:text-blue-700 font-medium px-1"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Grid */}
      <MovieGrid
        movies={data?.results}
        isLoading={isLoading}
        isError={isError}
        emptyMessage={`No results for "${filters.query}"`}
      />

      {/* Pagination */}
      {data && data.total_pages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-4 py-2 text-sm border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-100 transition"
          >
            Previous
          </button>
          <span className="text-sm text-slate-400">
            Page {page} of {Math.min(data.total_pages, 500)}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= data.total_pages}
            className="px-4 py-2 text-sm border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-100 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
