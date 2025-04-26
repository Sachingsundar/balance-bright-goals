
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useBudget } from '@/contexts/BudgetContext';
import { CATEGORIES } from '@/types/budget';
import { formatCurrency } from '@/utils/currency';
import { toast } from 'sonner';

const TransactionHistory: React.FC = () => {
  const { transactions, deleteTransaction } = useBudget();

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDelete = (id: string) => {
    deleteTransaction(id);
    toast.success('Transaction deleted successfully');
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
                className="flex items-center justify-between border-b px-5 py-3 last:border-0 group"
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
                <div className="flex items-center gap-4">
                  <span className="font-medium">{formatCurrency(transaction.amount)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive hover:text-destructive/90" />
                    <span className="sr-only">Delete transaction</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
