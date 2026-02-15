import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Nat "mo:core/Nat";

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

  let expensesMap = Map.empty<Text, Expense>();

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
    expensesMap.add(id, expense);
    expense;
  };

  public shared ({ caller }) func updateExpense(id : Text, amount : Nat, category : Category, date : Text, note : ?Text) : async Expense {
    let existingExpense = switch (expensesMap.get(id)) {
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
    expensesMap.add(id, updatedExpense);
    updatedExpense;
  };

  public shared ({ caller }) func deleteExpense(id : Text) : async () {
    if (not expensesMap.containsKey(id)) {
      Runtime.trap("Expense not found");
    };
    expensesMap.remove(id);
  };

  public query ({ caller }) func getExpense(id : Text) : async Expense {
    switch (expensesMap.get(id)) {
      case (null) { Runtime.trap("Expense not found") };
      case (?expense) { expense };
    };
  };

  public query ({ caller }) func getAllExpenses() : async [Expense] {
    expensesMap.values().toArray();
  };

  public query ({ caller }) func getExpensesByCategory(category : Category) : async [Expense] {
    expensesMap.values().toArray().filter(
      func(expense) { expense.category == category }
    );
  };

  public query ({ caller }) func getExpensesByDate(date : Text) : async [Expense] {
    expensesMap.values().toArray().filter(
      func(expense) { expense.date == date }
    );
  };

  public query ({ caller }) func getExpensesByDateRange(startDate : Text, endDate : Text) : async [Expense] {
    expensesMap.values().toArray().filter(
      func(expense) {
        (expense.date >= startDate) and (expense.date <= endDate)
      }
    );
  };

  public query ({ caller }) func getTotalByCategory(category : Category) : async Nat {
    let expenses = expensesMap.values().toArray().filter(
      func(expense) { expense.category == category }
    );
    let sum = expenses.foldLeft(
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
    let allExpenses = expensesMap.values().toArray();
    let categories = allExpenses.map(func(exp) { exp.category });
    let totals = categories.map(
      func(category) {
        let categoryExpenses = allExpenses.filter(
          func(expense) { expense.category == category }
        );
        let sum = categoryExpenses.foldLeft(
          0,
          func(acc, expense) { acc + expense.amount },
        );
        { category; total = sum };
      }
    );
    totals;
  };

  public query ({ caller }) func getTotalExpenses() : async Nat {
    let expenses = expensesMap.values().toArray();
    let sum = expenses.foldLeft(
      0,
      func(acc, expense) { acc + expense.amount },
    );
    sum;
  };
};
