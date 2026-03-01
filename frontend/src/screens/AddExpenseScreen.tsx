import { useNavigate } from "@tanstack/react-router";
import { ExpenseForm, ExpenseFormValues } from "@/components/expenses/ExpenseForm";
import { useCreateExpense } from "@/hooks/useExpenses";

export function AddExpenseScreen() {
  const navigate = useNavigate();
  const createExpense = useCreateExpense();

  async function handleSubmit(values: ExpenseFormValues) {
    try {
      await createExpense.mutateAsync(values);
      navigate({ to: "/expenses" });
    } catch {
      // Error toast is handled in the mutation's onError callback
    }
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Add Expense</h1>
      <div className="bg-card rounded-xl border border-border shadow-card p-6">
        <ExpenseForm
          onSubmit={handleSubmit}
          isPending={createExpense.isPending}
          submitLabel="Add Expense"
        />
      </div>
    </main>
  );
}

export default AddExpenseScreen;
