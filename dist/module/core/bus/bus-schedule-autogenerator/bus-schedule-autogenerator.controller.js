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
exports.BusScheduleAutogeneratorController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const bus_schedule_autogenerator_service_1 = require("./bus-schedule-autogenerator.service");
const update_bus_schedule_autogenerator_dto_1 = require("./dto/update-bus-schedule-autogenerator.dto");
const mongoose_1 = require("mongoose");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const create_bus_schedule_autogenerator_dto_1 = require("./dto/create-bus-schedule-autogenerator.dto");
const bus_schedule_autogenerator_dto_1 = require("./dto/bus-schedule-autogenerator.dto");
const timezone_decorator_1 = require("../../../../decorators/timezone.decorator");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let BusScheduleAutogeneratorController = class BusScheduleAutogeneratorController {
    constructor(busScheduleAutogeneratorService) {
        this.busScheduleAutogeneratorService = busScheduleAutogeneratorService;
    }
    create(createBusScheduleAutogeneratorDto, user, timezoneOffset) {
        const { tenantId } = user;
        return this.busScheduleAutogeneratorService.create(createBusScheduleAutogeneratorDto, tenantId, timezoneOffset);
    }
    findAll(user) {
        const { tenantId } = user;
        return this.busScheduleAutogeneratorService.findAll(tenantId);
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.busScheduleAutogeneratorService.findOne(id, tenantId);
    }
    update(updateBusScheduleAutogeneratorDto, user, timezoneOffset) {
        const { tenantId } = user;
        return this.busScheduleAutogeneratorService.update(updateBusScheduleAutogeneratorDto, tenantId, timezoneOffset);
    }
    runCreateBusSchedule(_id, user) {
        const { tenantId } = user;
        return this.busScheduleAutogeneratorService.runCreateBusSchedule(_id, tenantId, tenantId);
    }
    delete(id, user) {
        const { tenantId } = user;
        return this.busScheduleAutogeneratorService.delete(id, tenantId);
    }
    async searchBusScheduleAutogenerator(query, user) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        const { tenantId } = user;
        return this.busScheduleAutogeneratorService.searchBusScheduleAutogenerator(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.BusScheduleAutogeneratorController = BusScheduleAutogeneratorController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bus_schedule_autogenerator_dto_1.CreateBusScheduleAutogeneratorDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", void 0)
], BusScheduleAutogeneratorController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusScheduleAutogeneratorController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusScheduleAutogeneratorController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_bus_schedule_autogenerator_dto_1.UpdateBusScheduleAutogeneratorDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", void 0)
], BusScheduleAutogeneratorController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('run-create-bus-schedule/:id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusScheduleAutogeneratorController.prototype, "runCreateBusSchedule", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusScheduleAutogeneratorController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
    }))),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bus_schedule_autogenerator_dto_1.SearchBusScheduleAutogeneratorQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], BusScheduleAutogeneratorController.prototype, "searchBusScheduleAutogenerator", null);
exports.BusScheduleAutogeneratorController = BusScheduleAutogeneratorController = __decorate([
    (0, common_1.Controller)('bus-schedule-autogenerators'),
    __metadata("design:paramtypes", [bus_schedule_autogenerator_service_1.BusScheduleAutogeneratorService])
], BusScheduleAutogeneratorController);
//# sourceMappingURL=bus-schedule-autogenerator.controller.js.map