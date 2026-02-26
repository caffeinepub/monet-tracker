import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpenseForm } from '@/components/expenses/ExpenseForm';
import { useCreateExpense } from '@/hooks/useExpenses';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export default function AddExpenseScreen() {
  const createExpense = useCreateExpense();
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    amount: number;
    category: string;
    date: string;
    note?: string;
  }) => {
    try {
      await createExpense.mutateAsync(data);
      toast.success('Expense added successfully');
      navigate({ to: '/expenses' });
    } catch (error) {
      toast.error('Failed to add expense');
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-foreground mb-1">Add Expense</h1>
        <p className="text-sm text-muted-foreground">
          Record a new expense to track your spending
        </p>
      </div>

      <Card className="rounded-xl border border-border shadow-card bg-white">
        <CardHeader className="px-5 pt-5 pb-2">
          <CardTitle className="text-base font-semibold">Expense Details</CardTitle>
          <CardDescription className="text-xs">Enter the details of your expense below</CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <ExpenseForm
            onSubmit={handleSubmit}
            isSubmitting={createExpense.isPending}
            submitLabel="Add Expense"
          />
        </CardContent>
      </Card>
    </div>
  );
}
