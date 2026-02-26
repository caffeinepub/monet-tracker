import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TotalsCards } from '@/components/dashboard/TotalsCards';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { WeeklySpendBarChart } from '@/components/charts/WeeklySpendBarChart';
import { MonthlySpendTrendChart } from '@/components/charts/MonthlySpendTrendChart';
import { useExpenses } from '@/hooks/useExpenses';
import { filterExpensesByTimeWindow, getWeekRange, getMonthRange } from '@/utils/dateRanges';
import { aggregateByDay, aggregateByCategory } from '@/utils/aggregations';

export default function DashboardScreen() {
  const [timeWindow, setTimeWindow] = useState<'week' | 'month'>('week');
  const { data: expenses = [], isLoading } = useExpenses();

  const filteredExpenses = filterExpensesByTimeWindow(expenses, timeWindow);
  const dailyData = aggregateByDay(filteredExpenses);
  const categoryData = aggregateByCategory(filteredExpenses);
  
  const dateRange = timeWindow === 'week' 
    ? getWeekRange(new Date()) 
    : getMonthRange(new Date());

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-foreground mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Track your spending patterns and manage your budget
        </p>
      </div>

      <Tabs value={timeWindow} onValueChange={(v) => setTimeWindow(v as 'week' | 'month')}>
        <TabsList className="grid w-full max-w-xs grid-cols-2 rounded-xl bg-muted p-1">
          <TabsTrigger value="week" className="rounded-lg text-sm font-medium">This Week</TabsTrigger>
          <TabsTrigger value="month" className="rounded-lg text-sm font-medium">This Month</TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="space-y-4 mt-5">
          <TotalsCards expenses={filteredExpenses} isLoading={isLoading} />
          <WeeklySpendBarChart data={dailyData} dateRange={dateRange} />
          <CategoryBreakdown data={categoryData} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="month" className="space-y-4 mt-5">
          <TotalsCards expenses={filteredExpenses} isLoading={isLoading} />
          <MonthlySpendTrendChart data={dailyData} dateRange={dateRange} />
          <CategoryBreakdown data={categoryData} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
