
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, CreditCard, Home, PieChart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <CreditCard className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold">Balance Bright</h1>
      </div>
      <nav className="hidden md:block">
        <ul className="flex items-center gap-4">
          <li>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link to="/">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link to="/reports">
                <PieChart className="h-4 w-4" />
                <span>Reports</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Budget</span>
            </Button>
          </li>
        </ul>
      </nav>
      <Button variant="outline" size="icon" className="ml-auto md:ml-0">
        <Settings className="h-4 w-4" />
      </Button>
    </header>
  );
};

export default DashboardHeader;
