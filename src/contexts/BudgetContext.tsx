
import React, { createContext, useContext, useState } from "react";
import { Budget, Category, MonthlyData, Transaction } from "@/types/budget";

// Mock data for our initial state
const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 25.50,
    category: "food",
    description: "Grocery shopping",
    date: new Date(2025, 3, 17),
  },
  {
    id: "2",
    amount: 900,
    category: "housing",
    description: "Monthly rent",
    date: new Date(2025, 3, 15),
  },
  {
    id: "3",
    amount: 45.20,
    category: "transportation",
    description: "Gas refill",
    date: new Date(2025, 3, 16),
  },
  {
    id: "4",
    amount: 60,
    category: "entertainment",
    description: "Movie tickets",
    date: new Date(2025, 3, 14),
  },
  {
    id: "5",
    amount: 120,
    category: "utilities",
    description: "Electricity bill",
    date: new Date(2025, 3, 13),
  },
];

const mockBudgets: Budget[] = [
  { category: "food", amount: 400, spent: 200 },
  { category: "housing", amount: 1200, spent: 900 },
  { category: "transportation", amount: 200, spent: 150 },
  { category: "entertainment", amount: 150, spent: 100 },
  { category: "utilities", amount: 250, spent: 200 },
  { category: "healthcare", amount: 100, spent: 50 },
  { category: "other", amount: 200, spent: 30 },
];

const mockMonthlyData: MonthlyData[] = [
  { month: "Jan", income: 3500, expenses: 2800 },
  { month: "Feb", income: 3500, expenses: 2900 },
  { month: "Mar", income: 3600, expenses: 2750 },
  { month: "Apr", income: 3600, expenses: 1630 },
];

interface BudgetContextType {
  transactions: Transaction[];
  budgets: Budget[];
  monthlyData: MonthlyData[];
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  updateBudget: (category: Category, amount: number) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [monthlyData] = useState<MonthlyData[]>(mockMonthlyData);

  const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
  const totalSpent = budgets.reduce((acc, budget) => acc + budget.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    
    setTransactions([newTransaction, ...transactions]);
    
    // Update the spent amount for the category
    setBudgets(
      budgets.map((budget) =>
        budget.category === transaction.category
          ? { ...budget, spent: budget.spent + transaction.amount }
          : budget
      )
    );
  };

  const deleteTransaction = (id: string) => {
    const transactionToDelete = transactions.find(t => t.id === id);
    if (!transactionToDelete) return;

    // Remove the transaction
    setTransactions(transactions.filter(t => t.id !== id));
    
    // Update the spent amount for the category
    setBudgets(
      budgets.map((budget) =>
        budget.category === transactionToDelete.category
          ? { ...budget, spent: budget.spent - transactionToDelete.amount }
          : budget
      )
    );
  };

  const updateBudget = (category: Category, amount: number) => {
    setBudgets(
      budgets.map((budget) =>
        budget.category === category
          ? { ...budget, amount }
          : budget
      )
    );
  };

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        budgets,
        monthlyData,
        totalBudget,
        totalSpent,
        totalRemaining,
        addTransaction,
        deleteTransaction,
        updateBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
