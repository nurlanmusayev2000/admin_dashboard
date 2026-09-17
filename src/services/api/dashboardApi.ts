import type { Customer, Order, PaginatedResponse, Product } from '@/types';

import { baseApi } from './baseApi';

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  unitsSold: number;
  revenue: number;
}

export interface OrderStatusCount {
  status: Order['status'];
  count: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  activeCustomers: number;
  recentOrders: Order[];
  monthlyRevenue: MonthlyRevenue[];
  topProducts: TopProduct[];
  orderStatusBreakdown: OrderStatusCount[];
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      queryFn: async (_arg, _api, _extraOptions, baseQuery) => {
        const [productsResult, ordersResult, customersResult] =
          await Promise.all([
            baseQuery('/products?_page=1&_per_page=1'),
            baseQuery('/orders?_page=1&_per_page=1000&_sort=-date'),
            baseQuery('/customers?_page=1&_per_page=1000'),
          ]);

        if (productsResult.error) return { error: productsResult.error };
        if (ordersResult.error) return { error: ordersResult.error };
        if (customersResult.error) return { error: customersResult.error };

        const totalProducts = (
          productsResult.data as PaginatedResponse<Product>
        ).items;
        const orders = (ordersResult.data as PaginatedResponse<Order>).data;
        const customers = (customersResult.data as PaginatedResponse<Customer>)
          .data;

        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const activeCustomers = customers.filter(
          (c) => c.totalOrders > 0,
        ).length;

        const monthlyTotals = new Map<string, number>();
        for (const order of orders) {
          const month = order.date.slice(0, 7);
          monthlyTotals.set(month, (monthlyTotals.get(month) ?? 0) + order.total);
        }
        const monthlyRevenue: MonthlyRevenue[] = Array.from(
          monthlyTotals.entries(),
        )
          .sort(([a], [b]) => a.localeCompare(b))
          .slice(-6)
          .map(([month, revenue]) => ({ month, revenue }));

        const productTotals = new Map<string, TopProduct>();
        for (const order of orders) {
          for (const item of order.items) {
            const existing = productTotals.get(item.productId);
            const revenue = item.price * item.quantity;
            if (existing) {
              existing.unitsSold += item.quantity;
              existing.revenue += revenue;
            } else {
              productTotals.set(item.productId, {
                productId: item.productId,
                productName: item.productName,
                unitsSold: item.quantity,
                revenue,
              });
            }
          }
        }
        const topProducts = Array.from(productTotals.values())
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5);

        const statusCounts = new Map<Order['status'], number>();
        for (const order of orders) {
          statusCounts.set(order.status, (statusCounts.get(order.status) ?? 0) + 1);
        }
        const orderStatusBreakdown: OrderStatusCount[] = Array.from(
          statusCounts.entries(),
        ).map(([status, count]) => ({ status, count }));

        const stats: DashboardStats = {
          totalProducts,
          totalOrders: orders.length,
          totalRevenue,
          activeCustomers,
          recentOrders: orders.slice(0, 5),
          monthlyRevenue,
          topProducts,
          orderStatusBreakdown,
        };

        return { data: stats };
      },
      providesTags: [
        { type: 'Product', id: 'LIST' },
        { type: 'Order', id: 'LIST' },
        { type: 'Customer', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
