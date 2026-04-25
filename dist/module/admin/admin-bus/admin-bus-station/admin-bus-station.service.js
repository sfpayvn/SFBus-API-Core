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
exports.AdminBusStationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_station_schema_1 = require("../../../core/bus/bus-station/schema/bus-station.schema");
const bus_station_service_1 = require("../../../core/bus/bus-station/bus-station.service");
let AdminBusStationService = class AdminBusStationService {
    constructor(busStationModel, busStationService) {
        this.busStationModel = busStationModel;
        this.busStationService = busStationService;
        this.ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
    }
    async create(adminCreateBusStationDto, tenantId) {
        return this.busStationService.create(adminCreateBusStationDto, tenantId);
    }
    async update(adminUpdateBusStationDto, tenantId) {
        return this.busStationService.update(adminUpdateBusStationDto, tenantId);
    }
    async updates(adminUpdateBusStationDto, tenantIds) {
        return this.busStationService.updates(adminUpdateBusStationDto, tenantIds);
    }
    async delete(id, tenantId) {
        return this.busStationService.delete(id, tenantId);
    }
    async findAll(tenantIds) {
        return this.busStationService.findAll(tenantIds);
    }
    async findAllAvailable(tenantIds) {
        return this.busStationService.findAllAvailable(tenantIds);
    }
    async findAllUnAssignedAvailable(tenantId) {
        return this.busStationService.findAllUnAssignedAvailable(tenantId);
    }
    async findOffices(tenantIds) {
        return this.busStationService.findOffices(tenantIds);
    }
    async findOne(id, tenantIds) {
        return this.busStationService.findOne(id, tenantIds);
    }
    async findOneByProvinceId(provinceId, tenantIds) {
        return this.busStationService.findOneByProvinceId(provinceId, tenantIds);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        return this.busStationService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.AdminBusStationService = AdminBusStationService;
exports.AdminBusStationService = AdminBusStationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_station_schema_1.BusStationDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_station_service_1.BusStationService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_station_service_1.BusStationService])
], AdminBusStationService);
//# sourceMappingURL=admin-bus-station.service.js.map