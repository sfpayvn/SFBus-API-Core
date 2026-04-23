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
exports.ClientSettingsController = void 0;
const common_1 = require("@nestjs/common");
const settings_service_1 = require("../../core/settings/settings.service");
const mongoose_1 = require("mongoose");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const tenant_by_code_decorator_1 = require("../../../decorators/tenant-by-code.decorator");
const tenant_by_code_interceptor_1 = require("../../../interceptors/tenant-by-code.interceptor");
let ClientSettingsController = class ClientSettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async findByGroup(groupName, tenantId) {
        return this.settingsService.findByGroupName(groupName, tenantId);
    }
    async findAll(tenantId) {
        return this.settingsService.findAll(tenantId);
    }
    async findByName(name, tenantId) {
        return this.settingsService.findByName(name, tenantId);
    }
    async findOne(id, tenantId) {
        return this.settingsService.findOne(id, tenantId);
    }
};
exports.ClientSettingsController = ClientSettingsController;
__decorate([
    (0, common_1.Get)('group/:groupName'),
    __param(0, (0, common_1.Param)('groupName')),
    __param(1, (0, tenant_by_code_decorator_1.TenantIdByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], ClientSettingsController.prototype, "findByGroup", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, tenant_by_code_decorator_1.TenantIdByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], ClientSettingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, tenant_by_code_decorator_1.TenantIdByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], ClientSettingsController.prototype, "findByName", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_by_code_decorator_1.TenantIdByCode)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], ClientSettingsController.prototype, "findOne", null);
exports.ClientSettingsController = ClientSettingsController = __decorate([
    (0, common_1.Controller)('client/settings'),
    (0, common_1.UseInterceptors)(tenant_by_code_interceptor_1.TenantByCodeInterceptor),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], ClientSettingsController);
//# sourceMappingURL=client-settings.controller.js.map