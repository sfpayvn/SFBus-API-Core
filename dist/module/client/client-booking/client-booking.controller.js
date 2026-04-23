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
exports.ClientBookingController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const client_booking_service_1 = require("./client-booking-service");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const mongoose_1 = require("mongoose");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const client_booking_dto_1 = require("./dto/client-booking.dto");
const pos_booking_dto_1 = require("../../pos/pos-booking/dto/pos-booking.dto");
const update_audit_fields_decorator_1 = require("../../../decorators/update-audit-fields.decorator");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let ClientBookingController = class ClientBookingController {
    constructor(clientBookingService) {
        this.clientBookingService = clientBookingService;
    }
    create(idempotencyKey, ClientCreateBookingDto, user) {
        if (!idempotencyKey) {
            throw new common_1.BadRequestException('Idempotency-Key is required');
        }
        const { tenantId, _id } = user;
        const bookingsWithSource = ClientCreateBookingDto.map((booking) => ({
            ...booking,
            source: roles_constants_1.ROLE_CONSTANTS.CLIENT,
        }));
        return this.clientBookingService.create(bookingsWithSource, tenantId, _id, idempotencyKey);
    }
    cancelBookingsByUser(body, user) {
        const { tenantId, _id: userId } = user;
        const { busScheduleId, bookingIds } = body;
        return this.clientBookingService.cancelBookingsByUser(userId, busScheduleId, bookingIds, tenantId);
    }
    findIncommingBookingByUser(user) {
        const { tenantId, _id: userId } = user;
        return this.clientBookingService.findIncommingBookingByUser(userId, tenantId);
    }
    async findHistoryByUser(query, user) {
        const { tenantId, _id: userId } = user;
        return this.clientBookingService.findHistoryByUser(query, userId, tenantId);
    }
    findOne(id, user) {
        const tenantId = user.tenantId;
        return this.clientBookingService.findOne(id, tenantId);
    }
    async findBookings2Payment(bookingIdsString, user) {
        const { tenantId, _id: userId } = user;
        const bookingIds = bookingIdsString.split(',').map((id) => new mongoose_1.Types.ObjectId(id));
        return this.clientBookingService.findBookings2Payment(userId, bookingIds, tenantId);
    }
    findAllByScheduleId(busScheduleId, user) {
        const tenantId = user.tenantId;
        return this.clientBookingService.findAllByScheduleId(busScheduleId, tenantId);
    }
};
exports.ClientBookingController = ClientBookingController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: true, updateUpdatedBy: false }),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.CLIENT, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.DRIVER),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('idempotency-key')),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], ClientBookingController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: true, updateUpdatedBy: true }),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.CLIENT, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.DRIVER),
    (0, common_1.Post)('cancel-by-user'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_booking_dto_1.PosCancelBookingDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], ClientBookingController.prototype, "cancelBookingsByUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.CLIENT, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.DRIVER),
    (0, common_1.Get)('find-incomming-by-user'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], ClientBookingController.prototype, "findIncommingBookingByUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.CLIENT, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.DRIVER),
    (0, common_1.Post)('find-history-by-user'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_booking_dto_1.ClientSearchBookingPagingQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], ClientBookingController.prototype, "findHistoryByUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.CLIENT, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.DRIVER),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], ClientBookingController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.CLIENT, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.DRIVER),
    (0, common_1.Get)('find-bookings-2-payment'),
    __param(0, (0, common_1.Query)('bookingIds')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], ClientBookingController.prototype, "findBookings2Payment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.CLIENT, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.DRIVER),
    (0, common_1.Get)('find-all-by-schedule-id/:busScheduleId'),
    __param(0, (0, common_1.Param)('busScheduleId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], ClientBookingController.prototype, "findAllByScheduleId", null);
exports.ClientBookingController = ClientBookingController = __decorate([
    (0, common_1.Controller)('client/booking'),
    __metadata("design:paramtypes", [client_booking_service_1.ClientBookingService])
], ClientBookingController);
//# sourceMappingURL=client-booking.controller.js.map