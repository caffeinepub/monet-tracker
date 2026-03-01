# Specification

## Summary
**Goal:** Add a currency selection option in the Settings screen, allowing users to choose between USD ($), INR (₹), and JPY (¥), with the selected currency applied to all monetary displays across the app.

**Planned changes:**
- Add a `currency` preference field to the backend actor with `getCurrency()` and `setCurrency()` methods (defaulting to USD)
- Add a "Currency" section in `SettingsScreen.tsx` with three selectable options: USD ($), INR (₹), JPY (¥), visually highlighting the active selection
- Persist the selected currency to the backend and local storage so it survives page refreshes
- Update all currency formatting in ExpenseList, TotalsCards, Dashboard, Calculator, AddExpense, and expenseMapping.ts to use the selected currency symbol and locale (en-US, en-IN, ja-JP)

**User-visible outcome:** Users can open Settings and pick their preferred currency; all expense amounts throughout the app instantly reflect the chosen symbol and locale formatting.
