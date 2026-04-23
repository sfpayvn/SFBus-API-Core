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
exports.DriverGoodsController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const driver_goods_service_1 = require("./driver-goods-service");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const mongoose_1 = require("mongoose");
const update_audit_fields_decorator_1 = require("../../../../decorators/update-audit-fields.decorator");
const driver_update_goods_dto_1 = require("./dto/driver-update-goods.dto");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let DriverGoodsController = class DriverGoodsController {
    constructor(driverGoodsService) {
        this.driverGoodsService = driverGoodsService;
    }
    findAllGoodsForBusSchedule(busScheduleId, user) {
        const { tenantId } = user;
        return this.driverGoodsService.findAllGoodsForBusSchedule(busScheduleId, tenantId);
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.driverGoodsService.findOne(id, tenantId);
    }
    updates(driverRequestUpdateGoodsBoardingDto, user) {
        const { tenantId, _id: updatedBy } = user;
        return this.driverGoodsService.updateGoodsScheduleBoarding(driverRequestUpdateGoodsBoardingDto, tenantId, updatedBy);
    }
};
exports.DriverGoodsController = DriverGoodsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.DRIVER, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.POS),
    (0, common_1.Get)('find-all-goods-for-bus-schedule'),
    __param(0, (0, common_1.Query)('busScheduleId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], DriverGoodsController.prototype, "findAllGoodsForBusSchedule", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.DRIVER, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.POS),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], DriverGoodsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: false, updateUpdatedBy: true }),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.DRIVER, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.POS),
    (0, common_1.Put)('updates-goods-schedule-boarding'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driver_update_goods_dto_1.DriverRequestUpdateGoodsBoardingDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], DriverGoodsController.prototype, "updates", null);
exports.DriverGoodsController = DriverGoodsController = __decorate([
    (0, common_1.Controller)('driver/goods'),
    __metadata("design:paramtypes", [driver_goods_service_1.DriverGoodsService])
], DriverGoodsController);
//# sourceMappingURL=driver-goods.controller.js.map