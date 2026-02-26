import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
    <Card className="rounded-xl border border-border shadow-card bg-white">
      <CardHeader className="px-5 pt-5 pb-2">
        <CardTitle className="text-base font-semibold">Daily Spending</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        {isEmpty ? (
          <div className="h-[280px] flex items-center justify-center">
            <p className="text-muted-foreground text-sm">No expenses recorded this week</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
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
                cursor={{ fill: 'rgba(59,130,246,0.05)' }}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
