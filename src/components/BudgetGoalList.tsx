
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useBudget } from '@/contexts/BudgetContext';
import { CATEGORIES } from '@/types/budget';
import { formatCurrency } from '@/utils/currency';

const BudgetGoalList: React.FC = () => {
  const { budgets } = useBudget();

  return (
    <Card className="dashboard-card animate-in overflow-hidden" style={{ animationDelay: '500ms' }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Budget Goals</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-4 px-5 pb-4">
          {budgets.map((budget) => {
            const percentageSpent = Math.min(100, Math.round((budget.spent / budget.amount) * 100));
            const category = CATEGORIES[budget.category];
            
            return (
              <div key={budget.category} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: `var(--${category.color})` }}
                    />
                    <span className="text-sm font-medium">{category.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={percentageSpent} 
                    className="h-2"
                    style={{ 
                      "--progress-background": `var(--${category.color})`,
                    } as React.CSSProperties} 
                  />
                  <span className="text-xs font-medium min-w-[40px]">{percentageSpent}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetGoalList;
