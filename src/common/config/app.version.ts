/**
 * Application Version Configuration
 * 
 * Version Strategy:
 * - ALL versions come from DB settings table
 * - When user logs in: appVersion fetched from DB → embedded in token
 * - When token validated: appVersion fetched from DB → compared with token
 * 
 * Flow:
 * 1. DB admin maintains APP_VERSION in settings table (e.g., 1.0.0, 2.0.0)
 * 2. During login, JWT includes appVersion from DB settings (current version)
 * 3. During token validation, check token.appVersion against DB setting (runtime)
 * 4. Admin can update DB settings anytime to change version compatibility
 * 
 * Benefits:
 * - All version control from single DB source
 * - No rebuild needed to change version
 * - Admin has full control
 * - No .env version coupling
 */

// Fallback version (used if DB is unavailable)
export const DEFAULT_APP_VERSION = '1.0.0';

/**
 * Get current app version from DB settings
 * This is used for token validation at runtime
 * Falls back to env if DB fetch fails
 * 
 * Must be awaited - this is an async function!
 */
export async function getAppVersionFromDb(settingsService: any, tenantId?: any): Promise<string> {
  if (!settingsService) {
    console.warn('SettingsService not provided, using default version');
    return DEFAULT_APP_VERSION;
  }

  try {
    return await settingsService.getAppVersion(tenantId);
  } catch (error) {
    console.warn('Failed to fetch APP_VERSION from DB, using default version:', error.message);
    return DEFAULT_APP_VERSION;
  }
}

/**
 * Parse version (1.0.0 -> [1, 0, 0])
 */
export function parseVersion(version: string): number[] {
  return version.split('.').map(v => parseInt(v, 10));
}

/**
 * Compare versions
 * Returns: -1 (v1 < v2), 0 (equal), 1 (v1 > v2)
 */
export function compareVersions(v1: string, v2: string): number {
  const [major1, minor1, patch1] = parseVersion(v1);
  const [major2, minor2, patch2] = parseVersion(v2);

  if (major1 !== major2) return major1 < major2 ? -1 : 1;
  if (minor1 !== minor2) return minor1 < minor2 ? -1 : 1;
  if (patch1 !== patch2) return patch1 < patch2 ? -1 : 1;
  return 0;
}

/**
 * Check if token version is compatible with current version
 * - Same major version = compatible (1.0.0 <-> 1.1.0)
 * - Different major version = not compatible
 * - No version in token = always compatible (backward compat)
 */
export function isVersionCompatible(tokenVersion: string, currentVersion: string): boolean {
  const [tokenMajor] = parseVersion(tokenVersion);
  const [currentMajor] = parseVersion(currentVersion);

  // Same major version = always compatible
  if (tokenMajor === currentMajor) {
    return true;
  }

  // Different major version = not compatible
  return false;
}

/**
 * Get version info object (for debug/info endpoints)
 */
export function getVersionInfo(buildVersion: string, dbVersion: string): object {
  return {
    buildVersion,  // Version embedded in JWT
    dbVersion,     // Version used for validation
    compatible: isVersionCompatible(buildVersion, dbVersion),
    buildMajor: parseVersion(buildVersion)[0],
    dbMajor: parseVersion(dbVersion)[0],
  };
}
