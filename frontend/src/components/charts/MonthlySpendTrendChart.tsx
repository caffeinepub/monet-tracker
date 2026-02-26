import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { format } from 'date-fns';

type DailyData = {
  date: string;
  total: bigint;
};

type MonthlySpendTrendChartProps = {
  data: DailyData[];
  dateRange: { start: string; end: string };
};

export function MonthlySpendTrendChart({ data, dateRange }: MonthlySpendTrendChartProps) {
  const chartData = data
    .map((d) => ({
      date: d.date,
      name: format(new Date(d.date), 'MMM d'),
      amount: Number(d.total) / 100,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const isEmpty = chartData.length === 0;

  return (
    <Card className="rounded-xl border border-border shadow-card bg-white">
      <CardHeader className="px-5 pt-5 pb-2">
        <CardTitle className="text-base font-semibold">Spending Trend</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        {isEmpty ? (
          <div className="h-[280px] flex items-center justify-center">
            <p className="text-muted-foreground text-sm">No expenses recorded this month</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(59,130,246,0.1)',
                  fontSize: '13px',
                }}
                cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#blueGradient)"
                dot={{ fill: '#3b82f6', r: 4, strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 6, fill: '#3b82f6', stroke: '#ffffff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
