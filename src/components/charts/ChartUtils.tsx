
import { TooltipProps } from 'recharts';
import { formatCurrency } from '@/utils/currency';

export const CHART_COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#F97316', '#0EA5E9', '#D946EF', '#ea384c'];
export const RADIAN = Math.PI / 180;

export const CustomTooltip = ({
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

export const renderCustomizedLabel = ({ 
  cx, 
  cy, 
  midAngle, 
  innerRadius, 
  outerRadius, 
  percent,
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
