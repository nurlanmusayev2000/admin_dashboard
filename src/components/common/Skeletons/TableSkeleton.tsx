interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 5 }: TableSkeletonProps) {
  return (
    <div className="animate-pulse overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
      <div className="flex gap-4 border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="h-4 flex-1 rounded bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 border-b border-gray-100 p-4 last:border-0 dark:border-gray-800"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-4 flex-1 rounded bg-gray-100 dark:bg-gray-800"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
