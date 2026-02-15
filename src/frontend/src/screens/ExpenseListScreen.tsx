import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpenseFilters } from '@/components/expenses/ExpenseFilters';
import { ExpenseList } from '@/components/expenses/ExpenseList';
import { useExpenses } from '@/hooks/useExpenses';
import { filterExpenses } from '@/utils/dateRanges';

export type FilterState = {
  timeWindow: 'week' | 'month' | 'all';
  category: string;
  customStart?: string;
  customEnd?: string;
};

export default function ExpenseListScreen() {
  const { data: allExpenses, isLoading } = useExpenses();
  const [filters, setFilters] = useState<FilterState>({
    timeWindow: 'all',
    category: 'all',
  });

  const filteredExpenses = filterExpenses(allExpenses || [], filters);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Expenses</h1>
        <p className="text-muted-foreground text-lg">
          View and manage all your expenses
        </p>
      </div>

      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Filter Expenses</CardTitle>
          <CardDescription>
            Narrow down your expenses by time period and category
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ExpenseFilters filters={filters} onFiltersChange={setFilters} />
        </CardContent>
      </Card>

      <ExpenseList expenses={filteredExpenses} isLoading={isLoading} />
    </div>
  );
}
