import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Movie } from "../../types";
import { getPosterUrl, getReleaseYear } from "../../api/tmdb";

export default function MovieCard({ movie }: { movie: Movie }) {
  const poster = getPosterUrl(movie.poster_path);
  const year = getReleaseYear(movie.release_date);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group flex flex-col rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative aspect-[2/3] bg-slate-100 overflow-hidden">
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
            No image
          </div>
        )}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 text-white text-xs font-semibold px-1.5 py-0.5 rounded-md">
          <Star size={10} fill="#F59E0B" stroke="#F59E0B" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
      <div className="p-2.5">
        <p className="text-sm font-semibold leading-snug line-clamp-2">
          {movie.title}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">{year}</p>
      </div>
    </Link>
  );
}
