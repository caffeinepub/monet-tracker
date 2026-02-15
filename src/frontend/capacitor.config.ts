import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.expensetracker.app',
  appName: 'ExpenseTracker',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // For production, you can set a remote URL here
    // url: 'https://your-canister-id.ic0.app',
    // cleartext: true
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;
