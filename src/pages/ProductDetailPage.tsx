import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FiArrowLeft, FiEdit2 } from 'react-icons/fi';

import { Button } from '@/components/common/Button';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { FullPageSpinner } from '@/components/common/Spinner';
import { ProductStatusBadge } from '@/components/common/StatusBadge';
import { ProductForm } from '@/components/features/Products/ProductForm';
import { useGetOrdersByProductQuery } from '@/services/api/ordersApi';
import { useGetProductByIdQuery } from '@/services/api/productsApi';
import { formatCurrency, formatDate } from '@/utils/formatters';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(id ?? '', { skip: !id });
  const { data: relatedOrders } = useGetOrdersByProductQuery(id ?? '', {
    skip: !id,
  });

  if (isLoading) return <FullPageSpinner />;
  if (error || !product) {
    return <ErrorMessage message="Product not found." />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <FiArrowLeft size={16} />
          Back to products
        </button>
        <Button onClick={() => setIsEditing(true)}>
          <FiEdit2 size={16} />
          Edit
        </Button>
      </div>

      <div className="grid gap-6 rounded-lg border border-gray-200 bg-white p-6 sm:grid-cols-[200px_1fr] dark:border-gray-700 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full rounded-md object-cover"
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {product.name}
            </h1>
            <ProductStatusBadge status={product.status} />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {product.category} · Added {formatDate(product.createdAt)}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {product.description}
          </p>
          <div className="mt-2 flex gap-6">
            <div>
              <p className="text-xs uppercase text-gray-400">Price</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {formatCurrency(product.price)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-400">Stock</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {product.stock}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Sales History
        </h2>
        {relatedOrders && relatedOrders.length > 0 ? (
          <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                    Order #
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                    Customer
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {relatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="cursor-pointer border-b border-gray-100 last:border-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/60"
                  >
                    <td className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                      {order.customer}
                    </td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            No orders have included this product yet.
          </p>
        )}
      </div>

      <ProductForm
        isOpen={isEditing}
        product={product}
        onClose={() => setIsEditing(false)}
      />
    </div>
  );
}
