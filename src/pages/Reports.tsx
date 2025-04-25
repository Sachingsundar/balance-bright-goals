
import React from 'react';
import { useBudget } from '@/contexts/BudgetContext';
import { BudgetProvider } from '@/contexts/BudgetContext';
import { ReportsNavigation } from '@/components/reports/ReportsNavigation';
import { CategorySpendingChart } from '@/components/reports/CategorySpendingChart';
import { MonthlyTrendsChart } from '@/components/reports/MonthlyTrendsChart';
import { RecentTransactionsList } from '@/components/reports/RecentTransactionsList';

const ReportsContent: React.FC = () => {
  const { budgets, transactions, monthlyData } = useBudget();

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6">
      <ReportsNavigation />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategorySpendingChart budgets={budgets} />
        <MonthlyTrendsChart monthlyData={monthlyData} />
      </div>

      <RecentTransactionsList transactions={transactions} />
    </div>
  );
};

const Reports: React.FC = () => {
  return (
    <BudgetProvider>
      <ReportsContent />
    </BudgetProvider>
  );
};

export default Reports;
