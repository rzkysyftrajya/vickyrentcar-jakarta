import { Skeleton } from "./Skeleton";
import { Skeleton } from "./skeleton";

/**
 * Skeleton placeholder for a vehicle card (used in /armada listing).
 */
export function VehicleCardSkeleton() {
  return (
    <div className="glass rounded-xl p-6 flex flex-col gap-4 border border-gold/10">
      {/* Image placeholder */}
      <Skeleton className="h-36 w-full rounded-lg bg-white/5" />
      {/* Badge row */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      {/* Title */}
      <Skeleton className="h-7 w-3/4 rounded" />
      {/* Tagline */}
      <Skeleton className="h-4 w-1/2 rounded" />
      {/* Specs grid */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        <Skeleton className="h-12 rounded-lg" />
        <Skeleton className="h-12 rounded-lg" />
        <Skeleton className="h-12 rounded-lg" />
        <Skeleton className="h-12 rounded-lg" />
      </div>
      {/* CTA buttons */}
      <div className="flex gap-3 mt-2">
        <Skeleton className="h-10 flex-1 rounded-full" />
        <Skeleton className="h-10 flex-1 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Grid of vehicle card skeletons for the /armada page.
 */
export function VehicleGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <VehicleCardSkeleton key={i} />
      ))}
    </div>
  );
}
