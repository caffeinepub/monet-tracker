# Student Expense Tracker - Frontend Architecture

## Overview

This is a professional student-focused expense tracking application built with React, TypeScript, and the Internet Computer platform. The app provides a clean, straightforward interface for recording daily expenses, viewing weekly and monthly totals, and visualizing spending patterns through simple charts.

## Design Philosophy

- **Student-Friendly**: Clean, professional interface without unnecessary complexity
- **No Payment Features**: Pure expense tracking without online payments, wallets, or transfers
- **Straightforward Math**: Simple sums and aggregations for totals and breakdowns
- **Accessible**: Clear focus states, readable fonts, sufficient contrast
- **Responsive**: Mobile-first design that works across all screen sizes

## Frontend Structure

### Screens (`frontend/src/screens/`)

- **DashboardScreen**: Overview with weekly/monthly tabs, total cards, charts, and category breakdown
- **AddExpenseScreen**: Form for recording new expenses with validation
- **ExpenseListScreen**: Filterable, sortable list of all expenses with edit/delete actions
- **SettingsScreen**: Theme toggle and app information

### Components

#### Layout (`frontend/src/components/layout/`)
- **AppShell**: Main app container with header, navigation, content area, and footer
- **PrimaryNav**: Navigation bar with Dashboard, Add Expense, Expenses, and Settings links

#### Expenses (`frontend/src/components/expenses/`)
- **ExpenseForm**: Reusable form for creating/editing expenses with inline validation
- **ExpenseFilters**: Time window (week/month/all) and category filter controls
- **ExpenseList**: Table view of expenses with sort, edit, and delete actions
- **EditExpenseDialog**: Modal dialog for editing existing expenses
- **DeleteExpenseConfirm**: Confirmation dialog for destructive delete actions

#### Dashboard (`frontend/src/components/dashboard/`)
- **TotalsCards**: Summary cards showing total spent and average per day
- **CategoryBreakdown**: Visual breakdown of spending by category with percentages

#### Charts (`frontend/src/components/charts/`)
- **WeeklySpendBarChart**: Bar chart showing daily spending for the selected week
- **MonthlySpendTrendChart**: Line chart showing spending trend over the month

### Hooks (`frontend/src/hooks/`)

- **useExpenses**: React Query hooks for fetching all expenses
- **useCreateExpense**: Mutation hook for adding new expenses
- **useUpdateExpense**: Mutation hook for updating existing expenses
- **useDeleteExpense**: Mutation hook for deleting expenses
- **useActor**: Backend actor initialization (auto-generated, read-only)
- **useInternetIdentity**: Internet Identity authentication (auto-generated, read-only)

### Utilities (`frontend/src/utils/`)

- **expenseMapping.ts**: Type conversions between UI (number) and backend (bigint), currency/date formatting
- **dateRanges.ts**: Week/month range calculations, day labels, expense filtering by date
- **aggregations.ts**: Sum totals, group by day, group by category

### Constants (`frontend/src/constants/`)

- **expenseCategories.ts**: Predefined expense categories (Food, Transportation, Books, Entertainment, Housing, Utilities, Healthcare, Clothing, Personal, Other)

## Backend Interface

The backend is a single Motoko actor providing these methods:

### Mutations (Update Calls)
- `addExpense(id, amount, category, date, note)`: Create a new expense record
- `updateExpense(id, amount, category, date, note)`: Update an existing expense
- `deleteExpense(id)`: Delete an expense by ID

### Queries (Read-Only Calls)
- `getAllExpenses()`: Fetch all expenses
- `getExpense(id)`: Fetch a single expense by ID
- `getExpensesByCategory(category)`: Filter expenses by category
- `getExpensesByDate(date)`: Filter expenses by exact date
- `getExpensesByDateRange(startDate, endDate)`: Filter expenses by date range
- `getTotalExpenses()`: Get sum of all expense amounts
- `getTotalByCategory(category)`: Get sum for a specific category
- `getCategoryTotals()`: Get totals for all categories

## Data Model

### Expense Record
