
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, TrendingDown, TrendingUp } from 'lucide-react';
import { CATEGORIES } from '@/types/budget';
import { formatCurrency } from '@/utils/currency';
import { Transaction } from '@/contexts/BudgetContext';

interface RecentTransactionsListProps {
  transactions: Transaction[];
}

export const RecentTransactionsList = ({ transactions }: RecentTransactionsListProps) => {
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
                className="flex items-center justify-between border-b px-4 py-3 last:border-0"
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
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${transaction.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                    {formatCurrency(transaction.amount)}
                  </span>
                  {transaction.amount > 0 ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
