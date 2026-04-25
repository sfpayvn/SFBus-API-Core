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
exports.AdminContentLayoutController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const roles_guard_1 = require("../../../guards/roles.guard");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const admin_content_layout_service_1 = require("./admin-content-layout.service");
const feature_decorator_1 = require("../../../decorators/feature.decorator");
const roles_constants_1 = require("../../../common/constants/roles.constants");
const module_function_keys_1 = require("../../../common/constants/module-function-keys");
const mark_default_tenant_1 = require("../../../interceptors/mark-default-tenant");
const admin_content_layout_dto_1 = require("./dto/admin-content-layout.dto");
const tenant_scope_1 = require("../../../common/tenant/tenant-scope");
const mongoose_1 = require("mongoose");
const admin_create_content_layout_dto_1 = require("./dto/admin-create-content-layout.dto");
let AdminContentLayoutController = class AdminContentLayoutController {
    constructor(adminContentLayoutService) {
        this.adminContentLayoutService = adminContentLayoutService;
    }
    create(createContentLayoutDto, user) {
        const { tenantId } = user;
        return this.adminContentLayoutService.create(createContentLayoutDto, tenantId);
    }
    update(updateContentLayoutDto, user) {
        const { tenantId } = user;
        return this.adminContentLayoutService.update(updateContentLayoutDto, tenantId);
    }
    remove(id, user) {
        const { tenantId } = user;
        return this.adminContentLayoutService.remove(id, tenantId);
    }
    findAll(user, tenantScope) {
        const { tenantIds } = tenantScope;
        return this.adminContentLayoutService.findAll(tenantIds);
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.adminContentLayoutService.findOne(id, tenantId);
    }
    search(query, tenantScope) {
        const { tenantIds } = tenantScope;
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        return this.adminContentLayoutService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.AdminContentLayoutController = AdminContentLayoutController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    (0, feature_decorator_1.Feature)(module_function_keys_1.MODULE_KEYS.CONTENT_LAYOUTS, module_function_keys_1.FUNCTION_KEYS.CONTENT_LAYOUTS.CREATE),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_create_content_layout_dto_1.AdminCreateContentLayoutDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminContentLayoutController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    (0, feature_decorator_1.Feature)(module_function_keys_1.MODULE_KEYS.CONTENT_LAYOUTS, module_function_keys_1.FUNCTION_KEYS.CONTENT_LAYOUTS.UPDATE),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminContentLayoutController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, feature_decorator_1.Feature)(module_function_keys_1.MODULE_KEYS.CONTENT_LAYOUTS, module_function_keys_1.FUNCTION_KEYS.CONTENT_LAYOUTS.DELETE),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminContentLayoutController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto, Object]),
    __metadata("design:returntype", void 0)
], AdminContentLayoutController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminContentLayoutController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_content_layout_dto_1.AdminSearchContentLayoutQuery, Object]),
    __metadata("design:returntype", void 0)
], AdminContentLayoutController.prototype, "search", null);
exports.AdminContentLayoutController = AdminContentLayoutController = __decorate([
    (0, common_1.Controller)('admin/content-layouts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    __metadata("design:paramtypes", [admin_content_layout_service_1.AdminContentLayoutService])
], AdminContentLayoutController);
//# sourceMappingURL=admin-content-layout.controller.js.map