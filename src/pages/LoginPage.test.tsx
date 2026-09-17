import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/test-utils';

import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  it('shows validation errors when submitted empty', async () => {
    renderWithProviders(<LoginPage />);

    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('rejects a malformed email', async () => {
    renderWithProviders(<LoginPage />);

    await userEvent.type(screen.getByLabelText('Email'), 'not-an-email');
    await userEvent.type(screen.getByLabelText('Password'), 'admin123');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(
      await screen.findByText('Enter a valid email address'),
    ).toBeInTheDocument();
  });

  it('logs in with valid demo credentials', async () => {
    renderWithProviders(<LoginPage />);

    await userEvent.type(screen.getByLabelText('Email'), 'admin@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'admin123');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(
        screen.queryByText('Invalid email or password'),
      ).not.toBeInTheDocument();
    });
  });
});
