import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme();

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
