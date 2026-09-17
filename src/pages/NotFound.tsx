import { Link } from 'react-router-dom';

import { Button } from '@/components/common/Button';

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 text-center dark:bg-gray-900">
      <p className="text-6xl font-bold text-primary-600 dark:text-primary-400">
        404
      </p>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Page not found
      </h1>
      <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/dashboard">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
}
