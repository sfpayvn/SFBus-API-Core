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
exports.AdminUploadController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const mongoose_1 = require("mongoose");
const admin_file_service_1 = require("./admin-file.service");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const admin_file_dto_1 = require("./dto/admin-file.dto");
const admin_update_file_dto_1 = require("./dto/admin-update-file.dto");
const tenant_scope_1 = require("../../../../common/tenant/tenant-scope");
const mark_default_tenant_1 = require("../../../../interceptors/mark-default-tenant");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let AdminUploadController = class AdminUploadController {
    constructor(adminFileService) {
        this.adminFileService = adminFileService;
    }
    uploadFile(folderId, request, userTokenDto) {
        const { tenantId } = userTokenDto;
        return this.adminFileService.upload(request, folderId, tenantId);
    }
    uploadFileSaveToMedia(folderId, request, userTokenDto) {
        const { tenantId } = userTokenDto;
        return this.adminFileService.upload(request, folderId, tenantId, true);
    }
    delete(id, user) {
        const { tenantId } = user;
        return this.adminFileService.delete(id, tenantId);
    }
    deleteFiles(ids, user) {
        const { tenantId } = user;
        return this.adminFileService.deleteFiles(ids, tenantId);
    }
    async downloadFile(id, request, response, user) {
        const { tenantId } = user;
        const file = await this.adminFileService.download(id, request, response, tenantId);
        if (!file) {
            throw new common_1.NotFoundException('File not found');
        }
        return file;
    }
    update(adminUpdateFileDto, user) {
        const { tenantId } = user;
        return this.adminFileService.update(adminUpdateFileDto, tenantId);
    }
    updateFilesFolder(folderId, adminUpdateFileDto, user) {
        const { tenantId } = user;
        return this.adminFileService.updateFilesFolder(adminUpdateFileDto, folderId, tenantId);
    }
    viewFile(id, response, user) {
        const { tenantId } = user;
        return this.adminFileService.viewFile(id, response);
    }
    search(query, tenantScope) {
        const { tenantIds } = tenantScope;
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], fileFolderId = null, } = query;
        return this.adminFileService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds, fileFolderId);
    }
};
exports.AdminUploadController = AdminUploadController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('upload-file/:folderId'),
    __param(0, (0, common_1.Param)('folderId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminUploadController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('upload-file-save-to-media/:folderId'),
    __param(0, (0, common_1.Param)('folderId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminUploadController.prototype, "uploadFileSaveToMedia", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminUploadController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('delete-files'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminUploadController.prototype, "deleteFiles", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get a list of all uploaded files.',
    }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '5e2b447e4aadb800bccfb339' },
                    length: { type: 'number', example: 730416 },
                    chunkSize: { type: 'number', example: 261120 },
                    uploadDate: { type: 'Date', example: '2020-01-24T19:24:46.366Z' },
                    filename: { type: 'string', example: 'IMG_0359.jpeg' },
                    md5: { type: 'string', example: 'ba230f0322784443c84ffbc5b6160c30' },
                    contentType: { type: 'string', example: 'image/jpeg' },
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Download a file.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __param(3, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminUploadController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_update_file_dto_1.AdminUpdateFileDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminUploadController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Put)('/update-files-folder/:folderId'),
    __param(0, (0, common_1.Param)('folderId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Array, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminUploadController.prototype, "updateFilesFolder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View a file online.' }),
    (0, common_1.Get)('view/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminUploadController.prototype, "viewFile", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_file_dto_1.AdminSearchFilesQuery, Object]),
    __metadata("design:returntype", void 0)
], AdminUploadController.prototype, "search", null);
exports.AdminUploadController = AdminUploadController = __decorate([
    (0, swagger_1.ApiTags)('AdminFile'),
    (0, common_1.Controller)('admin/file'),
    __metadata("design:paramtypes", [admin_file_service_1.AdminFileService])
], AdminUploadController);
//# sourceMappingURL=admin-file.controller.js.map