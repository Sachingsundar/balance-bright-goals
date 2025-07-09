
import React from 'react';
import { useBudget } from '@/contexts/BudgetContext';
import SpendingPieChart from './charts/SpendingPieChart';
import IncomeExpensesChart from './charts/IncomeExpensesChart';

const ExpenseChart: React.FC = () => {
  const { budgets, monthlyData } = useBudget();

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-lg h-[500px]">
            <SpendingPieChart budgets={budgets} />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-full h-[500px]">
            <IncomeExpensesChart monthlyData={monthlyData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
