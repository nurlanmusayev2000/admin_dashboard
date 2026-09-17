import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { TopProduct } from '@/services/api/dashboardApi';
import { formatCurrency } from '@/utils/formatters';

interface TopProductsChartProps {
  readonly data: TopProduct[];
}

export function TopProductsChart({ data }: TopProductsChartProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
        Top Products by Revenue
      </h2>
      {data.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">
          No sales data yet.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 8, right: 32 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--chart-grid)"
              horizontal={false}
            />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="productName"
              stroke="var(--chart-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={120}
            />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                background: 'var(--chart-surface)',
                border: '1px solid var(--chart-grid)',
                borderRadius: 6,
                fontSize: 13,
                color: 'var(--chart-text-primary)',
              }}
            />
            <Bar dataKey="revenue" radius={[0, 4, 4, 0]} maxBarSize={22}>
              {data.map((entry) => (
                <Cell key={entry.productId} fill="var(--chart-sequential)" />
              ))}
              <LabelList
                dataKey="revenue"
                position="right"
                formatter={(value) => formatCurrency(Number(value))}
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
