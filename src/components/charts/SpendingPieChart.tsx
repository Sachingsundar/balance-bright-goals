
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Budget } from '@/types/budget';
import { CATEGORIES } from '@/types/budget';
import { CHART_COLORS, CustomTooltip, renderCustomizedLabel } from './ChartUtils';

interface SpendingPieChartProps {
  budgets: Budget[];
}

const SpendingPieChart: React.FC<SpendingPieChartProps> = ({ budgets }) => {
  const categoryData = budgets
    .filter(budget => budget.spent > 0)
    .map((budget) => ({
      name: CATEGORIES[budget.category].label,
      value: budget.spent,
      color: `var(--expense-${budget.category})`,
    }));

  // If no data, show a message
  if (categoryData.length === 0) {
    return (
      <Card className="h-full w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Spending by Category</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[400px]">
          <p className="text-muted-foreground">No spending data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Spending by Category</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              innerRadius={80}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: "20px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingPieChart;
