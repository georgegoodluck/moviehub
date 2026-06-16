import { Link } from "react-router-dom";
import type { Movie } from "../../types";
import MovieGrid from "./MovieGrid";

interface Props {
  title: string;
  movies?: Movie[];
  isLoading: boolean;
  isError: boolean;
  viewAllTo?: string;
}

export default function MovieSection({
  title,
  movies,
  isLoading,
  isError,
  viewAllTo,
}: Props) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold">{title}</h2>
        {viewAllTo && (
          <Link
            to={viewAllTo}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View all
          </Link>
        )}
      </div>
      <MovieGrid
        movies={movies?.slice(0, 6)}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  );
}
