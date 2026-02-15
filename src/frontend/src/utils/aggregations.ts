import type { Expense } from '@/backend';

export function calculateTotal(expenses: Expense[]): bigint {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0n);
}

export function aggregateByDay(expenses: Expense[]): Array<{ date: string; total: bigint }> {
  const byDay = new Map<string, bigint>();

  expenses.forEach((expense) => {
    const current = byDay.get(expense.date) || 0n;
    byDay.set(expense.date, current + expense.amount);
  });

  return Array.from(byDay.entries())
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function aggregateByCategory(expenses: Expense[]): Array<{ category: string; total: bigint }> {
  const byCategory = new Map<string, bigint>();

  expenses.forEach((expense) => {
    const current = byCategory.get(expense.category) || 0n;
    byCategory.set(expense.category, current + expense.amount);
  });

  return Array.from(byCategory.entries()).map(([category, total]) => ({
    category,
    total,
  }));
}
