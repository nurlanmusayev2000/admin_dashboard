import type { IconType } from 'react-icons';

interface StatCardProps {
  readonly label: string;
  readonly value: string;
  readonly icon: IconType;
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
          <Icon size={20} />
        </span>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
      <p
        className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </p>
    </div>
  );
}
