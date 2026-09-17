import { FiAlertTriangle } from 'react-icons/fi';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950">
      <FiAlertTriangle className="text-red-500" size={24} />
      <p className="text-sm text-red-700 dark:text-red-300">{message}</p>
    </div>
  );
}
