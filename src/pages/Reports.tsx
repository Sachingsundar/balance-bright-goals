
import React from 'react';
import { useBudget } from '@/contexts/BudgetContext';
import { BudgetProvider } from '@/contexts/BudgetContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartPie, BarChart3, FileText, Home, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/types/budget';
import { formatCurrency } from '@/utils/currency';
import { CustomTooltip, CustomLegend } from '../components/charts/ChartComponents';

const ReportsContent: React.FC = () => {
  const { budgets, transactions, monthlyData } = useBudget();

  const categoryData = budgets
    .filter(budget => budget.spent > 0)
    .map((budget) => ({
      name: CATEGORIES[budget.category].label,
      value: budget.spent,
      color: `var(--expense-${budget.category})`,
    }));

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
            <Link to="/budget">
              <Wallet className="mr-2 h-5 w-5" />
              Budget
            </Link>
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <ChartPie className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Financial Reports</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ChartPie className="mr-2 h-5 w-5" />
              Category Spending
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} className="dark:text-white/80" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Monthly Financial Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} className="dark:text-white/80">
                <XAxis 
                  dataKey="month" 
                  className="dark:text-white/80" 
                  tick={{ fill: 'currentColor', className: 'dark:text-white/80' }} 
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value).split('.')[0]} 
                  className="dark:text-white/80" 
                  tick={{ fill: 'currentColor', className: 'dark:text-white/80' }} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} className="dark:text-white/80" />
                <Bar dataKey="income" name="Income" fill="var(--success)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="var(--destructive)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="netAmount" name="Net Amount" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

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
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Reports: React.FC = () => {
  return (
    <BudgetProvider>
      <ReportsContent />
    </BudgetProvider>
  );
};

export default Reports;
