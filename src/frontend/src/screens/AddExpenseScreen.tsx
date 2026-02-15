import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpenseForm } from '@/components/expenses/ExpenseForm';
import { useCreateExpense } from '@/hooks/useExpenses';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

export default function AddExpenseScreen() {
  const navigate = useNavigate();
  const createExpense = useCreateExpense();

  const handleSubmit = async (data: {
    amount: number;
    category: string;
    date: string;
    note?: string;
  }) => {
    try {
      await createExpense.mutateAsync(data);
      toast.success('Expense added successfully!');
      navigate({ to: '/expenses' });
    } catch (error) {
      toast.error('Failed to add expense. Please try again.');
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Expense</h1>
        <p className="text-muted-foreground mt-1">
          Record a new expense to track your spending
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
          <CardDescription>
            Enter the details of your expense below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseForm
            onSubmit={handleSubmit}
            isSubmitting={createExpense.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
