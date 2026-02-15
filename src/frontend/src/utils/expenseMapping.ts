export function toBackendAmount(amount: number): bigint {
  return BigInt(Math.round(amount * 100));
}

export function toUIAmount(amount: bigint): number {
  return Number(amount) / 100;
}

export function normalizeNote(note?: string): string | null {
  if (!note || note.trim() === '') {
    return null;
  }
  return note.trim();
}

export function formatCurrency(amount: bigint | number): string {
  const numAmount = typeof amount === 'bigint' ? Number(amount) / 100 : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numAmount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
