import { CustomerTable } from '@/components/features/Customers/CustomerTable';

export function CustomersPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Customers
      </h1>
      <CustomerTable />
    </div>
  );
}
