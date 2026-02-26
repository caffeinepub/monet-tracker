import { Link, useRouterState } from '@tanstack/react-router';
import { LayoutDashboard, PlusCircle, List, Calculator, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PrimaryNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/add', label: 'Add Expense', icon: PlusCircle },
    { path: '/expenses', label: 'Expenses', icon: List },
    { path: '/calculator', label: 'Calculator', icon: Calculator },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="flex items-center space-x-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;
        
        return (
          <Link key={item.path} to={item.path}>
            <Button
              variant={isActive ? 'default' : 'ghost'}
              size="sm"
              className={`gap-2 rounded-xl ${isActive ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
