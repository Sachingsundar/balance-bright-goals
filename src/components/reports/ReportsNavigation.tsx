
import { Home, Wallet, BarChartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const ReportsNavigation = () => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" asChild>
          <Link to="/">
            <Home className="mr-2 h-5 w-5" />
            Home
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/budget">
            <Wallet className="mr-2 h-5 w-5" />
            Budget
          </Link>
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <BarChartIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Financial Reports</h1>
      </div>
    </div>
  );
};
