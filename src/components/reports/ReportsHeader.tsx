
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Wallet, FileJson, ChartPie } from 'lucide-react';

interface ReportsHeaderProps {
  onGenerateReport: () => void;
  isGenerating: boolean;
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({ onGenerateReport, isGenerating }) => {
  return (
    <div className="flex items-center justify-between mb-6">
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
      <div className="flex items-center gap-4">
        <Button 
          onClick={onGenerateReport} 
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          <FileJson className="h-5 w-5" />
          {isGenerating ? "Generating..." : "Generate Report"}
        </Button>
        <div className="flex items-center space-x-4">
          <ChartPie className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Financial Reports</h1>
        </div>
      </div>
    </div>
  );
};

export default ReportsHeader;
