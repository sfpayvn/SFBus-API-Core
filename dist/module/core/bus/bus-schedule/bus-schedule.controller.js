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
exports.BusScheduleController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const bus_schedule_service_1 = require("./bus-schedule.service");
const create_bus_schedule_dto_1 = require("./dto/create-bus-schedule.dto");
const update_bus_schedule_dto_1 = require("./dto/update-bus-schedule.dto");
const mongoose_1 = require("mongoose");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const bus_schedule_dto_1 = require("./dto/bus-schedule.dto");
const bus_service_1 = require("../bus/bus.service");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let BusScheduleController = class BusScheduleController {
    constructor(busScheduleService, busService) {
        this.busScheduleService = busScheduleService;
        this.busService = busService;
    }
    create(createBusScheduleDto, user) {
        const { tenantId } = user;
        return this.busScheduleService.create(createBusScheduleDto, tenantId, tenantId);
    }
    update(updateBusScheduleDto, user) {
        const { tenantId } = user;
        return this.busScheduleService.update(updateBusScheduleDto, tenantId);
    }
    updateBusScheduleNote(note, busScheduleId, user) {
        const { tenantId } = user;
        return this.busScheduleService.updateBusScheduleNote(busScheduleId, note, tenantId);
    }
    updateCurrentStation(currentStationId, busScheduleId, user) {
        const { tenantId } = user;
        return this.busScheduleService.updateCurrentStation(busScheduleId, currentStationId, tenantId);
    }
    delete(id, user) {
        const { tenantId } = user;
        return this.busScheduleService.delete(id, tenantId);
    }
    findAll(user) {
        const { tenantId } = user;
        return this.busScheduleService.findAll(tenantId);
    }
    findAvailable(user) {
        const { tenantId } = user;
        return this.busScheduleService.findAllAvailable(tenantId);
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.busScheduleService.findOne(id, tenantId);
    }
    async searchBusSchedulePaging(query, user) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        const { tenantId } = user;
        return this.busScheduleService.searchBusSchedulePaging(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
    async searchBusScheduleByDriver(query, user) {
        const { keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        const { tenantId } = user;
        const driverId = user._id;
        return this.busScheduleService.searchBusScheduleByDriver(keyword, sortBy, filters, driverId, tenantId);
    }
};
exports.BusScheduleController = BusScheduleController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bus_schedule_dto_1.CreateBusScheduleDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusScheduleController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_bus_schedule_dto_1.UpdateBusScheduleDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusScheduleController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)('update-note/:busScheduleId'),
    __param(0, (0, common_1.Body)('note')),
    __param(1, (0, common_1.Param)('busScheduleId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusScheduleController.prototype, "updateBusScheduleNote", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)('update-current-station/:busScheduleId'),
    __param(0, (0, common_1.Body)('currentStationId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('busScheduleId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusScheduleController.prototype, "updateCurrentStation", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusScheduleController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('find-all'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusScheduleController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('find-all-available'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusScheduleController.prototype, "findAvailable", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusScheduleController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bus_schedule_dto_1.SearchBusSchedulePagingQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], BusScheduleController.prototype, "searchBusSchedulePaging", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('search-driver'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bus_schedule_dto_1.SearchBusScheduleDriverQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], BusScheduleController.prototype, "searchBusScheduleByDriver", null);
exports.BusScheduleController = BusScheduleController = __decorate([
    (0, common_1.Controller)('bus-schedules'),
    __metadata("design:paramtypes", [bus_schedule_service_1.BusScheduleService,
        bus_service_1.BusService])
], BusScheduleController);
//# sourceMappingURL=bus-schedule.controller.js.map