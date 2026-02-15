import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { EXPENSE_CATEGORIES } from '@/constants/expenseCategories';
import type { FilterState } from '@/screens/ExpenseListScreen';

type ExpenseFiltersProps = {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
};

export function ExpenseFilters({ filters, onFiltersChange }: ExpenseFiltersProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="time-window">Time Period</Label>
        <Select
          value={filters.timeWindow}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, timeWindow: value as FilterState['timeWindow'] })
          }
        >
          <SelectTrigger id="time-window">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-filter">Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) => onFiltersChange({ ...filters, category: value })}
        >
          <SelectTrigger id="category-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {EXPENSE_CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
