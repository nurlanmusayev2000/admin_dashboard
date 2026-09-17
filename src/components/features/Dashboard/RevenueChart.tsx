import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { MonthlyRevenue } from '@/services/api/dashboardApi';
import { formatCurrency } from '@/utils/formatters';

interface RevenueChartProps {
  readonly data: MonthlyRevenue[];
}

function formatMonth(month: string): string {
  const [year, monthNum] = month.split('-');
  return new Date(Number(year), Number(monthNum) - 1).toLocaleDateString(
    'en-US',
    { month: 'short' },
  );
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
        Revenue Trend
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ left: -12 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--chart-grid)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tickFormatter={formatMonth}
            stroke="var(--chart-muted)"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'var(--chart-baseline)' }}
          />
          <YAxis
            stroke="var(--chart-muted)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => formatCurrency(value)}
            width={80}
          />
          <Tooltip
            formatter={(value) => formatCurrency(Number(value))}
            labelFormatter={(label) => formatMonth(String(label))}
            contentStyle={{
              background: 'var(--chart-surface)',
              border: '1px solid var(--chart-grid)',
              borderRadius: 6,
              fontSize: 13,
              color: 'var(--chart-text-primary)',
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--chart-sequential)"
            strokeWidth={2}
            dot={{ r: 4, fill: 'var(--chart-sequential)' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
