import { FiBox, FiDollarSign, FiShoppingCart, FiUsers } from 'react-icons/fi';

import { CardSkeleton } from '@/components/common/Skeletons/CardSkeleton';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { OrderStatusChart } from '@/components/features/Dashboard/OrderStatusChart';
import { RecentOrdersTable } from '@/components/features/Dashboard/RecentOrdersTable';
import { RevenueChart } from '@/components/features/Dashboard/RevenueChart';
import { StatCard } from '@/components/features/Dashboard/StatCard';
import { TopProductsChart } from '@/components/features/Dashboard/TopProductsChart';
import { useAuth } from '@/hooks/useAuth';
import { useGetDashboardStatsQuery } from '@/services/api/dashboardApi';
import { formatCurrency, formatNumber } from '@/utils/formatters';

export function DashboardPage() {
  const { user } = useAuth();
  const { data: stats, isLoading, error } = useGetDashboardStatsQuery();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back{user ? `, ${user.name}` : ''}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {error && <ErrorMessage message="Failed to load dashboard stats." />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading || !stats ? (
          <CardSkeleton count={4} />
        ) : (
          <>
            <StatCard
              label="Total Products"
              value={formatNumber(stats.totalProducts)}
              icon={FiBox}
            />
            <StatCard
              label="Total Orders"
              value={formatNumber(stats.totalOrders)}
              icon={FiShoppingCart}
            />
            <StatCard
              label="Total Revenue"
              value={formatCurrency(stats.totalRevenue)}
              icon={FiDollarSign}
            />
            <StatCard
              label="Active Customers"
              value={formatNumber(stats.activeCustomers)}
              icon={FiUsers}
            />
          </>
        )}
      </div>

      {stats && (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <RevenueChart data={stats.monthlyRevenue} />
            <OrderStatusChart data={stats.orderStatusBreakdown} />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <RecentOrdersTable orders={stats.recentOrders} />
            <TopProductsChart data={stats.topProducts} />
          </div>
        </>
      )}
    </div>
  );
}
