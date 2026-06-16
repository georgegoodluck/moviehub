export default function MovieCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-slate-200 animate-pulse">
      <div className="aspect-[2/3] bg-slate-200" />
      <div className="p-2.5 flex flex-col gap-2">
        <div className="h-3.5 bg-slate-200 rounded w-4/5" />
        <div className="h-3 bg-slate-200 rounded w-1/3" />
      </div>
    </div>
  );
}
