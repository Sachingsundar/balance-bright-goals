
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import BudgetSummary from '@/components/BudgetSummary';
import BudgetGoalList from '@/components/BudgetGoalList';
import TransactionHistory from '@/components/TransactionHistory';
import AddTransactionButton from '@/components/AddTransactionButton';
import { QuickAddTransaction } from '@/components/QuickAddTransaction';
import { ThemeToggle } from '@/components/ThemeToggle';
import FinancialInsights from '@/components/FinancialInsights';
import { BudgetProvider } from '@/contexts/BudgetContext';

const Index: React.FC = () => {
  return (
    <BudgetProvider>
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 container py-6 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Financial Dashboard</h1>
            <div className="flex items-center gap-3">
              <QuickAddTransaction />
              <ThemeToggle />
            </div>
          </div>
          <BudgetSummary />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <FinancialInsights />
            </div>
            <div className="md:col-span-1">
              <BudgetGoalList />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <TransactionHistory />
          </div>
        </main>
        <AddTransactionButton />
      </div>
    </BudgetProvider>
  );
};

export default Index;
