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
exports.DriverBusScheduleController = void 0;
const common_1 = require("@nestjs/common");
const driver_bus_schedule_service_1 = require("./driver-bus-schedule.service");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const driver_bus_schedule_dto_1 = require("./dto/driver-bus-schedule.dto");
const mongoose_1 = require("mongoose");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let DriverBusScheduleController = class DriverBusScheduleController {
    constructor(driverBusScheduleService) {
        this.driverBusScheduleService = driverBusScheduleService;
    }
    findAll(user) {
        const { tenantId } = user;
        return this.driverBusScheduleService.findAll(tenantId);
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.driverBusScheduleService.findOne(id, tenantId);
    }
    async searchBusScheduleByDriver(query, user) {
        const { keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        const { tenantId } = user;
        const driverId = user._id;
        return this.driverBusScheduleService.searchBusScheduleByDriver(keyword, sortBy, filters, driverId, tenantId);
    }
    updateCurrentStation(currentStationId, busScheduleId, user) {
        const { tenantId } = user;
        return this.driverBusScheduleService.updateCurrentStation(busScheduleId, currentStationId, tenantId);
    }
};
exports.DriverBusScheduleController = DriverBusScheduleController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.DRIVER, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.POS),
    (0, common_1.Get)('find-all'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], DriverBusScheduleController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.DRIVER, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.POS),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], DriverBusScheduleController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.DRIVER, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.POS),
    (0, common_1.Post)('search-by-driver'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driver_bus_schedule_dto_1.DriverSearchBusSchedulePagingQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], DriverBusScheduleController.prototype, "searchBusScheduleByDriver", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.DRIVER, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.POS),
    (0, common_1.Put)('update-current-station/:busScheduleId'),
    __param(0, (0, common_1.Body)('currentStationId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('busScheduleId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], DriverBusScheduleController.prototype, "updateCurrentStation", null);
exports.DriverBusScheduleController = DriverBusScheduleController = __decorate([
    (0, common_1.Controller)('driver/bus-schedules'),
    __metadata("design:paramtypes", [driver_bus_schedule_service_1.DriverBusScheduleService])
], DriverBusScheduleController);
//# sourceMappingURL=driver-bus-schedule.controller.js.map