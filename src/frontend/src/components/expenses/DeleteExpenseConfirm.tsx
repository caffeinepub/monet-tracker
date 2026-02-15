import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDeleteExpense } from '@/hooks/useExpenses';
import { toast } from 'sonner';
import type { Expense } from '@/backend';
import { formatCurrency } from '@/utils/expenseMapping';

type DeleteExpenseConfirmProps = {
  expense: Expense;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteExpenseConfirm({ expense, open, onOpenChange }: DeleteExpenseConfirmProps) {
  const deleteExpense = useDeleteExpense();

  const handleDelete = async () => {
    try {
      await deleteExpense.mutateAsync(expense.id);
      toast.success('Expense deleted successfully!');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to delete expense. Please try again.');
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Expense</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this expense? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4 rounded-lg border p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{expense.category}</p>
              <p className="text-sm text-muted-foreground">{expense.date}</p>
            </div>
            <p className="text-lg font-semibold">{formatCurrency(expense.amount)}</p>
          </div>
          {expense.note && (
            <p className="text-sm text-muted-foreground mt-2">{expense.note}</p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
