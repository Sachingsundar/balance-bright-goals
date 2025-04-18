
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Home, Wallet, BarChart } from 'lucide-react';
import { useBudget } from '@/contexts/BudgetContext';
import { Category, CATEGORIES } from '@/types/budget';
import { Link } from 'react-router-dom';

const BudgetContent: React.FC = () => {
  const { budgets, updateBudget } = useBudget();

  const handleBudgetChange = (category: Category, value: string) => {
    const amount = parseFloat(value) || 0;
    updateBudget(category, amount);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/reports">
              <BarChart className="mr-2 h-5 w-5" />
              Reports
            </Link>
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Wallet className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Budget Management</h1>
        </div>
      </div>

      <div className="grid gap-6">
        {budgets.map((budget) => {
          const category = CATEGORIES[budget.category];
          const percentageSpent = Math.min(100, Math.round((budget.spent / budget.amount) * 100));
          
          return (
            <Card key={budget.category} className="dashboard-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-4 w-4 rounded-full" 
                      style={{ backgroundColor: `var(--${category.color})` }}
                    />
                    <span>{category.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ${budget.spent} spent of ${budget.amount}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-grow">
                      <Input
                        type="number"
                        value={budget.amount}
                        onChange={(e) => handleBudgetChange(budget.category, e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {percentageSpent}% spent
                    </span>
                  </div>
                  <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
                    <div 
                      className="h-full transition-all duration-500 ease-in-out rounded-full"
                      style={{
                        width: `${percentageSpent}%`,
                        backgroundColor: `var(--${category.color})`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const Budget: React.FC = () => {
  return (
    <BudgetProvider>
      <BudgetContent />
    </BudgetProvider>
  );
};

export default Budget;
