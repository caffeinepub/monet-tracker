import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { EXPENSE_CATEGORIES } from '@/constants/expenseCategories';
import { Plus } from 'lucide-react';

type CalculatorEntryFormProps = {
  onAddEntry: (entry: {
    amount: number;
    category: string;
    date: string;
    note?: string;
  }) => void;
};

export function CalculatorEntryForm({ onAddEntry }: CalculatorEntryFormProps) {
  const today = new Date().toISOString().split('T')[0];

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(today);
  const [note, setNote] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    if (!category) {
      newErrors.category = 'Category is required';
    }

    if (!date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onAddEntry({
      amount: parseFloat(amount),
      category,
      date,
      note: note.trim() || undefined,
    });

    // Reset form
    setAmount('');
    setCategory('');
    setDate(today);
    setNote('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="calc-amount">
          Amount <span className="text-destructive">*</span>
        </Label>
        <Input
          id="calc-amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={errors.amount ? 'border-destructive' : ''}
        />
        {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="calc-category">
          Category <span className="text-destructive">*</span>
        </Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="calc-category" className={errors.category ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {EXPENSE_CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="calc-date">
          Date <span className="text-destructive">*</span>
        </Label>
        <Input
          id="calc-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={errors.date ? 'border-destructive' : ''}
        />
        {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="calc-note">Note (optional)</Label>
        <Textarea
          id="calc-note"
          placeholder="Add any additional details..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
        />
      </div>

      <Button type="submit" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add to Session
      </Button>
    </form>
  );
}
