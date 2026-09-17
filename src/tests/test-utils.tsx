import type { ReactElement, ReactNode } from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { baseApi } from '@/services/api/baseApi';
import authReducer from '@/store/slices/authSlice';
import filterReducer from '@/store/slices/filterSlice';
import uiReducer from '@/store/slices/uiSlice';

export function createTestStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
      filter: filterReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
}

export function renderWithProviders(
  ui: ReactElement,
  { route = '/' }: { route?: string } = {},
) {
  const store = createTestStore();

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
