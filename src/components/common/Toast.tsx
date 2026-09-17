import { useEffect } from 'react';

import { clsx } from 'clsx';
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiX,
} from 'react-icons/fi';

import { useToast } from '@/hooks/useToast';
import type { Toast as ToastData, ToastType } from '@/store/slices/uiSlice';

const TOAST_ICONS: Record<ToastType, typeof FiInfo> = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  warning: FiAlertTriangle,
  info: FiInfo,
};

const TOAST_CLASSES: Record<ToastType, string> = {
  success:
    'bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-900',
  error:
    'bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900',
  warning:
    'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900',
  info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900',
};

const AUTO_DISMISS_MS = 5000;

function ToastItem({ toast }: { toast: ToastData }) {
  const { dismissToast } = useToast();
  const Icon = TOAST_ICONS[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => dismissToast(toast.id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [toast.id, dismissToast]);

  return (
    <div
      role="alert"
      className={clsx(
        'flex items-start gap-3 rounded-md border p-4 shadow-lg',
        TOAST_CLASSES[toast.type],
      )}
    >
      <Icon size={20} className="mt-0.5 shrink-0" />
      <p className="flex-1 text-sm">{toast.message}</p>
      <button
        type="button"
        onClick={() => dismissToast(toast.id)}
        aria-label="Dismiss notification"
        className="shrink-0 opacity-70 hover:opacity-100"
      >
        <FiX size={16} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
