interface FormSkeletonProps {
  fields?: number;
}

export function FormSkeleton({ fields = 4 }: FormSkeletonProps) {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-9 w-full rounded bg-gray-100 dark:bg-gray-800" />
        </div>
      ))}
    </div>
  );
}
