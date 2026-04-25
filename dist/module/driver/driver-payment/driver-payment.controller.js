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
exports.DriverPaymentController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const driver_payment_service_1 = require("./driver-payment-service");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const mongoose_1 = require("mongoose");
const driver_payment_dto_1 = require("./dto/driver-payment.dto");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let DriverPaymentController = class DriverPaymentController {
    constructor(driverPaymentService) {
        this.driverPaymentService = driverPaymentService;
    }
    processBookingPayment(driverRequestPaymentDto, user) {
        const { tenantId, _id } = user;
        return this.driverPaymentService.processBookingPayment(driverRequestPaymentDto, tenantId, _id);
    }
    processGoodsPayment(driverRequestPaymentDto, user) {
        const { tenantId, _id } = user;
        return this.driverPaymentService.processGoodsPayment(driverRequestPaymentDto, tenantId, _id);
    }
    findAllByReferrentId(referrentId, user) {
        const tenantId = user.tenantId;
        return this.driverPaymentService.findAllByReferrentId(referrentId, tenantId);
    }
};
exports.DriverPaymentController = DriverPaymentController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.DRIVER, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.POS),
    (0, common_1.Post)('/processBookingPayment'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driver_payment_dto_1.DriverRequestPaymentDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], DriverPaymentController.prototype, "processBookingPayment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.DRIVER, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.POS),
    (0, common_1.Post)('/processGoodsPayment'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driver_payment_dto_1.DriverRequestPaymentDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], DriverPaymentController.prototype, "processGoodsPayment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.DRIVER, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.POS),
    (0, common_1.Get)('find-by-referrent-id/:referrentId'),
    __param(0, (0, common_1.Param)('referrentId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], DriverPaymentController.prototype, "findAllByReferrentId", null);
exports.DriverPaymentController = DriverPaymentController = __decorate([
    (0, common_1.Controller)('driver/payment'),
    __metadata("design:paramtypes", [driver_payment_service_1.DriverPaymentService])
], DriverPaymentController);
//# sourceMappingURL=driver-payment.controller.js.map