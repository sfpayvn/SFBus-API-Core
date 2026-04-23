"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseModules = parseModules;
const ALL_KEYS = ['core', 'admin', 'pos', 'client', 'driver'];
function parseModules(input) {
    const raw = (input ?? '').trim().toLowerCase();
    if (!raw || raw === 'all')
        return new Set(ALL_KEYS);
    const set = new Set(raw
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean));
    if (set.has('all'))
        return new Set(ALL_KEYS);
    const enabled = new Set();
    for (const k of ALL_KEYS) {
        if (set.has(k))
            enabled.add(k);
    }
    return enabled;
}
//# sourceMappingURL=module-flags.js.map