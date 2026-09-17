import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface UiState {
  darkMode: boolean;
  sidebarOpen: boolean;
  toasts: Toast[];
}

function loadPersistedDarkMode(): boolean {
  try {
    const stored = localStorage.getItem('admin_dashboard_dark_mode');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

const initialState: UiState = {
  darkMode: loadPersistedDarkMode(),
  sidebarOpen: false,
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      try {
        localStorage.setItem(
          'admin_dashboard_dark_mode',
          String(state.darkMode),
        );
      } catch {
        // ignore write failures (e.g. private browsing)
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    addToast: {
      reducer: (state, action: PayloadAction<Toast>) => {
        state.toasts.push(action.payload);
      },
      prepare: (message: string, type: ToastType = 'info') => ({
        payload: { id: nanoid(), message, type },
      }),
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  toggleDarkMode,
  toggleSidebar,
  setSidebarOpen,
  addToast,
  removeToast,
} = uiSlice.actions;
export default uiSlice.reducer;
