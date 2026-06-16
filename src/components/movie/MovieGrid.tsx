import type { Movie } from "../../types";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton.tsx";

interface Props {
  movies?: Movie[];
  isLoading: boolean;
  isError: boolean;
  emptyMessage?: string;
}

export default function MovieGrid({
  movies,
  isLoading,
  isError,
  emptyMessage = "No movies found.",
}: Props) {
  const grid =
    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3";

  if (isLoading)
    return (
      <div className={grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );

  if (isError)
    return (
      <div className="py-16 text-center text-slate-400">
        <p className="font-medium">Something went wrong</p>
        <p className="text-sm mt-1">Check your API key and try again.</p>
      </div>
    );

  if (!movies?.length)
    return (
      <div className="py-16 text-center text-slate-400">
        <p className="font-medium">{emptyMessage}</p>
      </div>
    );

  return (
    <div className={grid}>
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
}
