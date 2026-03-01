import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPENSE_CATEGORIES } from "@/constants/expenseCategories";
import { Loader2 } from "lucide-react";

export interface ExpenseFormValues {
  amount: number;
  category: string;
  date: string;
  note?: string;
}

export interface ExpenseFormProps {
  /** Pre-fill form fields (for edit mode). */
  defaultValues?: Partial<ExpenseFormValues>;
  /** @deprecated Use defaultValues instead */
  initialData?: Partial<ExpenseFormValues>;
  onSubmit: (values: ExpenseFormValues) => void;
  isPending?: boolean;
  /** @deprecated Use isPending instead */
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function ExpenseForm({
  defaultValues,
  initialData,
  onSubmit,
  isPending,
  isSubmitting,
  submitLabel = "Add Expense",
}: ExpenseFormProps) {
  // Support both old and new prop names
  const seed = defaultValues ?? initialData;
  const pending = isPending ?? isSubmitting ?? false;

  const today = new Date().toISOString().split("T")[0];

  const [amount, setAmount] = useState(
    seed?.amount !== undefined ? String(seed.amount) : ""
  );
  const [category, setCategory] = useState(seed?.category ?? "");
  const [date, setDate] = useState(seed?.date ?? today);
  const [note, setNote] = useState(seed?.note ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = "Please enter a valid amount greater than 0.";
    }
    if (!category) {
      newErrors.category = "Please select a category.";
    }
    if (!date) {
      newErrors.date = "Please select a date.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      amount: parseFloat(amount),
      category,
      date,
      note: note.trim() || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Amount */}
      <div className="space-y-1.5">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            if (errors.amount) setErrors((prev) => ({ ...prev, amount: "" }));
          }}
          disabled={pending}
          className={errors.amount ? "border-destructive" : ""}
        />
        {errors.amount && (
          <p className="text-xs text-destructive">{errors.amount}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <Label htmlFor="category">Category</Label>
        <Select
          value={category}
          onValueChange={(val) => {
            setCategory(val);
            if (errors.category)
              setErrors((prev) => ({ ...prev, category: "" }));
          }}
          disabled={pending}
        >
          <SelectTrigger
            id="category"
            className={errors.category ? "border-destructive" : ""}
          >
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
        {errors.category && (
          <p className="text-xs text-destructive">{errors.category}</p>
        )}
      </div>

      {/* Date */}
      <div className="space-y-1.5">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
          }}
          disabled={pending}
          className={errors.date ? "border-destructive" : ""}
        />
        {errors.date && (
          <p className="text-xs text-destructive">{errors.date}</p>
        )}
      </div>

      {/* Note */}
      <div className="space-y-1.5">
        <Label htmlFor="note">Note (optional)</Label>
        <Textarea
          id="note"
          placeholder="Add a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={pending}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
}
