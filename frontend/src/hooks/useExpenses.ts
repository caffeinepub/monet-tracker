import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import { toast } from "sonner";

export interface ExpenseFormData {
  amount: number;
  category: string;
  date: string;
  note?: string;
}

const EXPENSES_KEY = ["expenses"] as const;

/** Primary hook to fetch all expenses from the backend. */
export function useExpenses() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: EXPENSES_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllExpenses();
    },
    enabled: !!actor && !isFetching,
  });
}

// Alias for consistency
export const useGetAllExpenses = useExpenses;

export function useCreateExpense() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ExpenseFormData) => {
      if (!actor) throw new Error("Backend not available");

      const id = `expense_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      const amountBigInt = BigInt(Math.round(data.amount * 100));
      const note: string | null =
        data.note && data.note.trim() !== "" ? data.note.trim() : null;

      try {
        const result = await actor.addExpense(
          id,
          amountBigInt,
          data.category,
          data.date,
          note
        );
        return result;
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
            ? err
            : "Unknown error occurred";
        throw new Error(`Failed to add expense: ${message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_KEY });
      toast.success("Expense added successfully");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to add expense. Please try again.");
    },
  });
}

export function useUpdateExpense() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ExpenseFormData & { id: string }) => {
      if (!actor) throw new Error("Backend not available");

      const amountBigInt = BigInt(Math.round(data.amount * 100));
      const note: string | null =
        data.note && data.note.trim() !== "" ? data.note.trim() : null;

      try {
        const result = await actor.updateExpense(
          data.id,
          amountBigInt,
          data.category,
          data.date,
          note
        );
        return result;
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
            ? err
            : "Unknown error occurred";
        throw new Error(`Failed to update expense: ${message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_KEY });
      toast.success("Expense updated successfully");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update expense. Please try again.");
    },
  });
}

export function useDeleteExpense() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Backend not available");

      try {
        await actor.deleteExpense(id);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
            ? err
            : "Unknown error occurred";
        throw new Error(`Failed to delete expense: ${message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_KEY });
      toast.success("Expense deleted");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to delete expense. Please try again.");
    },
  });
}
