
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Budget } from '@/types/budget';
import { CATEGORIES } from '@/types/budget';
import { formatCurrency } from '@/utils/currency';

interface SpendingPieChartProps {
  budgets: Budget[];
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))', 
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--destructive))',
  'hsl(var(--muted))',
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-background p-3 border rounded-lg shadow-lg">
        <p className="font-medium text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          Amount: <span className="font-semibold text-foreground">{formatCurrency(data.value)}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {((data.value / payload[0].payload.total) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.05) return null; // Hide labels for slices smaller than 5%
  
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-sm font-medium drop-shadow-md"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SpendingPieChart: React.FC<SpendingPieChartProps> = ({ budgets }) => {
  const categoryData = budgets
    .filter(budget => budget.spent > 0)
    .map((budget) => ({
      name: CATEGORIES[budget.category].label,
      value: budget.spent,
      category: budget.category,
    }));

  // Calculate total for percentage calculation
  const total = categoryData.reduce((sum, item) => sum + item.value, 0);
  const dataWithTotal = categoryData.map(item => ({ ...item, total }));

  // If no data, show a message
  if (categoryData.length === 0) {
    return (
      <Card className="h-full w-full">
        <CardHeader className="pb-4 text-center">
          <CardTitle className="text-xl font-semibold">Spending by Category</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-muted-foreground text-lg">No spending data available</p>
            <p className="text-sm text-muted-foreground mt-1">Start adding transactions to see your spending breakdown</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full w-full">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-xl font-semibold">Spending by Category</CardTitle>
        <p className="text-sm text-muted-foreground">
          Total spent: {formatCurrency(total)}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-4">
        <div className="w-full h-[380px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithTotal}
                cx="50%"
                cy="45%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={110}
                innerRadius={45}
                paddingAngle={2}
                dataKey="value"
                stroke="#ffffff"
                strokeWidth={2}
              >
                {dataWithTotal.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ 
                  paddingTop: "15px",
                  fontSize: "13px",
                  textAlign: "center"
                }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingPieChart;
