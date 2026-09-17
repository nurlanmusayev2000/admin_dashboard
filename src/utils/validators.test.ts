import { describe, expect, it } from 'vitest';

import { isValidEmail } from './validators';

describe('isValidEmail', () => {
  it('accepts a well-formed email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  it('rejects a string with no @', () => {
    expect(isValidEmail('test.example.com')).toBe(false);
  });

  it('rejects a string with no domain', () => {
    expect(isValidEmail('test@')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });
});
