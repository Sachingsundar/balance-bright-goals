
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Trash2 } from 'lucide-react';
import { Transaction, CATEGORIES } from '@/types/budget';
import { formatCurrency } from '@/utils/currency';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ 
  transactions, 
  onDeleteTransaction 
}) => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {transactions.slice(0, 10).map((transaction) => {
            const category = CATEGORIES[transaction.category];
            return (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between border-b px-4 py-3 last:border-0 group"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `var(--${category.color})` }}
                  >
                    <span className="text-white text-xs">
                      {category.label.substring(0, 1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${transaction.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                    {formatCurrency(transaction.amount)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
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

export default RecentTransactions;
