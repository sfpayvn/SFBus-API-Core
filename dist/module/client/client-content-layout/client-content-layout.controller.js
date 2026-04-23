"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientContentLayoutController = void 0;
const common_1 = require("@nestjs/common");
const client_content_layout_service_1 = require("./client-content-layout.service");
const module_function_keys_1 = require("../../../common/constants/module-function-keys");
const feature_decorator_1 = require("../../../decorators/feature.decorator");
const client_content_layout_dto_1 = require("./dto/client-content-layout.dto");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const tenant_by_code_interceptor_1 = require("../../../interceptors/tenant-by-code.interceptor");
const mongoose_1 = require("mongoose");
const tenant_by_code_decorator_1 = require("../../../decorators/tenant-by-code.decorator");
let ClientContentLayoutController = class ClientContentLayoutController {
    constructor(clientContentLayoutService) {
        this.clientContentLayoutService = clientContentLayoutService;
    }
    findAvailableSlugs(query, tenantId) {
        const { appSource, platform } = query;
        return this.clientContentLayoutService.findAvailableSlugByTenantId(appSource, platform, tenantId);
    }
    findAvailableBySlug(query, tenantId) {
        const { appSource, platform, slug } = query;
        return this.clientContentLayoutService.findAvailableBySlugForTenantId(appSource, platform, slug, tenantId);
    }
};
exports.ClientContentLayoutController = ClientContentLayoutController;
__decorate([
    (0, common_1.Post)('available-slugs'),
    (0, feature_decorator_1.Feature)(module_function_keys_1.MODULE_KEYS.CONTENT_WIDGETS_BLOCK, module_function_keys_1.FUNCTION_KEYS.CONTENT_WIDGETS_BLOCK.VIEW),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_by_code_decorator_1.TenantIdByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_content_layout_dto_1.ClientAvailableSlugQueryDto, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], ClientContentLayoutController.prototype, "findAvailableSlugs", null);
__decorate([
    (0, common_1.Post)('by-slug'),
    (0, feature_decorator_1.Feature)(module_function_keys_1.MODULE_KEYS.CONTENT_WIDGETS_BLOCK, module_function_keys_1.FUNCTION_KEYS.CONTENT_WIDGETS_BLOCK.VIEW),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_by_code_decorator_1.TenantIdByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_content_layout_dto_1.ClientAvailableBySlugQueryDto, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], ClientContentLayoutController.prototype, "findAvailableBySlug", null);
exports.ClientContentLayoutController = ClientContentLayoutController = __decorate([
    (0, common_1.Controller)('client/content-layouts'),
    (0, common_1.UseInterceptors)(tenant_by_code_interceptor_1.TenantByCodeInterceptor),
    __metadata("design:paramtypes", [client_content_layout_service_1.ClientContentLayoutService])
], ClientContentLayoutController);
//# sourceMappingURL=client-content-layout.controller.js.map