import { useState } from "react";
import { usePopular, useTopRated, useUpcoming } from "../hooks/useMovies";
import MovieGrid from "../components/movie/MovieGrid";

type ListType = "popular" | "top-rated" | "upcoming";

const META = {
  popular: {
    title: "Popular Movies",
    subtitle: "What everyone is watching right now.",
  },
  "top-rated": {
    title: "Top Rated",
    subtitle: "The highest-rated movies of all time.",
  },
  upcoming: {
    title: "Upcoming",
    subtitle: "Coming soon to a theater near you.",
  },
};

export default function ListPage({ type }: { type: ListType }) {
  const [page, setPage] = useState(1);
  const popular = usePopular(type === "popular" ? page : 0);
  const topRated = useTopRated(type === "top-rated" ? page : 0);
  const upcoming = useUpcoming(type === "upcoming" ? page : 0);

  const { data, isLoading, isError } =
    type === "popular" ? popular : type === "top-rated" ? topRated : upcoming;
  const { title, subtitle } = META[type];

  return (
    <div className="px-8 py-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      </div>
      <MovieGrid
        movies={data?.results}
        isLoading={isLoading}
        isError={isError}
      />
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
            Page {page} of {data.total_pages}
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
