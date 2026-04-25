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
exports.FileFolderController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const file_folder_service_1 = require("./file-folder.service");
const create_file_folderdto_1 = require("./dto/create-file-folderdto");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const update_file_folder_dto_1 = require("./dto/update-file-folder.dto");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const mongoose_1 = require("mongoose");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let FileFolderController = class FileFolderController {
    constructor(fileFolderService) {
        this.fileFolderService = fileFolderService;
    }
    create(createFileFolderDto, user) {
        const { tenantId } = user;
        return this.fileFolderService.create(createFileFolderDto, tenantId);
    }
    update(updateFileFolderDto, user) {
        const { tenantId } = user;
        return this.fileFolderService.update(updateFileFolderDto, tenantId);
    }
    findAll(user) {
        const { tenantId } = user;
        return this.fileFolderService.findAll(tenantId);
    }
    delete(id, user) {
        const { tenantId } = user;
        return this.fileFolderService.delete(id, tenantId);
    }
};
exports.FileFolderController = FileFolderController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_file_folderdto_1.CreateFileFolderDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], FileFolderController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_file_folder_dto_1.UpdateFileFolderDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], FileFolderController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], FileFolderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], FileFolderController.prototype, "delete", null);
exports.FileFolderController = FileFolderController = __decorate([
    (0, common_1.Controller)('file-folder'),
    __metadata("design:paramtypes", [file_folder_service_1.FileFolderService])
], FileFolderController);
//# sourceMappingURL=file-folder.controller.js.map