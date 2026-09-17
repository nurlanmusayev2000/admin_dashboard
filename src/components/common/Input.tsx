import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={clsx(
            'rounded-md border px-3 py-2 text-sm shadow-sm transition-colors',
            'bg-white text-gray-900 placeholder:text-gray-400 dark:bg-gray-800 dark:text-gray-100',
            'focus:outline-none focus:ring-2 focus:ring-primary-500',
            error
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-600',
            className,
          )}
          {...rest}
        />
        {error && (
          <p id={errorId} className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
