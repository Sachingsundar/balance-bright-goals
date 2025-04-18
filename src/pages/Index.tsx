
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import BudgetSummary from '@/components/BudgetSummary';
import ExpenseChart from '@/components/ExpenseChart';
import BudgetGoalList from '@/components/BudgetGoalList';
import TransactionHistory from '@/components/TransactionHistory';
import AddTransactionButton from '@/components/AddTransactionButton';
import { BudgetProvider } from '@/contexts/BudgetContext';

const Index: React.FC = () => {
  return (
    <BudgetProvider>
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 container py-6 space-y-6">
          <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>
          <BudgetSummary />
          <ExpenseChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BudgetGoalList />
            <TransactionHistory />
          </div>
        </main>
        <AddTransactionButton />
      </div>
    </BudgetProvider>
  );
};

export default Index;
