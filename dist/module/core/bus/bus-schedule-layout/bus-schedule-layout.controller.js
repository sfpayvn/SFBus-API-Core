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
exports.BusScheduleLayoutController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const create_bus_schedule_layout_dto_1 = require("./dto/create-bus-schedule-layout.dto");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const bus_schedule_layout_service_1 = require("./bus-schedule-layout.service");
const update_bus_schedule_layout_dto_1 = require("./dto/update-bus-schedule-layout.dto");
const mongoose_1 = require("mongoose");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let BusScheduleLayoutController = class BusScheduleLayoutController {
    constructor(busScheduleLayoutService) {
        this.busScheduleLayoutService = busScheduleLayoutService;
    }
    async create(createBusScheduleLayoutDto, user) {
        const { tenantId } = user;
        return this.busScheduleLayoutService.create(createBusScheduleLayoutDto, tenantId);
    }
    async update(id, updateBusLayoutDto, user) {
        const { tenantId } = user;
        return this.busScheduleLayoutService.update(updateBusLayoutDto, tenantId);
    }
    async remove(id, user) {
        const { tenantId } = user;
        await this.busScheduleLayoutService.remove(id, tenantId);
        return { message: 'BusLayout deleted successfully' };
    }
    async findAll(user) {
        const { tenantId } = user;
        return this.busScheduleLayoutService.findAll(tenantId);
    }
    async findOne(id, user) {
        const { tenantId } = user;
        return this.busScheduleLayoutService.findOne(id, tenantId);
    }
    async findOneByBusSchedule(busScheduleId, user) {
        const { tenantId } = user;
        return this.busScheduleLayoutService.findOneByBusSchedule(busScheduleId, tenantId);
    }
};
exports.BusScheduleLayoutController = BusScheduleLayoutController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bus_schedule_layout_dto_1.CreateBusScheduleLayoutDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], BusScheduleLayoutController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bus_schedule_layout_dto_1.UpdateBusScheduleLayoutDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], BusScheduleLayoutController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], BusScheduleLayoutController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], BusScheduleLayoutController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('find-one/:id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], BusScheduleLayoutController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('find-one-by-bus-schedule/:busScheduleId'),
    __param(0, (0, common_1.Param)('busScheduleId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], BusScheduleLayoutController.prototype, "findOneByBusSchedule", null);
exports.BusScheduleLayoutController = BusScheduleLayoutController = __decorate([
    (0, common_1.Controller)('bus-schedule-layouts'),
    __metadata("design:paramtypes", [bus_schedule_layout_service_1.BusScheduleLayoutService])
], BusScheduleLayoutController);
//# sourceMappingURL=bus-schedule-layout.controller.js.map