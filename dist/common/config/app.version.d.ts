export declare const DEFAULT_APP_VERSION = "1.0.0";
export declare function getAppVersionFromDb(settingsService: any, tenantId?: any): Promise<string>;
export declare function parseVersion(version: string): number[];
export declare function compareVersions(v1: string, v2: string): number;
export declare function isVersionCompatible(tokenVersion: string, currentVersion: string): boolean;
export declare function getVersionInfo(buildVersion: string, dbVersion: string): object;
