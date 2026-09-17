import { forwardRef, useId } from 'react';
import type { SelectHTMLAttributes } from 'react';

import { clsx } from 'clsx';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, className, children, ...rest }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          aria-invalid={Boolean(error)}
          className={clsx(
            'rounded-md border px-3 py-2 text-sm shadow-sm transition-colors',
            'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100',
            'focus:outline-none focus:ring-2 focus:ring-primary-500',
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600',
            className,
          )}
          {...rest}
        >
          {children}
        </select>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
