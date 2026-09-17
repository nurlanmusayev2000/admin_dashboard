import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { AuthState, AuthUser } from '@/types';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '@/utils/constants';

function loadPersistedAuth(): AuthState {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const rawUser = localStorage.getItem(AUTH_USER_KEY);
    if (!token || !rawUser) return { user: null, token: null };
    return { user: JSON.parse(rawUser) as AuthUser, token };
  } catch {
    return { user: null, token: null };
  }
}

const initialState: AuthState = loadPersistedAuth();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthUser;
        token: string;
        rememberMe: boolean;
      }>,
    ) => {
      const { user, token, rememberMe } = action.payload;
      state.user = user;
      state.token = token;

      if (rememberMe) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
