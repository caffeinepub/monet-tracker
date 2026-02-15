import Map "mo:core/Map";
import Array "mo:core/Array";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";

actor {
  type Category = Text;

  type Expense = {
    id : Text;
    amount : Nat;
    category : Category;
    date : Text;
    note : ?Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  module Expense {
    public func equal(e1 : Expense, e2 : Expense) : Bool {
      e1.id == e2.id;
    };

    public func compareByAmount(e1 : Expense, e2 : Expense) : Order.Order {
      Nat.compare(e1.amount, e2.amount);
    };

    public func compareByDate(e1 : Expense, e2 : Expense) : Order.Order {
      Text.compare(e1.date, e2.date);
    };
  };

  let expenses = Map.empty<Text, Expense>();

  public shared ({ caller }) func addExpense(id : Text, amount : Nat, category : Category, date : Text, note : ?Text) : async Expense {
    let currentTime = Time.now();
    let expense : Expense = {
      id;
      amount;
      category;
      date;
      note;
      createdAt = currentTime;
      updatedAt = currentTime;
    };
    expenses.add(id, expense);
    expense;
  };

  public shared ({ caller }) func updateExpense(id : Text, amount : Nat, category : Category, date : Text, note : ?Text) : async Expense {
    let existingExpense = switch (expenses.get(id)) {
      case (null) { Runtime.trap("Expense not found") };
      case (?expense) { expense };
    };

    let updatedExpense : Expense = {
      id;
      amount;
      category;
      date;
      note;
      createdAt = existingExpense.createdAt;
      updatedAt = Time.now();
    };
    expenses.add(id, updatedExpense);
    updatedExpense;
  };

  public shared ({ caller }) func deleteExpense(id : Text) : async () {
    if (not expenses.containsKey(id)) {
      Runtime.trap("Expense not found");
    };
    expenses.remove(id);
  };

  public query ({ caller }) func getExpense(id : Text) : async Expense {
    switch (expenses.get(id)) {
      case (null) { Runtime.trap("Expense not found") };
      case (?expense) { expense };
    };
  };

  public query ({ caller }) func getAllExpenses() : async [Expense] {
    expenses.values().toArray();
  };

  public query ({ caller }) func getExpensesByCategory(category : Category) : async [Expense] {
    expenses.values().toArray().filter(
      func(expense) { expense.category == category }
    );
  };

  public query ({ caller }) func getExpensesByDate(date : Text) : async [Expense] {
    expenses.values().toArray().filter(
      func(expense) { expense.date == date }
    );
  };

  public query ({ caller }) func getExpensesByDateRange(startDate : Text, endDate : Text) : async [Expense] {
    expenses.values().toArray().filter(
      func(expense) {
        (expense.date >= startDate) and (expense.date <= endDate)
      }
    );
  };

  public query ({ caller }) func getTotalByCategory(category : Category) : async Nat {
    let expensesByCategory = expenses.values().toArray().filter(
      func(expense) { expense.category == category }
    );
    let sum = expensesByCategory.foldLeft(
      0,
      func(acc, expense) { acc + expense.amount },
    );
    sum;
  };

  public type CategoryTotal = {
    category : Category;
    total : Nat;
  };

  public query ({ caller }) func getCategoryTotals() : async [CategoryTotal] {
    let allExpenses = expenses.values().toArray();

    let seenCategories = Set.empty<Text>();
    let filteredExpenses = allExpenses.filter(
      func(expense) {
        let isNew = not seenCategories.contains(expense.category);
        if (isNew) {
          seenCategories.add(expense.category);
        };
        isNew;
      }
    );

    filteredExpenses.map(func(exp) { { category = exp.category; total = 0 } });
  };

  public query ({ caller }) func getTotalExpenses() : async Nat {
    let expensesArray = expenses.values().toArray();
    let sum = expensesArray.foldLeft(
      0,
      func(acc, expense) { acc + expense.amount },
    );
    sum;
  };
};
