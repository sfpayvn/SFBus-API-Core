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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const file_dto_1 = require("./dto/file.dto");
const file_service_1 = require("./file.service");
const update_file_dto_1 = require("./dto/update-file.dto");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const mongoose_1 = require("mongoose");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let UploadController = class UploadController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    uploadFile(folderId, request, userTokenDto) {
        const { tenantId } = userTokenDto;
        return this.fileService.upload(request, folderId, tenantId);
    }
    uploadFileSaveToMedia(folderId, request, userTokenDto) {
        const { tenantId } = userTokenDto;
        return this.fileService.upload(request, folderId, tenantId, true);
    }
    delete(id, user) {
        const { tenantId } = user;
        return this.fileService.delete(id, tenantId);
    }
    deleteFiles(ids, user) {
        const { tenantId } = user;
        return this.fileService.deleteFiles(ids, tenantId);
    }
    async downloadFile(id, request, response, user) {
        const { tenantId } = user;
        const file = await this.fileService.download(id, request, response, tenantId);
        if (!file) {
            throw new common_1.NotFoundException('File not found');
        }
        return file;
    }
    update(updateFileDto, user) {
        const { tenantId } = user;
        return this.fileService.update(updateFileDto, tenantId);
    }
    updateFilesFolder(folderId, updateFilesDto, user) {
        const { tenantId } = user;
        return this.fileService.updateFilesFolder(updateFilesDto, folderId, tenantId);
    }
    viewFile(id, response, user) {
        return this.fileService.viewFile(id, response);
    }
    search(query, user) {
        const { tenantId } = user;
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], fileFolderId = null, } = query;
        return this.fileService.search(+pageIdx, +pageSize, keyword, sortBy, filters, [tenantId], fileFolderId);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('upload-file/:folderId'),
    __param(0, (0, common_1.Param)('folderId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('upload-file-save-to-media/:folderId'),
    __param(0, (0, common_1.Param)('folderId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFileSaveToMedia", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('delete-files'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "deleteFiles", null);
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
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __param(3, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_file_dto_1.UpdateFileDto, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)('/update-files-folder/:folderId'),
    __param(0, (0, common_1.Param)('folderId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Array, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "updateFilesFolder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'View a file online.' }),
    (0, common_1.Get)('view/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "viewFile", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_dto_1.SearchFilesQuery, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "search", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_1.ApiTags)('File'),
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], UploadController);
//# sourceMappingURL=file.controller.js.map