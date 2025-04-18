
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useBudget } from '@/contexts/BudgetContext';
import { ArrowDownRight, ArrowUpRight, DollarSign } from 'lucide-react';

const BudgetSummary: React.FC = () => {
  const { totalBudget, totalSpent, totalRemaining } = useBudget();
  const percentSpent = Math.round((totalSpent / totalBudget) * 100);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="dashboard-card animate-in">
        <CardContent className="p-0">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Total Budget</span>
              <div className="rounded-full bg-primary/10 p-1">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold">{formatCurrency(totalBudget)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card animate-in" style={{ animationDelay: '100ms' }}>
        <CardContent className="p-0">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Spent</span>
              <div className="rounded-full bg-destructive/10 p-1">
                <ArrowUpRight className="h-4 w-4 text-destructive" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold">{formatCurrency(totalSpent)}</span>
              <div className="mt-2">
                <Progress value={percentSpent} className="h-2" />
                <span className="text-xs text-muted-foreground">{percentSpent}% of budget</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card animate-in" style={{ animationDelay: '200ms' }}>
        <CardContent className="p-0">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Remaining</span>
              <div className="rounded-full bg-success/10 p-1">
                <ArrowDownRight className="h-4 w-4 text-success" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold">{formatCurrency(totalRemaining)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetSummary;
