
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBudget } from '@/contexts/BudgetContext';
import { CATEGORIES } from '@/types/budget';
import { formatCurrency } from '@/utils/currency';

const TransactionHistory: React.FC = () => {
  const { transactions } = useBudget();

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="dashboard-card animate-in" style={{ animationDelay: '600ms' }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2">
          {transactions.map((transaction) => {
            const category = CATEGORIES[transaction.category];
            
            return (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between border-b px-5 py-3 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `var(--${category.color})` }}
                  >
                    <span className="text-white text-xs">{category.label.substring(0, 1)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <span className="font-medium">{formatCurrency(transaction.amount)}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
