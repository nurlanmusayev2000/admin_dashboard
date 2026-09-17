import { useNavigate } from 'react-router-dom';

import { OrderStatusBadge } from '@/components/common/StatusBadge';
import type { Order } from '@/types';
import { formatCurrency, formatDate } from '@/utils/formatters';

interface RecentOrdersTableProps {
  readonly orders: Order[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
        Recent Orders
      </h2>
      {orders.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">
          No orders yet.
        </p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="cursor-pointer border-b border-gray-100 last:border-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/60"
              >
                <td className="py-2.5 font-medium text-gray-900 dark:text-gray-100">
                  {order.orderNumber}
                </td>
                <td className="py-2.5 text-gray-600 dark:text-gray-300">
                  {order.customer}
                </td>
                <td className="py-2.5 text-gray-500 dark:text-gray-400">
                  {formatDate(order.date)}
                </td>
                <td className="py-2.5 text-right text-gray-600 dark:text-gray-300">
                  {formatCurrency(order.total)}
                </td>
                <td className="py-2.5 pl-4">
                  <OrderStatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
