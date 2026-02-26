import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalculatorEntryForm } from '@/components/calculator/CalculatorEntryForm';
import { CalculatorSessionList } from '@/components/calculator/CalculatorSessionList';
import { Button } from '@/components/ui/button';
import { useCreateExpense } from '@/hooks/useExpenses';
import { toast } from 'sonner';
import { formatCurrency } from '@/utils/expenseMapping';
import { Save, Loader2 } from 'lucide-react';

type SessionEntry = {
  id: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
};

export default function CalculatorScreen() {
  const [sessionEntries, setSessionEntries] = useState<SessionEntry[]>([]);
  const createExpense = useCreateExpense();

  const handleAddEntry = (entry: Omit<SessionEntry, 'id'>) => {
    const newEntry: SessionEntry = {
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...entry,
    };
    setSessionEntries((prev) => [...prev, newEntry]);
  };

  const handleRemoveEntry = (id: string) => {
    setSessionEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const sessionTotal = sessionEntries.reduce((sum, entry) => sum + entry.amount, 0);

  const handleSaveAll = async () => {
    if (sessionEntries.length === 0) {
      toast.error('No entries to save');
      return;
    }

    try {
      for (const entry of sessionEntries) {
        await createExpense.mutateAsync({
          amount: entry.amount,
          category: entry.category,
          date: entry.date,
          note: entry.note,
        });
      }

      toast.success(`Successfully saved ${sessionEntries.length} expense${sessionEntries.length > 1 ? 's' : ''}`);
      setSessionEntries([]);
    } catch (error) {
      toast.error('Failed to save expenses');
      console.error('Error saving expenses:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-foreground mb-1">Expense Calculator</h1>
        <p className="text-sm text-muted-foreground">
          Add multiple expenses to your session, review the total, and save them all at once.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Card className="rounded-xl border border-border shadow-card bg-white">
          <CardHeader className="px-5 pt-5 pb-2">
            <CardTitle className="text-base font-semibold">Add Entry</CardTitle>
            <CardDescription className="text-xs">Enter expense details to add to your session</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <CalculatorEntryForm onAddEntry={handleAddEntry} />
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-border shadow-card bg-white">
          <CardHeader className="px-5 pt-5 pb-2">
            <CardTitle className="text-base font-semibold">Session Summary</CardTitle>
            <CardDescription className="text-xs">
              {sessionEntries.length} {sessionEntries.length === 1 ? 'entry' : 'entries'} in session
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
              <span className="text-sm font-medium text-muted-foreground">Session Total</span>
              <span className="text-2xl font-bold text-primary">{formatCurrency(sessionTotal)}</span>
            </div>

            <Button
              onClick={handleSaveAll}
              disabled={sessionEntries.length === 0 || createExpense.isPending}
              className="w-full rounded-xl"
              size="lg"
            >
              {createExpense.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save All to Expenses
            </Button>
          </CardContent>
        </Card>
      </div>

      {sessionEntries.length > 0 && (
        <Card className="rounded-xl border border-border shadow-card bg-white">
          <CardHeader className="px-5 pt-5 pb-2">
            <CardTitle className="text-base font-semibold">Session Entries</CardTitle>
            <CardDescription className="text-xs">Review and manage entries before saving</CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <CalculatorSessionList entries={sessionEntries} onRemoveEntry={handleRemoveEntry} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
