import { describe, expect, it } from 'vitest';

import { formatCurrency, formatDate, formatNumber } from './formatters';

describe('formatCurrency', () => {
  it('formats a number as USD currency', () => {
    expect(formatCurrency(1299.99)).toBe('$1,299.99');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
});

describe('formatNumber', () => {
  it('adds thousands separators', () => {
    expect(formatNumber(12345)).toBe('12,345');
  });
});

describe('formatDate', () => {
  it('formats an ISO date string', () => {
    expect(formatDate('2024-01-15T00:00:00.000Z')).toBe('Jan 15, 2024');
  });

  it('falls back to the raw value for invalid input', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });
});
