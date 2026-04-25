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
exports.BusLayoutTemplateController = void 0;
const common_1 = require("@nestjs/common");
const bus_layout_template_service_1 = require("./bus-layout-template.service");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const mongoose_1 = require("mongoose");
const bus_layout_template_dto_1 = require("./dto/bus-layout-template.dto");
const create_bus_layout_template_dto_1 = require("./dto/create-bus-layout-template.dto");
const update_bus_layout_template_dto_1 = require("./dto/update-bus-layout-template.dto");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let BusLayoutTemplateController = class BusLayoutTemplateController {
    constructor(busLayoutTemplateService) {
        this.busLayoutTemplateService = busLayoutTemplateService;
    }
    async create(createBusLayoutTemplateDto, user) {
        const { tenantId } = user;
        return this.busLayoutTemplateService.create(createBusLayoutTemplateDto, tenantId);
    }
    update(updateBusLayoutTemplateDto, user) {
        const { tenantId } = user;
        return this.busLayoutTemplateService.update(updateBusLayoutTemplateDto, tenantId);
    }
    delete(id, user) {
        const { tenantId } = user;
        return this.busLayoutTemplateService.delete(id, tenantId);
    }
    async findAll(user) {
        const { tenantId } = user;
        return this.busLayoutTemplateService.findAll([tenantId]);
    }
    async findOne(id, user) {
        const { tenantId } = user;
        return this.busLayoutTemplateService.findOne(id, [tenantId]);
    }
    search(query, user) {
        const { tenantId } = user;
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        return this.busLayoutTemplateService.search(+pageIdx, +pageSize, keyword, sortBy, filters, [tenantId]);
    }
};
exports.BusLayoutTemplateController = BusLayoutTemplateController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bus_layout_template_dto_1.CreateBusLayoutTemplateDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], BusLayoutTemplateController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_bus_layout_template_dto_1.UpdateBusLayoutTemplateDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusLayoutTemplateController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusLayoutTemplateController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('/find-all'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], BusLayoutTemplateController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('find-one/:id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], BusLayoutTemplateController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bus_layout_template_dto_1.SearchBusLayoutTemplateQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusLayoutTemplateController.prototype, "search", null);
exports.BusLayoutTemplateController = BusLayoutTemplateController = __decorate([
    (0, common_1.Controller)('bus-layout-templates'),
    __metadata("design:paramtypes", [bus_layout_template_service_1.BusLayoutTemplateService])
], BusLayoutTemplateController);
//# sourceMappingURL=bus-layout-template.controller.js.map