/**
 * Capacitor-specific authentication bridge for Internet Identity
 * Handles the authentication flow in a native WebView context
 * Uses indirect imports to avoid build-time dependencies
 */

import { isCapacitor } from './capacitorRuntime';

let browserModule: any = null;
let appModule: any = null;
let authCallbackResolver: ((success: boolean) => void) | null = null;

/**
 * Dynamically load Capacitor Browser plugin
 * Uses Function constructor to bypass TypeScript module resolution
 */
async function loadBrowser() {
  if (browserModule) return browserModule;
  
  try {
    // Use indirect import to bypass TypeScript checking
    const importFn = new Function('specifier', 'return import(specifier)');
    browserModule = await importFn('@capacitor/browser');
    return browserModule;
  } catch {
    console.warn('Capacitor Browser plugin not available');
    return null;
  }
}

/**
 * Dynamically load Capacitor App plugin
 * Uses Function constructor to bypass TypeScript module resolution
 */
async function loadApp() {
  if (appModule) return appModule;
  
  try {
    // Use indirect import to bypass TypeScript checking
    const importFn = new Function('specifier', 'return import(specifier)');
    appModule = await importFn('@capacitor/app');
    return appModule;
  } catch {
    console.warn('Capacitor App plugin not available');
    return null;
  }
}

/**
 * Initialize the Capacitor auth bridge
 * Sets up deep link listeners for authentication callbacks
 */
export async function initializeCapacitorAuthBridge(): Promise<void> {
  if (!isCapacitor()) {
    return;
  }

  const app = await loadApp();
  if (!app?.App) {
    console.warn('Capacitor App plugin not loaded');
    return;
  }

  // Listen for app URL open events (deep links)
  app.App.addListener('appUrlOpen', (event: any) => {
    console.log('App URL opened:', event.url);
    
    // Check if this is an auth callback
    if (event.url.startsWith('expensetracker://auth')) {
      handleAuthCallback(event.url);
    }
  });

  console.log('Capacitor auth bridge initialized');
}

/**
 * Handle authentication callback from deep link
 */
async function handleAuthCallback(url: string): Promise<void> {
  console.log('Handling auth callback:', url);
  
  const browser = await loadBrowser();
  
  // Close the browser if it's still open
  if (browser?.Browser) {
    browser.Browser.close().catch(() => {
      // Browser might already be closed
    });
  }

  // Resolve the auth promise
  if (authCallbackResolver) {
    authCallbackResolver(true);
    authCallbackResolver = null;
  }
}

/**
 * Open Internet Identity in the system browser for authentication
 * Returns a promise that resolves when authentication completes
 */
export async function openInternetIdentityForAuth(identityUrl: string): Promise<boolean> {
  if (!isCapacitor()) {
    // Not in Capacitor, use default behavior
    return false;
  }

  const browser = await loadBrowser();
  if (!browser?.Browser) {
    console.warn('Capacitor Browser plugin not available');
    return false;
  }

  try {
    // Open Internet Identity in system browser
    await browser.Browser.open({
      url: identityUrl,
      presentationStyle: 'popover',
      toolbarColor: '#ffffff'
    });

    // Wait for the auth callback
    return new Promise<boolean>((resolve) => {
      authCallbackResolver = resolve;
      
      // Timeout after 5 minutes
      setTimeout(() => {
        if (authCallbackResolver) {
          authCallbackResolver(false);
          authCallbackResolver = null;
        }
      }, 5 * 60 * 1000);
    });
  } catch (error) {
    console.error('Error opening Internet Identity:', error);
    return false;
  }
}

/**
 * Clean up the auth bridge
 */
export function cleanupCapacitorAuthBridge(): void {
  if (authCallbackResolver) {
    authCallbackResolver(false);
    authCallbackResolver = null;
  }
}
