import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToast, removeToast } from '@/store/slices/uiSlice';
import type { ToastType } from '@/store/slices/uiSlice';

export function useToast() {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state) => state.ui.toasts);

  const showToast = useCallback(
    (message: string, type: ToastType = 'info') => {
      dispatch(addToast(message, type));
    },
    [dispatch],
  );

  const dismissToast = useCallback(
    (id: string) => {
      dispatch(removeToast(id));
    },
    [dispatch],
  );

  return { toasts, showToast, dismissToast };
}
