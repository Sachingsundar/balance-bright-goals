
import React from 'react';
import { Button } from '@/components/ui/button';
import { BadgeIndianRupee, Home, PieChart, Settings, User, MessageSquare } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const DashboardHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <BadgeIndianRupee className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold">Balance Bright</h1>
      </div>
      <nav className="hidden md:block">
        <ul className="flex items-center gap-4">
          <li>
            <Button 
              variant={isActive('/') ? 'default' : 'ghost'} 
              className={cn("flex items-center gap-2", 
                isActive('/') && "bg-primary text-primary-foreground"
              )} 
              asChild
            >
              <Link to="/">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button 
              variant={isActive('/reports') ? 'default' : 'ghost'} 
              className={cn("flex items-center gap-2",
                isActive('/reports') && "bg-primary text-primary-foreground"
              )} 
              asChild
            >
              <Link to="/reports">
                <PieChart className="h-4 w-4" />
                <span>Reports</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button 
              variant={isActive('/budget') ? 'default' : 'ghost'} 
              className={cn("flex items-center gap-2",
                isActive('/budget') && "bg-primary text-primary-foreground"
              )} 
              asChild
            >
              <Link to="/budget">
                <Home className="h-4 w-4" />
                <span>Budget</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button 
              variant={isActive('/feedback') ? 'default' : 'ghost'} 
              className={cn("flex items-center gap-2",
                isActive('/feedback') && "bg-primary text-primary-foreground"
              )} 
              asChild
            >
              <Link to="/feedback">
                <MessageSquare className="h-4 w-4" />
                <span>Feedback</span>
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button variant="outline" size="icon" asChild>
            <Link to="/signin">
              <User className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
