import { Skeleton } from "./ui/skeleton";

function MenuItemSkeleton() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-4">
        <div className="flex space-x-4">
          <Skeleton className="w-20 h-20 rounded-xl flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="w-6 h-6 rounded-full ml-2" />
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="space-y-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-10 w-20 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-4">
        <Skeleton className="h-12 w-full rounded-2xl" />
        <div className="flex space-x-3 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full flex-shrink-0" />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-32" />
        <div className="flex space-x-3 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-48 rounded-xl flex-shrink-0" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <MenuItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}