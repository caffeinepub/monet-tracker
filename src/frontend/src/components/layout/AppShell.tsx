import { Outlet } from '@tanstack/react-router';
import { PrimaryNav } from './PrimaryNav';
import { Heart } from 'lucide-react';
import { useEffect } from 'react';
import { initializeCapacitorRuntime } from '@/utils/capacitorRuntime';
import { initializeCapacitorAuthBridge } from '@/utils/capacitorAuthBridge';

export function AppShell() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'expense-tracker'
  );

  // Initialize Capacitor runtime on mount
  useEffect(() => {
    // Initialize asynchronously without blocking render
    initializeCapacitorRuntime().catch(err => {
      console.warn('Failed to initialize Capacitor runtime:', err);
    });
    
    initializeCapacitorAuthBridge().catch(err => {
      console.warn('Failed to initialize Capacitor auth bridge:', err);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-8 flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">ExpenseTracker</span>
          </div>
          <PrimaryNav />
        </div>
      </header>

      <main className="flex-1 container py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border/40 py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} ExpenseTracker. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 fill-chart-1 text-chart-1" />
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
