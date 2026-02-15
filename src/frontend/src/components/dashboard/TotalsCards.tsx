import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Expense } from '@/backend';
import { calculateTotal } from '@/utils/aggregations';
import { formatCurrency } from '@/utils/expenseMapping';

type TotalsCardsProps = {
  expenses: Expense[];
  isLoading: boolean;
};

export function TotalsCards({ expenses, isLoading }: TotalsCardsProps) {
  const total = calculateTotal(expenses);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-32" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(total)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {expenses.length} {expenses.length === 1 ? 'transaction' : 'transactions'}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average per Day</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {expenses.length > 0
              ? formatCurrency(total / BigInt(Math.max(1, expenses.length)))
              : formatCurrency(0n)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Based on recorded expenses</p>
        </CardContent>
      </Card>
    </div>
  );
}
