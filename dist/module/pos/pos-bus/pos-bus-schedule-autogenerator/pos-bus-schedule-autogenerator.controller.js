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
exports.PosBusScheduleAutogeneratorController = void 0;
const common_1 = require("@nestjs/common");
const pos_bus_schedule_autogenerator_service_1 = require("./pos-bus-schedule-autogenerator.service");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const pos_create_bus_schedule_autogenerator_dto_1 = require("./dto/pos-create-bus-schedule-autogenerator.dto");
const pos_update_bus_schedule_autogenerator_dto_1 = require("./dto/pos-update-bus-schedule-autogenerator.dto");
const mongoose_1 = require("mongoose");
const pos_bus_schedule_autogenerator_dto_1 = require("./dto/pos-bus-schedule-autogenerator.dto");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const timezone_decorator_1 = require("../../../../decorators/timezone.decorator");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let PosBusScheduleAutogeneratorController = class PosBusScheduleAutogeneratorController {
    constructor(PosBusScheduleAutogeneratorService) {
        this.PosBusScheduleAutogeneratorService = PosBusScheduleAutogeneratorService;
    }
    create(PosCreateBusScheduleAutogeneratorDto, user, timezoneOffset) {
        const { tenantId } = user;
        return this.PosBusScheduleAutogeneratorService.create(PosCreateBusScheduleAutogeneratorDto, tenantId, timezoneOffset);
    }
    update(PosUpdateBusScheduleAutogeneratorDto, user, timezoneOffset) {
        const { tenantId } = user;
        return this.PosBusScheduleAutogeneratorService.update(PosUpdateBusScheduleAutogeneratorDto, tenantId, timezoneOffset);
    }
    delete(id, user) {
        const { tenantId } = user;
        return this.PosBusScheduleAutogeneratorService.delete(id, tenantId);
    }
    findAll(user) {
        const { tenantId } = user;
        return this.PosBusScheduleAutogeneratorService.findAll(tenantId);
    }
    async searchBusScheduleAutogenerator(query, user) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        const { tenantId } = user;
        return this.PosBusScheduleAutogeneratorService.searchBusScheduleAutogenerator(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.PosBusScheduleAutogeneratorController = PosBusScheduleAutogeneratorController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_create_bus_schedule_autogenerator_dto_1.PosCreateBusScheduleAutogeneratorDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", void 0)
], PosBusScheduleAutogeneratorController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_update_bus_schedule_autogenerator_dto_1.PosUpdateBusScheduleAutogeneratorDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", void 0)
], PosBusScheduleAutogeneratorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosBusScheduleAutogeneratorController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosBusScheduleAutogeneratorController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_bus_schedule_autogenerator_dto_1.PosSearchBusScheduleAutogeneratorQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], PosBusScheduleAutogeneratorController.prototype, "searchBusScheduleAutogenerator", null);
exports.PosBusScheduleAutogeneratorController = PosBusScheduleAutogeneratorController = __decorate([
    (0, common_1.Controller)('pos/bus-schedule-autogenerators'),
    __metadata("design:paramtypes", [pos_bus_schedule_autogenerator_service_1.PosBusScheduleAutogeneratorService])
], PosBusScheduleAutogeneratorController);
//# sourceMappingURL=pos-bus-schedule-autogenerator.controller.js.map