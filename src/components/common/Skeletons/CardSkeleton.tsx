interface CardSkeletonProps {
  count?: number;
}

export function CardSkeleton({ count = 1 }: CardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-4 h-8 w-32 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-2 h-3 w-20 rounded bg-gray-100 dark:bg-gray-800" />
        </div>
      ))}
    </>
  );
}
