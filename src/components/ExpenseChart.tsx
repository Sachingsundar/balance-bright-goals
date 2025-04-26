
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, TooltipProps } from 'recharts';
import { useBudget } from '@/contexts/BudgetContext';
import { CATEGORIES } from '@/types/budget';
import { formatCurrency } from '@/utils/currency';

const RADIAN = Math.PI / 180;
const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#F97316', '#0EA5E9', '#D946EF', '#ea384c'];

const ExpenseChart: React.FC = () => {
  const { budgets, monthlyData } = useBudget();

  const categoryData = budgets
    .filter(budget => budget.spent > 0) // Only show categories with spending
    .map((budget) => ({
      name: CATEGORIES[budget.category].label,
      value: budget.spent,
      color: `var(--expense-${budget.category})`,
    }));

  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
    index 
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return percent * 100 > 5 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded shadow text-sm">
          <p className="font-medium">{`${payload[0].name}`}</p>
          <p className="text-muted-foreground">{formatCurrency(payload[0].value as number)}</p>
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
                outerRadius={90}
                innerRadius={60}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: "20px", marginBottom: "-15px" }}
              />
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
                top: 20,
                right: 30,
                left: 20,
                bottom: 40,
              }}
            >
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value).split('.')[0]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingBottom: "10px", marginTop: "5px" }}
              />
              <Bar 
                dataKey="income" 
                name="Income" 
                fill="var(--success)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="expenses" 
                name="Expenses" 
                fill="var(--destructive)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseChart;
