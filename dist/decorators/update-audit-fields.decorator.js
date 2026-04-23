"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuditFields = UpdateAuditFields;
const common_1 = require("@nestjs/common");
const update_audit_fields_interceptor_1 = require("../common/interceptors/update-audit-fields.interceptor");
function UpdateAuditFields(options) {
    return (0, common_1.UseInterceptors)(new update_audit_fields_interceptor_1.UpdateAuditFieldsInterceptor(options));
}
//# sourceMappingURL=update-audit-fields.decorator.js.map