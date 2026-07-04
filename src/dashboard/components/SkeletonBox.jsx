/** Skeleton that matches the StatCard grid layout */
const SkeletonBox = ({ count = 7 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="rounded-xl border border-gray-100 bg-gray-50 p-5 flex items-center gap-4 animate-pulse"
      >
        <div className="w-11 h-11 rounded-xl bg-gray-200 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-10 bg-gray-200 rounded" />
          <div className="h-2.5 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonBox;
