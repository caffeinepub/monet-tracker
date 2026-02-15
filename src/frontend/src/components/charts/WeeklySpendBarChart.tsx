import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/expenseMapping';
import { getDayLabels } from '@/utils/dateRanges';

type DailyData = {
  date: string;
  total: bigint;
};

type WeeklySpendBarChartProps = {
  data: DailyData[];
  dateRange: { start: string; end: string };
};

export function WeeklySpendBarChart({ data, dateRange }: WeeklySpendBarChartProps) {
  const dayLabels = getDayLabels(dateRange.start, dateRange.end);
  
  const chartData = dayLabels.map((day) => {
    const dayData = data.find((d) => d.date === day.date);
    return {
      name: day.label,
      amount: dayData ? Number(dayData.total) / 100 : 0,
    };
  });

  const isEmpty = chartData.every((d) => d.amount === 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Spending</CardTitle>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">No expenses recorded this week</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="amount" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
