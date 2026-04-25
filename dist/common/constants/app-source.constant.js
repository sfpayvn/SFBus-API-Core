"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLATFORM_DEFAULT_APP_SOURCES_OPTIONS = exports.PLATFORM_DEFAULT_APP_SOURCE_LABELS = exports.PLATFORM_DEFAULT_APP_SOURCE = exports.APP_SOURCES_OPTIONS = exports.APP_SOURCE_LABELS = exports.APP_SOURCE = void 0;
exports.APP_SOURCE = {
    CLIENT: 'client',
    POS: 'pos',
    DRIVER: 'driver',
};
exports.APP_SOURCE_LABELS = {
    [exports.APP_SOURCE.CLIENT]: 'Client',
    [exports.APP_SOURCE.POS]: 'Pos',
    [exports.APP_SOURCE.DRIVER]: 'Driver',
};
exports.APP_SOURCES_OPTIONS = [
    { label: exports.APP_SOURCE_LABELS[exports.APP_SOURCE.CLIENT], value: exports.APP_SOURCE.CLIENT },
    { label: exports.APP_SOURCE_LABELS[exports.APP_SOURCE.POS], value: exports.APP_SOURCE.POS },
    { label: exports.APP_SOURCE_LABELS[exports.APP_SOURCE.DRIVER], value: exports.APP_SOURCE.DRIVER },
];
exports.PLATFORM_DEFAULT_APP_SOURCE = {
    WEB: 'web',
    APP: 'app',
    WINDOW_APP: 'windowApp',
};
exports.PLATFORM_DEFAULT_APP_SOURCE_LABELS = {
    [exports.PLATFORM_DEFAULT_APP_SOURCE.WEB]: 'Web',
    [exports.PLATFORM_DEFAULT_APP_SOURCE.APP]: 'App',
    [exports.PLATFORM_DEFAULT_APP_SOURCE.WINDOW_APP]: 'Window App',
};
exports.PLATFORM_DEFAULT_APP_SOURCES_OPTIONS = [
    {
        label: exports.PLATFORM_DEFAULT_APP_SOURCE_LABELS[exports.PLATFORM_DEFAULT_APP_SOURCE.WEB],
        value: exports.PLATFORM_DEFAULT_APP_SOURCE.WEB,
    },
    {
        label: exports.PLATFORM_DEFAULT_APP_SOURCE_LABELS[exports.PLATFORM_DEFAULT_APP_SOURCE.APP],
        value: exports.PLATFORM_DEFAULT_APP_SOURCE.APP,
    },
    {
        label: exports.PLATFORM_DEFAULT_APP_SOURCE_LABELS[exports.PLATFORM_DEFAULT_APP_SOURCE.WINDOW_APP],
        value: exports.PLATFORM_DEFAULT_APP_SOURCE.WINDOW_APP,
    },
];
//# sourceMappingURL=app-source.constant.js.map