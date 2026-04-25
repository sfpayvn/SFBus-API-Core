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
exports.PosBookingController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const pos_booking_service_1 = require("./pos-booking-service");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const mongoose_1 = require("mongoose");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const pos_update_booking_dto_1 = require("./dto/pos-update-booking.dto");
const pos_booking_dto_1 = require("./dto/pos-booking.dto");
const update_audit_fields_decorator_1 = require("../../../decorators/update-audit-fields.decorator");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let PosBookingController = class PosBookingController {
    constructor(posBookingService) {
        this.posBookingService = posBookingService;
    }
    create(idempotencyKey, posCreateBookingDto, user) {
        if (!idempotencyKey) {
            throw new common_1.BadRequestException('Idempotency-Key is required');
        }
        const { _id, tenantId } = user;
        const bookingsWithSource = posCreateBookingDto.map((booking) => ({
            ...booking,
            source: roles_constants_1.ROLE_CONSTANTS.POS,
        }));
        return this.posBookingService.create(bookingsWithSource, tenantId, _id, idempotencyKey);
    }
    cancelBookings(body, user) {
        const { tenantId } = user;
        const { busScheduleId, bookingIds } = body;
        return this.posBookingService.cancelBookings(busScheduleId, bookingIds, tenantId, user._id);
    }
    update(posUpdateBookingDto, user) {
        const { tenantId, _id } = user;
        return this.posBookingService.update(posUpdateBookingDto, tenantId, _id);
    }
    updates(posUpdateBookingsDto, user) {
        const { tenantId, _id } = user;
        return this.posBookingService.updates(posUpdateBookingsDto, tenantId, _id);
    }
    findOne(id, user) {
        const tenantId = user.tenantId;
        return this.posBookingService.findOne(id, tenantId);
    }
    findAllByScheduleId(busScheduleId, user) {
        const tenantId = user.tenantId;
        return this.posBookingService.findAllByScheduleId(busScheduleId, tenantId);
    }
    async search(query, user) {
        const { tenantId } = user;
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = { key: 'createdAt', value: 'desc' }, filters = [], } = query;
        return this.posBookingService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.PosBookingController = PosBookingController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: true, updateUpdatedBy: true }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('idempotency-key')),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosBookingController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: false, updateUpdatedBy: true }),
    (0, common_1.Post)('cancel'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_booking_dto_1.PosCancelBookingDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosBookingController.prototype, "cancelBookings", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: false, updateUpdatedBy: true }),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_update_booking_dto_1.PosUpdateBookingDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosBookingController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: false, updateUpdatedBy: true }),
    (0, common_1.Put)('updates'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosBookingController.prototype, "updates", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosBookingController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('find-all-by-schedule-id/:busScheduleId'),
    __param(0, (0, common_1.Param)('busScheduleId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosBookingController.prototype, "findAllByScheduleId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_booking_dto_1.PosSearchBookingPagingQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], PosBookingController.prototype, "search", null);
exports.PosBookingController = PosBookingController = __decorate([
    (0, common_1.Controller)('pos/booking'),
    __metadata("design:paramtypes", [pos_booking_service_1.PosBookingService])
], PosBookingController);
//# sourceMappingURL=pos-booking.controller.js.map