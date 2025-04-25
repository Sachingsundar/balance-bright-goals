
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { CustomTooltip, CustomLegend } from '../charts/ChartComponents';
import { formatCurrency } from '@/utils/currency';
import { MonthlyData } from '@/contexts/BudgetContext';

interface MonthlyTrendsChartProps {
  monthlyData: MonthlyData[];
}

export const MonthlyTrendsChart = ({ monthlyData }: MonthlyTrendsChartProps) => {
  const chartData = monthlyData.map((data) => ({
    ...data,
    netAmount: data.income - data.expenses,
  }));

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          Monthly Financial Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} className="dark:text-white/80">
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
  );
};
