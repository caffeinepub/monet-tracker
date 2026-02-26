import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpenseFilters } from '@/components/expenses/ExpenseFilters';
import { ExpenseList } from '@/components/expenses/ExpenseList';
import { useExpenses } from '@/hooks/useExpenses';
import { filterExpensesByTimeWindow } from '@/utils/dateRanges';

export default function ExpenseListScreen() {
  const [timeWindow, setTimeWindow] = useState<'week' | 'month' | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const { data: expenses = [], isLoading } = useExpenses();

  let filteredExpenses = filterExpensesByTimeWindow(expenses, timeWindow);

  if (selectedCategory !== 'all') {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === selectedCategory
    );
  }

  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-foreground mb-1">Expenses</h1>
        <p className="text-sm text-muted-foreground">
          View and manage all your recorded expenses
        </p>
      </div>

      <Card className="rounded-xl border border-border shadow-card bg-white">
        <CardHeader className="px-5 pt-5 pb-2">
          <CardTitle className="text-base font-semibold">Filter Expenses</CardTitle>
          <CardDescription className="text-xs">Narrow down your expense list</CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <ExpenseFilters
            timeWindow={timeWindow}
            selectedCategory={selectedCategory}
            onTimeWindowChange={setTimeWindow}
            onCategoryChange={setSelectedCategory}
          />
        </CardContent>
      </Card>

      <Card className="rounded-xl border border-border shadow-card bg-white">
        <CardHeader className="px-5 pt-5 pb-2">
          <CardTitle className="text-base font-semibold">Expense List</CardTitle>
          <CardDescription className="text-xs">
            {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'} found
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <ExpenseList expenses={filteredExpenses} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
