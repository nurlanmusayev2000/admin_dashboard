import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login as loginRequest } from '@/services/auth/authService';
import { logout as logoutAction, setCredentials } from '@/store/slices/authSlice';
import type { LoginCredentials } from '@/types';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const { user: authUser, token: authToken } =
        await loginRequest(credentials);
      dispatch(
        setCredentials({
          user: authUser,
          token: authToken,
          rememberMe: credentials.rememberMe,
        }),
      );
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return { user, token, isAuthenticated: Boolean(token), login, logout };
}
