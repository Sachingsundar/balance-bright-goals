
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

  return (
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
              wrapperStyle={{ paddingTop: "20px", marginBottom: "-15px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingPieChart;
