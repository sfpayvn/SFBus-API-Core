"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_APP_VERSION = void 0;
exports.getAppVersionFromDb = getAppVersionFromDb;
exports.parseVersion = parseVersion;
exports.compareVersions = compareVersions;
exports.isVersionCompatible = isVersionCompatible;
exports.getVersionInfo = getVersionInfo;
exports.DEFAULT_APP_VERSION = '1.0.0';
async function getAppVersionFromDb(settingsService, tenantId) {
    if (!settingsService) {
        console.warn('SettingsService not provided, using default version');
        return exports.DEFAULT_APP_VERSION;
    }
    try {
        return await settingsService.getAppVersion(tenantId);
    }
    catch (error) {
        console.warn('Failed to fetch APP_VERSION from DB, using default version:', error.message);
        return exports.DEFAULT_APP_VERSION;
    }
}
function parseVersion(version) {
    return version.split('.').map(v => parseInt(v, 10));
}
function compareVersions(v1, v2) {
    const [major1, minor1, patch1] = parseVersion(v1);
    const [major2, minor2, patch2] = parseVersion(v2);
    if (major1 !== major2)
        return major1 < major2 ? -1 : 1;
    if (minor1 !== minor2)
        return minor1 < minor2 ? -1 : 1;
    if (patch1 !== patch2)
        return patch1 < patch2 ? -1 : 1;
    return 0;
}
function isVersionCompatible(tokenVersion, currentVersion) {
    const [tokenMajor] = parseVersion(tokenVersion);
    const [currentMajor] = parseVersion(currentVersion);
    if (tokenMajor === currentMajor) {
        return true;
    }
    return false;
}
function getVersionInfo(buildVersion, dbVersion) {
    return {
        buildVersion,
        dbVersion,
        compatible: isVersionCompatible(buildVersion, dbVersion),
        buildMajor: parseVersion(buildVersion)[0],
        dbMajor: parseVersion(dbVersion)[0],
    };
}
//# sourceMappingURL=app.version.js.map