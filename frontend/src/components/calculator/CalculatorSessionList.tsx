import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/utils/expenseMapping';
import { Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { CurrencyCode } from '@/constants/currencies';

type SessionEntry = {
  id: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
};

type CalculatorSessionListProps = {
  entries: SessionEntry[];
  onRemoveEntry: (id: string) => void;
  currency?: CurrencyCode;
};

export function CalculatorSessionList({ entries, onRemoveEntry, currency = 'USD' }: CalculatorSessionListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No entries in session yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex items-center justify-between p-4 rounded-xl border border-border bg-white hover:bg-accent/30 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="rounded-lg text-xs font-medium bg-primary/10 text-primary border-0">
                {entry.category}
              </Badge>
            </div>
            <div className="font-bold text-foreground text-base">
              {formatCurrency(entry.amount, currency)}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">{formatDate(entry.date)}</div>
            {entry.note && (
              <div className="text-sm text-muted-foreground mt-1 truncate">{entry.note}</div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveEntry(entry.id)}
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 ml-3 shrink-0"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}
    </div>
  );
}
