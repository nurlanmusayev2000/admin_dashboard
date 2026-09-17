import { format, parseISO } from 'date-fns';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatDate(value: string, pattern = 'MMM d, yyyy'): string {
  try {
    return format(parseISO(value), pattern);
  } catch {
    return value;
  }
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
