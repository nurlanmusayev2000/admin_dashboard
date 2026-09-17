import { OrderFilters } from '@/components/features/Orders/OrderFilters';
import { OrderTable } from '@/components/features/Orders/OrderTable';

export function OrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Orders
      </h1>
      <OrderFilters />
      <OrderTable />
    </div>
  );
}
