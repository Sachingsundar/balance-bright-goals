
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBudget } from '@/contexts/BudgetContext';
import { formatCurrency } from '@/utils/currency';
import { ArrowUp, TrendingUp, Ban, AlertTriangle } from 'lucide-react';

const FinancialInsights: React.FC = () => {
  const { transactions, budgets, totalBudget, totalSpent } = useBudget();
  
  // Find the category with the highest spending
  const topSpendingCategory = [...budgets]
    .sort((a, b) => b.spent - a.spent)[0];
    
  // Calculate % of budget spent
  const percentSpent = Math.round((totalSpent / totalBudget) * 100);
  
  // Get recent transactions
  const recentTransactions = transactions.slice(0, 5);
  
  // Find categories that are over budget
  const overBudgetCategories = budgets.filter(b => 
    b.spent > b.amount
  );
  
  // Generate simple insight message
  const getInsightMessage = () => {
    if (percentSpent > 90) {
      return "You've nearly spent your entire budget. Consider cutting back on expenses.";
    } else if (percentSpent > 75) {
      return "You've spent more than 75% of your budget. Monitor spending closely.";
    } else if (percentSpent < 30) {
      return "You're well under budget. Great job managing your finances!";
    } else {
      return "Your spending is on track with your budget.";
    }
  };
  
  return (
    <Card className="dashboard-card animate-in" style={{ animationDelay: '600ms' }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Financial Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-md">
          <p className="text-sm">{getInsightMessage()}</p>
        </div>
        
        {topSpendingCategory && (
          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-warning/20 p-2">
              <TrendingUp className="h-4 w-4 text-warning" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Top Spending Category</h4>
              <p className="text-xs text-muted-foreground">
                {topSpendingCategory.category} - {formatCurrency(topSpendingCategory.spent)}
              </p>
            </div>
          </div>
        )}
        
        {overBudgetCategories.length > 0 && (
          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-destructive/20 p-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Budget Alerts</h4>
              <p className="text-xs text-muted-foreground">
                {overBudgetCategories.length} {overBudgetCategories.length === 1 ? 'category' : 'categories'} over budget
              </p>
              <ul className="mt-1 text-xs">
                {overBudgetCategories.map(cat => (
                  <li key={cat.category} className="text-destructive">
                    {cat.category} is over by {formatCurrency(cat.spent - cat.amount)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <div className="flex items-start space-x-3">
          <div className="rounded-full bg-primary/20 p-2">
            <ArrowUp className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium">Budget Utilization</h4>
            <p className="text-xs text-muted-foreground">
              You've spent {percentSpent}% of your total budget
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialInsights;
