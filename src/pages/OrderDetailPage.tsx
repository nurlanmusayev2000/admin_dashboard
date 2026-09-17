import { useNavigate, useParams } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Select } from '@/components/common/Select';
import { FullPageSpinner } from '@/components/common/Spinner';
import { OrderStatusBadge } from '@/components/common/StatusBadge';
import { useToast } from '@/hooks/useToast';
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from '@/services/api/ordersApi';
import type { OrderStatus } from '@/types';
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from '@/utils/constants';
import { formatCurrency, formatDate } from '@/utils/formatters';

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    data: order,
    isLoading,
    error,
  } = useGetOrderByIdQuery(id ?? '', { skip: !id });
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  if (isLoading) return <FullPageSpinner />;
  if (error || !order) {
    return <ErrorMessage message="Order not found." />;
  }

  const handleStatusChange = async (status: OrderStatus) => {
    try {
      await updateStatus({ id: order.id, status }).unwrap();
      showToast(`Order ${order.orderNumber} marked as ${status}`, 'success');
    } catch {
      showToast('Failed to update order status', 'error');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => navigate('/orders')}
        className="flex w-fit items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
      >
        <FiArrowLeft size={16} />
        Back to orders
      </button>

      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {order.orderNumber}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Placed on {formatDate(order.date)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <OrderStatusBadge status={order.status} />
            <Select
              aria-label="Update order status"
              value={order.status}
              disabled={isUpdating}
              onChange={(e) =>
                handleStatusChange(e.target.value as OrderStatus)
              }
              className="w-40"
            >
              {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {ORDER_STATUS_LABELS[status]}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase text-gray-400">Customer</dt>
            <dd className="text-gray-900 dark:text-gray-100">
              {order.customer}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-gray-400">Total</dt>
            <dd className="font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(order.total)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-gray-400">Items</dt>
            <dd className="text-gray-900 dark:text-gray-100">
              {order.items.length}
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Items
        </h2>
        <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                  Product
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                  Price
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr
                  key={item.productId}
                  onClick={() => navigate(`/products/${item.productId}`)}
                  className="cursor-pointer border-b border-gray-100 last:border-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/60"
                >
                  <td className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">
                    {item.productName}
                  </td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                    {formatCurrency(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
