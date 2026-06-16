import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Heart } from "lucide-react";
import { useState } from "react";
import { useMovieDetails, useSimilarMovies } from "../hooks/useMovies";
import {
  getPosterUrl,
  getBackdropUrl,
  getReleaseYear,
  formatRuntime,
  formatMoney,
} from "../api/tmdb";
import MovieGrid from "../components/movie/MovieGrid";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [fav, setFav] = useState(false);

  const { data: movie, isLoading, isError } = useMovieDetails(Number(id));
  const { data: similar } = useSimilarMovies(Number(id));

  if (isLoading)
    return (
      <div className="p-8 animate-pulse flex flex-col gap-6">
        <div className="h-5 w-16 bg-slate-200 rounded" />
        <div className="flex gap-8">
          <div className="w-52 aspect-[2/3] bg-slate-200 rounded-xl shrink-0" />
          <div className="flex-1 flex flex-col gap-3 pt-2">
            <div className="h-8 bg-slate-200 rounded w-2/3" />
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-24 bg-slate-200 rounded mt-4" />
          </div>
        </div>
      </div>
    );

  if (isError || !movie)
    return (
      <div className="p-8 text-center text-slate-400">
        <p className="font-medium">Movie not found</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 text-sm mt-2 hover:underline"
        >
          Go back
        </button>
      </div>
    );

  const cast =
    movie.credits?.cast
      ?.slice(0, 5)
      .map((c) => c.name)
      .join(", ") ?? "N/A";

  const meta = [
    [
      "Release Date",
      movie.release_date
        ? new Date(movie.release_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A",
    ],
    ["Director", movie.director ?? "N/A"],
    ["Cast", cast],
    ["Language", movie.original_language?.toUpperCase() ?? "N/A"],
    ["Runtime", formatRuntime(movie.runtime ?? 0)],
    ...(movie.budget ? [["Budget", formatMoney(movie.budget)]] : []),
    ...(movie.revenue ? [["Revenue", formatMoney(movie.revenue)]] : []),
  ];

  return (
    <div>
      {/* Backdrop */}
      {movie.backdrop_path && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={getBackdropUrl(movie.backdrop_path)!}
            alt=""
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50" />
        </div>
      )}

      <div className="px-8 pb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition mt-4 mb-6"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex gap-8">
          {/* Poster */}
          <div className="shrink-0">
            {getPosterUrl(movie.poster_path, "w500") ? (
              <img
                src={getPosterUrl(movie.poster_path, "w500")!}
                alt={movie.title}
                className="w-52 rounded-xl shadow-md border border-slate-200"
              />
            ) : (
              <div className="w-52 aspect-[2/3] bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm border border-slate-200">
                No image
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-tight">{movie.title}</h1>
            <p className="text-sm text-slate-400 mt-1">
              {getReleaseYear(movie.release_date)} ·{" "}
              {formatRuntime(movie.runtime ?? 0)}
            </p>

            {/* Rating + Fav */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5">
                <Star size={18} fill="#F59E0B" stroke="#F59E0B" />
                <span className="text-lg font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-sm text-slate-400">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>
              <button
                onClick={() => setFav((f) => !f)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${fav ? "bg-red-50 text-red-500 border-red-200" : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"}`}
              >
                <Heart size={14} fill={fav ? "currentColor" : "none"} />
                {fav ? "Favorited" : "Add to Favorites"}
              </button>
            </div>

            {/* Overview */}
            {movie.overview && (
              <div className="mt-5">
                <h2 className="text-sm font-semibold mb-1.5">Overview</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {movie.overview}
                </p>
              </div>
            )}

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="mt-4">
                <h2 className="text-sm font-semibold mb-1.5">Genres</h2>
                <div className="flex flex-wrap gap-1.5">
                  {movie.genres.map((g) => (
                    <span
                      key={g.id}
                      className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-500 rounded-full border border-slate-200"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {meta.map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                    {label}
                  </p>
                  <p className="text-slate-700 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar */}
        {similar && similar.results.length > 0 && (
          <div className="mt-10">
            <h2 className="text-base font-semibold mb-4">Similar Movies</h2>
            <MovieGrid
              movies={similar.results.slice(0, 6)}
              isLoading={false}
              isError={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
