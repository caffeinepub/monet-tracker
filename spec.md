# Specification

## Summary
**Goal:** Refresh the Expense Tracker UI with a clean white/blue theme, rounded cards, bold amounts, and improved spacing.

**Planned changes:**
- Set white (#FFFFFF) as the global app background across all screens
- Apply a cohesive blue color scheme (#2563EB primary, #EFF6FF tint) to buttons, navigation highlights, progress bars, and charts
- Restyle all cards with 12px border-radius, white background, subtle border, and soft box shadow
- Display expense amounts in bold/semi-bold font weight in ExpenseList, TotalsCards, and Calculator session list
- Render date values in small font size and muted grey color (#9CA3AF) across all expense-displaying components
- Increase card internal padding to at least 16px and vertical gaps between list items to at least 12px
- Update CSS variables and Tailwind config tokens to reflect the new white background, blue primary, grey text, and 12px border-radius defaults

**User-visible outcome:** The app displays a polished white and blue UI with rounded cards, visually prominent bold amounts, subtle grey dates, and consistent clean spacing throughout all screens.
