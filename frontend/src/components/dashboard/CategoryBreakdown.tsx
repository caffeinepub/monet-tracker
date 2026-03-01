import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/expenseMapping';
import { useCurrency } from '@/hooks/useCurrency';

type CategoryData = {
  category: string;
  total: bigint;
};

type CategoryBreakdownProps = {
  data: CategoryData[];
  isLoading: boolean;
};

export function CategoryBreakdown({ data, isLoading }: CategoryBreakdownProps) {
  const { currency } = useCurrency();
  const sortedData = [...data].sort((a, b) => Number(b.total - a.total));
  const grandTotal = data.reduce((sum, item) => sum + item.total, 0n);

  if (isLoading) {
    return (
      <Card className="rounded-xl border border-border shadow-card bg-white">
        <CardHeader className="px-5 pt-5 pb-2">
          <CardTitle className="text-base font-semibold">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="rounded-xl border border-border shadow-card bg-white">
        <CardHeader className="px-5 pt-5 pb-2">
          <CardTitle className="text-base font-semibold">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">No expenses to display</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border border-border shadow-card bg-white">
      <CardHeader className="px-5 pt-5 pb-2">
        <CardTitle className="text-base font-semibold">Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="space-y-4">
          {sortedData.map((item) => {
            const percentage = grandTotal > 0n
              ? Number((item.total * 100n) / grandTotal)
              : 0;

            return (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.category}</span>
                  <span className="font-bold text-foreground">
                    {formatCurrency(item.total, currency)}
                    <span className="font-normal text-muted-foreground ml-1">({percentage.toFixed(0)}%)</span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-primary/10 overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
