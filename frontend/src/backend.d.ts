import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CategoryTotal {
    total: bigint;
    category: Category;
}
export type Time = bigint;
export interface Expense {
    id: string;
    date: string;
    note?: string;
    createdAt: Time;
    updatedAt: Time;
    category: Category;
    amount: bigint;
}
export type Category = string;
export enum Currency {
    INR = "INR",
    JPY = "JPY",
    USD = "USD"
}
export interface backendInterface {
    addExpense(id: string, amount: bigint, category: Category, date: string, note: string | null): Promise<Expense>;
    deleteExpense(id: string): Promise<void>;
    getAllExpenses(): Promise<Array<Expense>>;
    getCategoryTotals(): Promise<Array<CategoryTotal>>;
    getCurrencyPreference(): Promise<Currency>;
    getExpense(id: string): Promise<Expense>;
    getExpensesByCategory(category: Category): Promise<Array<Expense>>;
    getExpensesByDate(date: string): Promise<Array<Expense>>;
    getExpensesByDateRange(startDate: string, endDate: string): Promise<Array<Expense>>;
    getTotalByCategory(category: Category): Promise<bigint>;
    getTotalExpenses(): Promise<bigint>;
    setCurrencyPreference(currency: Currency): Promise<void>;
    updateExpense(id: string, amount: bigint, category: Category, date: string, note: string | null): Promise<Expense>;
}
