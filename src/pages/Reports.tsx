
import React, { useState } from 'react';
import { useBudget } from '@/contexts/BudgetContext';
import { BudgetProvider } from '@/contexts/BudgetContext';
import { toast } from '@/components/ui/use-toast';
import ExpenseChart from '@/components/ExpenseChart';
import ReportsHeader from '@/components/reports/ReportsHeader';
import RecentTransactions from '@/components/reports/RecentTransactions';
import { CATEGORIES } from '@/types/budget';
import { formatCurrency } from '@/utils/currency';

const ReportsContent: React.FC = () => {
  const { budgets, transactions, deleteTransaction } = useBudget();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
    toast({
      title: "Transaction deleted",
      description: "Your transaction has been successfully deleted",
      variant: "default",
    });
  };

  const generateAIReport = async () => {
    setIsGenerating(true);
    try {
      const totalSpent = budgets.reduce((acc, budget) => acc + budget.spent, 0);
      const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
      const topCategory = [...budgets].sort((a, b) => b.spent - a.spent)[0];
      const overBudgetCategories = budgets.filter(b => b.spent > b.amount);
      
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Create a concise financial summary report based on these stats:
          - Total spent: ${formatCurrency(totalSpent)}
          - Total budget: ${formatCurrency(totalBudget)}
          - Top spending category: ${CATEGORIES[topCategory.category].label} (${formatCurrency(topCategory.spent)})
          - Number of categories over budget: ${overBudgetCategories.length}
          - Latest transactions: ${transactions.slice(0, 3).map(t => 
            `${CATEGORIES[t.category].label}: ${formatCurrency(t.amount)}`).join(', ')}
          `
        })
      });

      if (!response.ok) throw new Error('Failed to generate report');
      
      const data = await response.json();
      toast({
        title: "Financial Summary Report",
        description: data.generatedText,
        duration: 10000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6">
      <ReportsHeader 
        onGenerateReport={generateAIReport}
        isGenerating={isGenerating}
      />
      
      <ExpenseChart />
      
      <RecentTransactions 
        transactions={transactions}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
};

const Reports: React.FC = () => (
  <BudgetProvider>
    <ReportsContent />
  </BudgetProvider>
);

export default Reports;
