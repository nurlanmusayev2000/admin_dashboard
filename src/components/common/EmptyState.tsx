import { FiInbox } from 'react-icons/fi';

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-12 text-center text-gray-400 dark:text-gray-500">
      <FiInbox size={32} />
      <p className="text-sm">{message}</p>
    </div>
  );
}
