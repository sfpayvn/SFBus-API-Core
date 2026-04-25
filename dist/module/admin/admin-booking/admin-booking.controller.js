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
exports.AdminBookingController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const admin_booking_service_1 = require("./admin-booking-service");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const mongoose_1 = require("mongoose");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const admin_update_booking_dto_1 = require("./dto/admin-update-booking.dto");
const admin_booking_dto_1 = require("./dto/admin-booking.dto");
const update_audit_fields_decorator_1 = require("../../../decorators/update-audit-fields.decorator");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let AdminBookingController = class AdminBookingController {
    constructor(adminBookingService) {
        this.adminBookingService = adminBookingService;
    }
    create(idempotencyKey, AdminCreateBookingDto, user) {
        if (!idempotencyKey) {
            throw new common_1.BadRequestException('Idempotency-Key is required');
        }
        const { tenantId, _id: userId } = user;
        const bookingsWithSource = AdminCreateBookingDto.map((booking) => ({
            ...booking,
            source: roles_constants_1.ROLE_CONSTANTS.ADMIN,
        }));
        return this.adminBookingService.create(bookingsWithSource, tenantId, userId, idempotencyKey);
    }
    update(AdminUpdateBusScheduleDto, user) {
        const tenantId = user.tenantId;
        return this.adminBookingService.update(AdminUpdateBusScheduleDto, tenantId);
    }
    findOne(id, user) {
        const tenantId = user.tenantId;
        return this.adminBookingService.findOne(id, tenantId);
    }
    findAllByScheduleId(busScheduleId, user) {
        const tenantId = user.tenantId;
        return this.adminBookingService.findAllByScheduleId(busScheduleId, tenantId);
    }
    async search(query, user) {
        const { tenantId } = user;
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = { key: 'createdAt', value: 'desc' }, filters = [], } = query;
        return this.adminBookingService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.AdminBookingController = AdminBookingController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: true, updateUpdatedBy: true }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('idempotency-key')),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminBookingController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: false, updateUpdatedBy: true }),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_update_booking_dto_1.AdminUpdateBookingDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminBookingController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminBookingController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Get)('find-all-by-schedule-id/:busScheduleId'),
    __param(0, (0, common_1.Param)('busScheduleId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], AdminBookingController.prototype, "findAllByScheduleId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_booking_dto_1.AdminSearchBookingPagingQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminBookingController.prototype, "search", null);
exports.AdminBookingController = AdminBookingController = __decorate([
    (0, common_1.Controller)('admin/booking'),
    __metadata("design:paramtypes", [admin_booking_service_1.AdminBookingService])
], AdminBookingController);
//# sourceMappingURL=admin-booking.controller.js.map