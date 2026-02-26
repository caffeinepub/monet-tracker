import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';
import { EditExpenseDialog } from './EditExpenseDialog';
import { DeleteExpenseConfirm } from './DeleteExpenseConfirm';
import { formatCurrency, formatDate } from '@/utils/expenseMapping';
import type { Expense } from '@/backend';
import { Skeleton } from '@/components/ui/skeleton';

type ExpenseListProps = {
  expenses: Expense[];
  isLoading: boolean;
};

export function ExpenseList({ expenses, isLoading }: ExpenseListProps) {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (a.date !== b.date) {
      return b.date.localeCompare(a.date);
    }
    return Number(b.createdAt - a.createdAt);
  });

  if (isLoading) {
    return (
      <Card className="rounded-xl border border-border shadow-card bg-white">
        <CardHeader className="px-5 pt-5 pb-2">
          <CardTitle className="text-base font-semibold">Your Expenses</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (expenses.length === 0) {
    return (
      <Card className="rounded-xl border border-border shadow-card bg-white">
        <CardHeader className="px-5 pt-5 pb-2">
          <CardTitle className="text-base font-semibold">Your Expenses</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No expenses found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add your first expense to start tracking
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="rounded-xl border border-border shadow-card bg-white">
        <CardHeader className="px-5 pt-5 pb-2">
          <CardTitle className="text-base font-semibold">Your Expenses ({expenses.length})</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="space-y-3">
            {sortedExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-white hover:bg-accent/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="rounded-lg text-xs font-medium bg-primary/10 text-primary border-0">
                      {expense.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-foreground text-base">
                      {formatCurrency(expense.amount)}
                    </span>
                    {expense.note && (
                      <span className="text-sm text-muted-foreground truncate max-w-xs">
                        {expense.note}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(expense.date)}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-4 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingExpense(expense)}
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingExpense(expense)}
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {editingExpense && (
        <EditExpenseDialog
          expense={editingExpense}
          open={!!editingExpense}
          onOpenChange={(open) => !open && setEditingExpense(null)}
        />
      )}

      {deletingExpense && (
        <DeleteExpenseConfirm
          expense={deletingExpense}
          open={!!deletingExpense}
          onOpenChange={(open) => !open && setDeletingExpense(null)}
        />
      )}
    </>
  );
}
