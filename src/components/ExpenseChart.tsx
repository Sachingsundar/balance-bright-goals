
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Legend, TooltipProps } from 'recharts';
import { useBudget } from '@/contexts/BudgetContext';
import { CATEGORIES } from '@/types/budget';

const RADIAN = Math.PI / 180;

const ExpenseChart: React.FC = () => {
  const { budgets, monthlyData } = useBudget();

  const categoryData = budgets.map((budget) => ({
    name: CATEGORIES[budget.category].label,
    value: budget.spent,
    color: `var(--expense-${budget.category})`,
  }));

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded shadow text-sm">
          <p className="font-medium">{`${payload[0].name}`}</p>
          <p className="text-muted-foreground">{`$${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="dashboard-card h-80 animate-in" style={{ animationDelay: '300ms' }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="dashboard-card h-80 animate-in" style={{ animationDelay: '400ms' }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Income vs. Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 30,
              }}
            >
              <XAxis dataKey="month" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="income" name="Income" fill="var(--success)" />
              <Bar dataKey="expenses" name="Expenses" fill="var(--destructive)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseChart;
