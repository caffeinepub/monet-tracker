import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Expense } from '@/backend';
import { toBackendAmount, normalizeNote } from '@/utils/expenseMapping';

const EXPENSES_QUERY_KEY = ['expenses'];

export function useExpenses() {
  const { actor, isFetching } = useActor();

  return useQuery<Expense[]>({
    queryKey: EXPENSES_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllExpenses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateExpense() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      amount: number;
      category: string;
      date: string;
      note?: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const amount = toBackendAmount(data.amount);
      const note = normalizeNote(data.note);

      return actor.addExpense(id, amount, data.category, data.date, note);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    },
  });
}

export function useUpdateExpense() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      amount: number;
      category: string;
      date: string;
      note?: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      
      const amount = toBackendAmount(data.amount);
      const note = normalizeNote(data.note);

      return actor.updateExpense(data.id, amount, data.category, data.date, note);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    },
  });
}

export function useDeleteExpense() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteExpense(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    },
  });
}
