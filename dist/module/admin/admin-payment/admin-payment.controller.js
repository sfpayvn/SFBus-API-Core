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
exports.AdminPaymentController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const admin_payment_service_1 = require("./admin-payment-service");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const mongoose_1 = require("mongoose");
const admin_payment_dto_1 = require("./dto/admin-payment.dto");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let AdminPaymentController = class AdminPaymentController {
    constructor(adminPaymentService) {
        this.adminPaymentService = adminPaymentService;
    }
    processBookingPayment(adminRequestPaymentDto, user) {
        const { tenantId, _id } = user;
        return this.adminPaymentService.processBookingPayment(adminRequestPaymentDto, tenantId, _id);
    }
    processGoodsPayment(adminRequestPaymentDto, user) {
        const { tenantId, _id } = user;
        return this.adminPaymentService.processGoodsPayment(adminRequestPaymentDto, tenantId, _id);
    }
    findAllByReferrentId(referrentId, user) {
        const tenantId = user.tenantId;
        return this.adminPaymentService.findAllByReferrentId(referrentId, tenantId);
    }
};
exports.AdminPaymentController = AdminPaymentController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('/processBookingPayment'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_payment_dto_1.AdminRequestPaymentDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminPaymentController.prototype, "processBookingPayment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('/processGoodsPayment'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_payment_dto_1.AdminRequestPaymentDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminPaymentController.prototype, "processGoodsPayment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Get)('find-by-referrent-id/:referrentId'),
    __param(0, (0, common_1.Param)('referrentId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminPaymentController.prototype, "findAllByReferrentId", null);
exports.AdminPaymentController = AdminPaymentController = __decorate([
    (0, common_1.Controller)('admin/payment'),
    __metadata("design:paramtypes", [admin_payment_service_1.AdminPaymentService])
], AdminPaymentController);
//# sourceMappingURL=admin-payment.controller.js.map