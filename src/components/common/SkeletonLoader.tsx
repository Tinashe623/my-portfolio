"use client";

interface SkeletonLoaderProps {
  type?: "card" | "list" | "table";
  count?: number;
}

export default function SkeletonLoader({ type = "card", count = 3 }: SkeletonLoaderProps) {
  if (type === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="glass-card p-6 animate-pulse">
            <div className="h-4 bg-dark-700 rounded w-3/4 mb-4" />
            <div className="h-3 bg-dark-700 rounded w-full mb-2" />
            <div className="h-3 bg-dark-700 rounded w-5/6 mb-4" />
            <div className="flex gap-2">
              <div className="h-8 bg-dark-700 rounded w-20" />
              <div className="h-8 bg-dark-700 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="glass-card p-6 animate-pulse">
            <div className="flex items-start justify-between">
              <div className="flex-grow">
                <div className="h-5 bg-dark-700 rounded w-1/2 mb-3" />
                <div className="h-4 bg-dark-700 rounded w-full mb-2" />
                <div className="h-4 bg-dark-700 rounded w-4/5" />
              </div>
              <div className="h-8 bg-dark-700 rounded w-16 ml-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="glass-card p-4 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-dark-700 rounded-full flex-shrink-0" />
              <div className="flex-grow">
                <div className="h-4 bg-dark-700 rounded w-1/3 mb-2" />
                <div className="h-3 bg-dark-700 rounded w-1/2" />
              </div>
              <div className="h-8 bg-dark-700 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
