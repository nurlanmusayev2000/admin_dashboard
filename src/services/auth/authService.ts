import type { AuthUser, LoginCredentials } from '@/types';

const DEMO_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123',
};

/** Builds an unsigned, JWT-shaped token so the app can demo token-based auth against a mock backend. */
function createMockToken(user: AuthUser): string {
  const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({ ...user, iat: Date.now(), exp: Date.now() + 86_400_000 }),
  );
  return `${header}.${payload}.mock-signature`;
}

export async function login(
  credentials: LoginCredentials,
): Promise<{ user: AuthUser; token: string }> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (
    credentials.email !== DEMO_CREDENTIALS.email ||
    credentials.password !== DEMO_CREDENTIALS.password
  ) {
    throw new Error('Invalid email or password');
  }

  const user: AuthUser = {
    id: '1',
    email: credentials.email,
    name: 'Admin User',
  };

  return { user, token: createMockToken(user) };
}
