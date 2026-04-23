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
exports.BusStationController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const bus_station_service_1 = require("./bus-station.service");
const create_bus_station_dto_1 = require("./dto/create-bus-station.dto");
const update_bus_station_dto_1 = require("./dto/update-bus-station.dto");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const mongoose_1 = require("mongoose");
const bus_station_dto_1 = require("./dto/bus-station.dto");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let BusStationController = class BusStationController {
    constructor(busStationService) {
        this.busStationService = busStationService;
    }
    create(createBusStationDto, user) {
        const { tenantId } = user;
        return this.busStationService.create(createBusStationDto, tenantId);
    }
    update(updateBusStationDto, user) {
        const { tenantId } = user;
        return this.busStationService.update(updateBusStationDto, tenantId);
    }
    updates(updateBusStationsDto, user) {
        const { tenantId } = user;
        return this.busStationService.updates(updateBusStationsDto, [tenantId]);
    }
    delete(id, user) {
        const { tenantId } = user;
        return this.busStationService.delete(id, tenantId);
    }
    findAll(user) {
        const { tenantId } = user;
        return this.busStationService.findAll([tenantId]);
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.busStationService.findOne(id, [tenantId]);
    }
    findOneByProvinceId(provinceId, user) {
        const { tenantId } = user;
        return this.busStationService.findOneByProvinceId(provinceId, [tenantId]);
    }
    search(query, user) {
        const { tenantId } = user;
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        return this.busStationService.search(+pageIdx, +pageSize, keyword, sortBy, filters, [tenantId]);
    }
};
exports.BusStationController = BusStationController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bus_station_dto_1.CreateBusStationDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusStationController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)(''),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_bus_station_dto_1.UpdateBusStationDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusStationController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)('/updates'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusStationController.prototype, "updates", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusStationController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('find-all'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusStationController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusStationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('findOneByProvinceId/:provinceId'),
    __param(0, (0, common_1.Param)('provinceId', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusStationController.prototype, "findOneByProvinceId", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bus_station_dto_1.SearchBusStationsQuery, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], BusStationController.prototype, "search", null);
exports.BusStationController = BusStationController = __decorate([
    (0, common_1.Controller)('bus-station'),
    __metadata("design:paramtypes", [bus_station_service_1.BusStationService])
], BusStationController);
//# sourceMappingURL=bus-station.controller.js.map