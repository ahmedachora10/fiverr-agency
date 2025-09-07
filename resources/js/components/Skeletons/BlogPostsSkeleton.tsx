import { Skeleton } from "@/components/ui/skeleton";

export function BlogPostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
      {[...Array(6)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-2 w-12 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2 w-16" />
            </div>
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="ml-3 h-9 w-16 rounded-md" />
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <Skeleton className="h-5 w-48" />
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-9 w-9 rounded-none first:rounded-l-md last:rounded-r-md" />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
