import { useNavigate } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import SearchBar from "../components/ui/SearchBar";
import MovieSection from "../components/movie/MovieSection";
import { useNowPlaying, usePopular, useTopRated } from "../hooks/useMovies";

export default function HomePage() {
  const navigate = useNavigate();
  const nowPlaying = useNowPlaying();
  const popular = usePopular();
  const topRated = useTopRated();

  return (
    <div className="px-8 py-6 flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <SearchBar
          value=""
          onChange={(q) => q && navigate(`/search?q=${encodeURIComponent(q)}`)}
        />
        <button
          onClick={() => navigate("/search")}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-bold">Discover Movies</h1>
        <p className="text-sm text-slate-500 mt-1">
          Find and explore your next favorite movie.
        </p>
      </div>

      <MovieSection
        title="Now Playing"
        movies={nowPlaying.data?.results}
        isLoading={nowPlaying.isLoading}
        isError={nowPlaying.isError}
        viewAllTo="/search"
      />
      <MovieSection
        title="Popular Movies"
        movies={popular.data?.results}
        isLoading={popular.isLoading}
        isError={popular.isError}
        viewAllTo="/popular"
      />
      <MovieSection
        title="Top Rated"
        movies={topRated.data?.results}
        isLoading={topRated.isLoading}
        isError={topRated.isError}
        viewAllTo="/top-rated"
      />
    </div>
  );
}
