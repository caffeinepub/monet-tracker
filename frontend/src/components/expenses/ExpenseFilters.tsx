import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { EXPENSE_CATEGORIES } from '@/constants/expenseCategories';

type ExpenseFiltersProps = {
  timeWindow: 'week' | 'month' | 'all';
  selectedCategory: string;
  onTimeWindowChange: (timeWindow: 'week' | 'month' | 'all') => void;
  onCategoryChange: (category: string) => void;
};

export function ExpenseFilters({
  timeWindow,
  selectedCategory,
  onTimeWindowChange,
  onCategoryChange,
}: ExpenseFiltersProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="time-window">Time Period</Label>
        <Select
          value={timeWindow}
          onValueChange={(value) => onTimeWindowChange(value as 'week' | 'month' | 'all')}
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
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
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
