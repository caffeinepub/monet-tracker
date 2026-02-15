/**
 * Capacitor runtime utilities with optional loading
 * These functions gracefully handle cases where Capacitor is not available
 */

let capacitorModule: any = null;
let capacitorLoaded = false;

/**
 * Dynamically load Capacitor if available
 * Uses Function constructor to bypass TypeScript module resolution
 */
async function loadCapacitor() {
  if (capacitorLoaded) return capacitorModule;
  
  try {
    // Use indirect import to bypass TypeScript checking
    const importFn = new Function('specifier', 'return import(specifier)');
    capacitorModule = await importFn('@capacitor/core');
    capacitorLoaded = true;
    return capacitorModule;
  } catch {
    // Capacitor not available (web-only build)
    capacitorLoaded = true;
    return null;
  }
}

/**
 * Detects if the app is running inside a Capacitor native container
 */
export function isCapacitor(): boolean {
  // Check if running in native context
  if (typeof window === 'undefined') return false;
  
  // Check for Capacitor global
  return !!(window as any).Capacitor?.isNativePlatform?.();
}

/**
 * Gets the current platform (ios, android, web)
 */
export function getPlatform(): string {
  if (typeof window === 'undefined') return 'web';
  
  const cap = (window as any).Capacitor;
  if (cap?.getPlatform) {
    return cap.getPlatform();
  }
  
  return 'web';
}

/**
 * Initializes Capacitor-specific behaviors for the app
 * This should be called early in the app lifecycle
 */
export async function initializeCapacitorRuntime(): Promise<void> {
  const cap = await loadCapacitor();
  
  if (!cap || !isCapacitor()) {
    return;
  }

  console.log(`Running on Capacitor platform: ${getPlatform()}`);

  // Handle back button on Android
  if (getPlatform() === 'android') {
    // Back button handling can be added here if needed
    // using App.addListener('backButton', ...)
  }
}

/**
 * Checks if external navigation should be handled differently
 * In Capacitor, we may want to open external links in the system browser
 */
export function shouldOpenExternally(url: string): boolean {
  if (!isCapacitor()) {
    return false;
  }

  // Open external domains in system browser
  const externalDomains = ['identity.ic0.app', 'identity.internetcomputer.org'];
  try {
    const urlObj = new URL(url);
    return externalDomains.some(domain => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
}
