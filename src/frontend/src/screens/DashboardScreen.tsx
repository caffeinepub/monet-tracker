import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TotalsCards } from '@/components/dashboard/TotalsCards';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { WeeklySpendBarChart } from '@/components/charts/WeeklySpendBarChart';
import { MonthlySpendTrendChart } from '@/components/charts/MonthlySpendTrendChart';
import { useExpenses } from '@/hooks/useExpenses';
import { getWeekRange, getMonthRange } from '@/utils/dateRanges';
import { aggregateByDay, aggregateByCategory } from '@/utils/aggregations';

export default function DashboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');
  const { data: allExpenses, isLoading } = useExpenses();

  const weekRange = getWeekRange(new Date());
  const monthRange = getMonthRange(new Date());

  const weekExpenses = allExpenses?.filter(
    (exp) => exp.date >= weekRange.start && exp.date <= weekRange.end
  ) || [];

  const monthExpenses = allExpenses?.filter(
    (exp) => exp.date >= monthRange.start && exp.date <= monthRange.end
  ) || [];

  const currentExpenses = selectedPeriod === 'week' ? weekExpenses : monthExpenses;
  const dailyData = aggregateByDay(currentExpenses);
  const categoryData = aggregateByCategory(currentExpenses);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Track your spending and view insights
        </p>
      </div>

      <Tabs value={selectedPeriod} onValueChange={(v) => setSelectedPeriod(v as 'week' | 'month')}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="space-y-8 mt-8">
          <TotalsCards expenses={weekExpenses} isLoading={isLoading} />
          
          <div className="grid gap-8 md:grid-cols-2">
            <WeeklySpendBarChart data={dailyData} dateRange={weekRange} />
            <CategoryBreakdown data={categoryData} isLoading={isLoading} />
          </div>
        </TabsContent>

        <TabsContent value="month" className="space-y-8 mt-8">
          <TotalsCards expenses={monthExpenses} isLoading={isLoading} />
          
          <div className="grid gap-8 md:grid-cols-2">
            <MonthlySpendTrendChart data={dailyData} dateRange={monthRange} />
            <CategoryBreakdown data={categoryData} isLoading={isLoading} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
