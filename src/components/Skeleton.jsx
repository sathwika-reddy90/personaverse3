export function SkeletonBlock({ className = '' }) {
  return <div className={`skeleton-pulse rounded-2xl ${className}`} />;
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`rounded-3xl glass shadow-soft p-5 ${className}`}>
      <SkeletonBlock className="h-3 w-24 mb-4" />
      <SkeletonBlock className="h-5 w-3/4 mb-2.5" />
      <SkeletonBlock className="h-3 w-full mb-1.5" />
      <SkeletonBlock className="h-3 w-5/6" />
    </div>
  );
}

export function SkeletonRow({ className = '' }) {
  return (
    <div className={`rounded-2xl glass shadow-soft p-4 flex items-center gap-3 ${className}`}>
      <SkeletonBlock className="h-11 w-11 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBlock className="h-3 w-2/3" />
        <SkeletonBlock className="h-2.5 w-1/3" />
      </div>
    </div>
  );
}

export function SkeletonHero({ className = '' }) {
  return (
    <div className={`rounded-[2rem] skeleton-pulse p-6 ${className}`}>
      <div className="h-24 w-24 rounded-3xl bg-white/40 mb-5 mx-auto" />
      <SkeletonBlock className="h-3 w-32 mx-auto mb-3 bg-white/30" />
      <SkeletonBlock className="h-6 w-44 mx-auto mb-2 bg-white/30" />
      <SkeletonBlock className="h-3 w-full bg-white/20" />
    </div>
  );
}
