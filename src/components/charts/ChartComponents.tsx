
import { formatCurrency } from '@/utils/currency';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground p-4 rounded-lg shadow-lg border">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">{payload[0].name}</span>
        </div>
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex justify-between">
            <span className="mr-4 text-muted-foreground">{item.dataKey}</span>
            <span className="font-bold">{formatCurrency(item.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface CustomLegendProps {
  payload?: any[];
}

export const CustomLegend = ({ payload }: CustomLegendProps) => {
  return (
    <div className="flex justify-center items-center space-x-4 dark:text-white/80">
      {payload?.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center space-x-1">
          <div 
            className="w-3 h-3 rounded-sm" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};
