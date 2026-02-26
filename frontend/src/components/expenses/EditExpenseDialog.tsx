import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ExpenseForm } from './ExpenseForm';
import { useUpdateExpense } from '@/hooks/useExpenses';
import { toast } from 'sonner';
import type { Expense } from '@/backend';
import { toUIAmount } from '@/utils/expenseMapping';

type EditExpenseDialogProps = {
  expense: Expense;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditExpenseDialog({ expense, open, onOpenChange }: EditExpenseDialogProps) {
  const updateExpense = useUpdateExpense();

  const handleSubmit = async (data: {
    amount: number;
    category: string;
    date: string;
    note?: string;
  }) => {
    try {
      await updateExpense.mutateAsync({
        id: expense.id,
        ...data,
      });
      toast.success('Expense updated successfully!');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to update expense. Please try again.');
      console.error('Error updating expense:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogDescription>
            Update the details of your expense
          </DialogDescription>
        </DialogHeader>
        <ExpenseForm
          initialData={{
            amount: toUIAmount(expense.amount),
            category: expense.category,
            date: expense.date,
            note: expense.note,
          }}
          onSubmit={handleSubmit}
          isSubmitting={updateExpense.isPending}
          submitLabel="Update Expense"
        />
      </DialogContent>
    </Dialog>
  );
}
