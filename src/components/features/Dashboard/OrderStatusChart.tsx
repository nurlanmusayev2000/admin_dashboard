import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import type { OrderStatusCount } from '@/services/api/dashboardApi';
import { ORDER_STATUS_LABELS } from '@/utils/constants';

interface OrderStatusChartProps {
  readonly data: OrderStatusCount[];
}

const STATUS_COLOR_VAR: Record<OrderStatusCount['status'], string> = {
  pending: 'var(--series-4)',
  processing: 'var(--series-1)',
  shipped: 'var(--series-5)',
  delivered: 'var(--series-3)',
  cancelled: 'var(--series-2)',
};

export function OrderStatusChart({ data }: OrderStatusChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    label: ORDER_STATUS_LABELS[d.status],
  }));

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
        Orders by Status
      </h2>
      {chartData.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">
          No orders yet.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 8, right: 32 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="label"
              stroke="var(--chart-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={90}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={18}>
              {chartData.map((entry) => (
                <Cell key={entry.status} fill={STATUS_COLOR_VAR[entry.status]} />
              ))}
              <LabelList
                dataKey="count"
                position="right"
                fill="var(--chart-text-secondary)"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
