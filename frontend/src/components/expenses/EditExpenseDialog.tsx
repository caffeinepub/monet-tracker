import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExpenseForm } from "./ExpenseForm";
import { useUpdateExpense } from "@/hooks/useExpenses";
import type { Expense } from "@/backend";
import { fromBackendAmount } from "@/utils/expenseMapping";

type EditExpenseDialogProps = {
  expense: Expense;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditExpenseDialog({
  expense,
  open,
  onOpenChange,
}: EditExpenseDialogProps) {
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
      onOpenChange(false);
    } catch {
      // Error toast is handled in the mutation's onError callback
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
          defaultValues={{
            amount: fromBackendAmount(expense.amount),
            category: expense.category,
            date: expense.date,
            note: expense.note ?? undefined,
          }}
          onSubmit={handleSubmit}
          isPending={updateExpense.isPending}
          submitLabel="Update Expense"
        />
      </DialogContent>
    </Dialog>
  );
}
