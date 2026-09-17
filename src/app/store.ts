import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/services/api/baseApi';
import authReducer from '@/store/slices/authSlice';
import filterReducer from '@/store/slices/filterSlice';
import uiReducer from '@/store/slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    filter: filterReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
