import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, format, eachDayOfInterval } from 'date-fns';
import type { Expense } from '@/backend';

export function getWeekRange(date: Date): { start: string; end: string } {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(date, { weekStartsOn: 1 });
  
  return {
    start: format(start, 'yyyy-MM-dd'),
    end: format(end, 'yyyy-MM-dd'),
  };
}

export function getMonthRange(date: Date): { start: string; end: string } {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  
  return {
    start: format(start, 'yyyy-MM-dd'),
    end: format(end, 'yyyy-MM-dd'),
  };
}

export function getDayLabels(startDate: string, endDate: string): Array<{ date: string; label: string }> {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = eachDayOfInterval({ start, end });
  
  return days.map((day) => ({
    date: format(day, 'yyyy-MM-dd'),
    label: format(day, 'EEE'),
  }));
}

export function filterExpensesByTimeWindow(
  expenses: Expense[],
  timeWindow: 'week' | 'month' | 'all'
): Expense[] {
  if (timeWindow === 'all') {
    return expenses;
  }

  const range = timeWindow === 'week' ? getWeekRange(new Date()) : getMonthRange(new Date());
  
  return expenses.filter(
    (exp) => exp.date >= range.start && exp.date <= range.end
  );
}
