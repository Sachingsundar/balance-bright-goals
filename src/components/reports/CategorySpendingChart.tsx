
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartPie } from 'lucide-react';
import { CustomTooltip, CustomLegend } from '../charts/ChartComponents';
import { CATEGORIES } from '@/types/budget';
import { Budget } from '@/contexts/BudgetContext';

interface CategorySpendingChartProps {
  budgets: Budget[];
}

export const CategorySpendingChart = ({ budgets }: CategorySpendingChartProps) => {
  const categoryData = budgets
    .filter(budget => budget.spent > 0)
    .map((budget) => ({
      name: CATEGORIES[budget.category].label,
      value: budget.spent,
      color: `var(--expense-${budget.category})`,
    }));

  return (
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
  );
};
