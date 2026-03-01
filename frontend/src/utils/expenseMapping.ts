import type { Expense } from "@/backend";
import type { CurrencyCode } from "@/constants/currencies";
import { getCurrencyOption } from "@/constants/currencies";

/**
 * Convert a UI float amount (e.g. 12.50) to backend bigint cents (e.g. 1250n).
 */
export function toBackendAmount(amount: number): bigint {
  if (isNaN(amount) || amount < 0) {
    throw new Error(`Invalid amount: ${amount}`);
  }
  return BigInt(Math.round(amount * 100));
}

/**
 * Convert a backend bigint amount (cents) to a UI float (e.g. 1250n → 12.50).
 */
export function fromBackendAmount(amount: bigint): number {
  return Number(amount) / 100;
}

/** @deprecated Use fromBackendAmount instead */
export const toUIAmount = fromBackendAmount;

/**
 * Normalize a note string for the backend: returns null if empty/undefined.
 */
export function normalizeNote(note?: string): string | null {
  if (!note || note.trim() === "") return null;
  return note.trim();
}

/**
 * Format a bigint amount (cents) as a currency string using the selected currency.
 * Also accepts a plain number treated as already-scaled dollars.
 */
export function formatCurrency(
  amount: bigint | number,
  currencyCode: CurrencyCode = "USD"
): string {
  const option = getCurrencyOption(currencyCode);
  const value =
    typeof amount === "bigint"
      ? Number(amount) / 100
      : amount;

  // JPY doesn't use decimal places
  const isJPY = currencyCode === "JPY";

  return new Intl.NumberFormat(option.locale, {
    style: "currency",
    currency: option.code,
    minimumFractionDigits: isJPY ? 0 : 2,
    maximumFractionDigits: isJPY ? 0 : 2,
  }).format(isJPY ? Math.round(value) : value);
}

/**
 * Format a date string (YYYY-MM-DD) for display, avoiding timezone shifts.
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * Map a backend Expense to a UI-friendly object with number amount.
 */
export function mapExpense(expense: Expense) {
  return {
    ...expense,
    amount: fromBackendAmount(expense.amount),
    note: expense.note ?? undefined,
  };
}
