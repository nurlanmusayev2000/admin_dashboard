import { clsx } from 'clsx';

import type { OrderStatus, ProductStatus } from '@/types';
import { ORDER_STATUS_LABELS } from '@/utils/constants';

const PRODUCT_STATUS_CLASSES: Record<ProductStatus, string> = {
  active:
    'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  inactive: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

const ORDER_STATUS_CLASSES: Record<OrderStatus, string> = {
  pending:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  processing:
    'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  shipped:
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
  delivered:
    'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

function Badge({
  className,
  children,
}: {
  className: string;
  children: string;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  return <Badge className={PRODUCT_STATUS_CLASSES[status]}>{status}</Badge>;
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge className={ORDER_STATUS_CLASSES[status]}>
      {ORDER_STATUS_LABELS[status]}
    </Badge>
  );
}
