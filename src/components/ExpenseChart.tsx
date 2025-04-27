
import React from 'react';
import { useBudget } from '@/contexts/BudgetContext';
import SpendingPieChart from './charts/SpendingPieChart';
import IncomeExpensesChart from './charts/IncomeExpensesChart';

const ExpenseChart: React.FC = () => {
  const { budgets, monthlyData } = useBudget();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SpendingPieChart budgets={budgets} />
      <IncomeExpensesChart monthlyData={monthlyData} />
    </div>
  );
};

export default ExpenseChart;
