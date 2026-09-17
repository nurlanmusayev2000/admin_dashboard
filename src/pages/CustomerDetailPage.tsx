import { useNavigate, useParams } from 'react-router-dom';

import { FiArrowLeft, FiMail, FiPhone } from 'react-icons/fi';

import { ErrorMessage } from '@/components/common/ErrorMessage';
import { FullPageSpinner } from '@/components/common/Spinner';
import { OrderStatusBadge } from '@/components/common/StatusBadge';
import { useGetCustomerByIdQuery } from '@/services/api/customersApi';
import { useGetOrdersByCustomerQuery } from '@/services/api/ordersApi';
import { formatCurrency, formatDate } from '@/utils/formatters';

export function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: customer,
    isLoading,
    error,
  } = useGetCustomerByIdQuery(id ?? '', { skip: !id });
  const { data: orders } = useGetOrdersByCustomerQuery(id ?? '', {
    skip: !id,
  });

  if (isLoading) return <FullPageSpinner />;
  if (error || !customer) {
    return <ErrorMessage message="Customer not found." />;
  }

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => navigate('/customers')}
        className="flex w-fit items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
      >
        <FiArrowLeft size={16} />
        Back to customers
      </button>

      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {customer.name}
        </h1>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <FiMail size={14} /> {customer.email}
          </span>
          <span className="flex items-center gap-1.5">
            <FiPhone size={14} /> {customer.phone}
          </span>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase text-gray-400">Total Orders</dt>
            <dd className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {customer.totalOrders}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-gray-400">Total Spent</dt>
            <dd className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(customer.totalSpent)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-gray-400">Customer Since</dt>
            <dd className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatDate(customer.joinedAt)}
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Order History
        </h2>
        {orders && orders.length > 0 ? (
          <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                    Order #
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                    Total
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="cursor-pointer border-b border-gray-100 last:border-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/60"
                  >
                    <td className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-4 py-2">
                      <OrderStatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            This customer has not placed any orders yet.
          </p>
        )}
      </div>
    </div>
  );
}
