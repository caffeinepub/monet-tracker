import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { useCurrency } from '@/hooks/useCurrency';
import { CURRENCIES } from '@/constants/currencies';
import type { CurrencyCode } from '@/constants/currencies';
import { Loader2 } from 'lucide-react';

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme();
  const { currency, setCurrency, isSetting } = useCurrency();

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-foreground mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Customize your app preferences
        </p>
      </div>

      <Card className="rounded-xl border border-border shadow-card bg-white">
        <CardHeader className="px-5 pt-5 pb-2">
          <CardTitle className="text-base font-semibold">Appearance</CardTitle>
          <CardDescription className="text-xs">Customize how the app looks</CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode" className="text-sm font-medium">Dark Mode</Label>
              <p className="text-xs text-muted-foreground">
                Switch between light and dark themes
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl border border-border shadow-card bg-white">
        <CardHeader className="px-5 pt-5 pb-2">
          <CardTitle className="text-base font-semibold">Currency</CardTitle>
          <CardDescription className="text-xs">
            Choose the currency used to display all amounts
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="grid grid-cols-3 gap-3">
            {CURRENCIES.map((option) => {
              const isSelected = currency === option.code;
              return (
                <button
                  key={option.code}
                  onClick={() => setCurrency(option.code as CurrencyCode)}
                  disabled={isSetting}
                  className={[
                    'relative flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl border-2 transition-all',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary shadow-sm'
                      : 'border-border bg-muted/20 text-foreground hover:border-primary/40 hover:bg-primary/5',
                    isSetting && !isSelected ? 'opacity-50 cursor-not-allowed' : '',
                  ].join(' ')}
                >
                  {isSetting && isSelected && (
                    <Loader2 className="absolute top-2 right-2 h-3 w-3 animate-spin text-primary" />
                  )}
                  <span className="text-2xl font-bold leading-none">{option.symbol}</span>
                  <span className="text-xs font-semibold tracking-wide">{option.code}</span>
                  <span className="text-xs text-muted-foreground text-center leading-tight">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl border border-border shadow-card bg-white">
        <CardHeader className="px-5 pt-5 pb-2">
          <CardTitle className="text-base font-semibold">About</CardTitle>
          <CardDescription className="text-xs">Application information</CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-3">
          <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
            <span className="text-sm text-muted-foreground">Version</span>
            <span className="text-sm font-semibold">1.0.0</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
            <span className="text-sm text-muted-foreground">Platform</span>
            <span className="text-sm font-semibold">Internet Computer</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
