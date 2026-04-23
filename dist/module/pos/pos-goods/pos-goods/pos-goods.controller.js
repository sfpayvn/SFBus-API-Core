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
exports.PosGoodsController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const pos_goods_service_1 = require("./pos-goods-service");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const mongoose_1 = require("mongoose");
const pos_update_goods_dto_1 = require("./dto/pos-update-goods.dto");
const pos_create_goods_dto_1 = require("./dto/pos-create-goods.dto");
const pos_goods_dto_1 = require("./dto/pos-goods.dto");
const update_audit_fields_decorator_1 = require("../../../../decorators/update-audit-fields.decorator");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let PosGoodsController = class PosGoodsController {
    constructor(posGoodsService) {
        this.posGoodsService = posGoodsService;
    }
    create(PosCreateGoodsDto, user) {
        const { tenantId, _id: createdBy } = user;
        return this.posGoodsService.create(PosCreateGoodsDto, tenantId, createdBy);
    }
    update(PosUpdateGoodsDto, user) {
        const { tenantId, _id: updatedBy } = user;
        return this.posGoodsService.update(PosUpdateGoodsDto, tenantId, updatedBy);
    }
    updates(PosUpdateGoodsDto, user) {
        const { tenantId, _id: updatedBy } = user;
        return this.posGoodsService.updates(PosUpdateGoodsDto, tenantId, updatedBy);
    }
    remove(id, user) {
        const { tenantId, _id: deletedBy } = user;
        return this.posGoodsService.remove(id, tenantId, deletedBy);
    }
    findAll(user) {
        const { tenantId } = user;
        return this.posGoodsService.findAll(tenantId);
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.posGoodsService.findOne(id, tenantId);
    }
    findAllGoodsForBusSchedule(busScheduleId, user) {
        const { tenantId } = user;
        return this.posGoodsService.findAllGoodsForBusSchedule(busScheduleId, tenantId);
    }
    findAllGoodsAvailable(busRouteId, user) {
        const { tenantId } = user;
        return this.posGoodsService.findAllGoodsAvailable(busRouteId, tenantId);
    }
    async searchGoodsPaging(query, user) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        const { tenantId } = user;
        return this.posGoodsService.searchGoodsPaging(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
    async updatesGoodsScheduleAssignment(posRequestUpdateGoodsScheduleAssignmentDto, user) {
        const { tenantId, _id: updatedBy } = user;
        return this.posGoodsService.updatesGoodsScheduleAssignment(posRequestUpdateGoodsScheduleAssignmentDto, tenantId, updatedBy);
    }
};
exports.PosGoodsController = PosGoodsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: true, updateUpdatedBy: true }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_create_goods_dto_1.PosCreateGoodsDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosGoodsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: false, updateUpdatedBy: true }),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_update_goods_dto_1.PosUpdateGoodsDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosGoodsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: false, updateUpdatedBy: true }),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)('updates'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosGoodsController.prototype, "updates", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: false, updateUpdatedBy: true }),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosGoodsController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosGoodsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosGoodsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('find-all-goods-for-bus-schedule'),
    __param(0, (0, common_1.Query)('busScheduleId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosGoodsController.prototype, "findAllGoodsForBusSchedule", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('find-all-goods-available'),
    __param(0, (0, common_1.Query)('busRouteId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosGoodsController.prototype, "findAllGoodsAvailable", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_goods_dto_1.PosSearchGoodsPagingQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], PosGoodsController.prototype, "searchGoodsPaging", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, update_audit_fields_decorator_1.UpdateAuditFields)({ updateCreatedBy: false, updateUpdatedBy: true }),
    (0, common_1.Put)('updates-goods-schedule-assignments'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], PosGoodsController.prototype, "updatesGoodsScheduleAssignment", null);
exports.PosGoodsController = PosGoodsController = __decorate([
    (0, common_1.Controller)('pos/goods'),
    __metadata("design:paramtypes", [pos_goods_service_1.PosGoodsService])
], PosGoodsController);
//# sourceMappingURL=pos-goods.controller.js.map