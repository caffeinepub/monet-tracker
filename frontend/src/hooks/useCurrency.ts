import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Currency } from '@/backend';
import type { CurrencyCode } from '@/constants/currencies';

const CURRENCY_KEY = ['currency'] as const;
const LS_KEY = 'preferred_currency';

function toBackendCurrency(code: CurrencyCode): Currency {
  switch (code) {
    case 'INR': return Currency.INR;
    case 'JPY': return Currency.JPY;
    default: return Currency.USD;
  }
}

function fromBackendCurrency(currency: Currency): CurrencyCode {
  switch (currency) {
    case Currency.INR: return 'INR';
    case Currency.JPY: return 'JPY';
    default: return 'USD';
  }
}

export function useCurrency() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const query = useQuery<CurrencyCode>({
    queryKey: CURRENCY_KEY,
    queryFn: async () => {
      if (!actor) {
        const stored = localStorage.getItem(LS_KEY) as CurrencyCode | null;
        return stored ?? 'USD';
      }
      try {
        const result = await actor.getCurrencyPreference();
        const code = fromBackendCurrency(result);
        localStorage.setItem(LS_KEY, code);
        return code;
      } catch {
        const stored = localStorage.getItem(LS_KEY) as CurrencyCode | null;
        return stored ?? 'USD';
      }
    },
    enabled: !isFetching,
    initialData: () => {
      const stored = localStorage.getItem(LS_KEY) as CurrencyCode | null;
      return stored ?? 'USD';
    },
  });

  const mutation = useMutation({
    mutationFn: async (code: CurrencyCode) => {
      localStorage.setItem(LS_KEY, code);
      if (!actor) return;
      await actor.setCurrencyPreference(toBackendCurrency(code));
    },
    onSuccess: (_data, code) => {
      queryClient.setQueryData(CURRENCY_KEY, code);
    },
  });

  return {
    currency: query.data ?? 'USD',
    isLoading: query.isLoading,
    setCurrency: mutation.mutate,
    isSetting: mutation.isPending,
  };
}
