
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlyData } from '@/types/budget';
import { formatCurrency } from '@/utils/currency';
import { CustomTooltip } from './ChartUtils';

interface IncomeExpensesChartProps {
  monthlyData: MonthlyData[];
}

const IncomeExpensesChart: React.FC<IncomeExpensesChartProps> = ({ monthlyData }) => {
  // If no data, show a message
  if (!monthlyData || monthlyData.length === 0) {
    return (
      <Card className="dashboard-card h-full animate-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Income vs. Expenses</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">No monthly data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card h-full animate-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Income vs. Expenses</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
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
  );
};

export default IncomeExpensesChart;
