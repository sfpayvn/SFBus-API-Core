"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature = exports.FEATURE_META_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.FEATURE_META_KEY = 'feature_meta';
const Feature = (moduleKey, functionKey, actionQuotaKey) => (0, common_1.SetMetadata)(exports.FEATURE_META_KEY, { moduleKey, functionKey, actionQuotaKey });
exports.Feature = Feature;
//# sourceMappingURL=feature.decorator.js.map