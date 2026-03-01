import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Expense } from '@/backend';
import { calculateTotal } from '@/utils/aggregations';
import { formatCurrency } from '@/utils/expenseMapping';
import { useCurrency } from '@/hooks/useCurrency';

type TotalsCardsProps = {
  expenses: Expense[];
  isLoading: boolean;
};

export function TotalsCards({ expenses, isLoading }: TotalsCardsProps) {
  const total = calculateTotal(expenses);
  const { currency } = useCurrency();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-xl border border-border shadow-card bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-5 pt-5">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <Skeleton className="h-8 w-32" />
          </CardContent>
        </Card>
        <Card className="rounded-xl border border-border shadow-card bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-5 pt-5">
            <CardTitle className="text-sm font-medium text-muted-foreground">Transactions</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="rounded-xl border border-border shadow-card bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-5 pt-5">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="text-3xl font-bold text-foreground">{formatCurrency(total, currency)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {expenses.length} {expenses.length === 1 ? 'transaction' : 'transactions'}
          </p>
        </CardContent>
      </Card>
      <Card className="rounded-xl border border-border shadow-card bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-5 pt-5">
          <CardTitle className="text-sm font-medium text-muted-foreground">Average per Day</CardTitle>
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="text-3xl font-bold text-foreground">
            {expenses.length > 0
              ? formatCurrency(total / BigInt(Math.max(1, expenses.length)), currency)
              : formatCurrency(0n, currency)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Based on recorded expenses</p>
        </CardContent>
      </Card>
    </div>
  );
}
