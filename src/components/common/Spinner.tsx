import { clsx } from 'clsx';

interface SpinnerProps {
  size?: number;
  className?: string;
}

export function Spinner({ size = 24, className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={clsx(
        'inline-block animate-spin rounded-full border-2 border-primary-500 border-t-transparent',
        className,
      )}
      style={{ width: size, height: size }}
    />
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <Spinner size={32} />
    </div>
  );
}
