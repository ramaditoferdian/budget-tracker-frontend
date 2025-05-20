import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const TransactionsPageSkeleton = () => {
  return (
    <div className="flex flex-col px-4 py-4 h-full">
      {/* Header Skeleton */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 w-full">
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-9 w-24" />
      </div>

      {/* Transaction List Skeleton */}
      <div className="flex-1 mt-4 overflow-y-auto min-h-[300px] h-full pr-5 space-y-3">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-24" />
              </div>
            </Card>
          ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="pt-4 flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <div className="flex space-x-1">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPageSkeleton;
