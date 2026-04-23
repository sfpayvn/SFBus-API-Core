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
exports.AdminBusServiceService = void 0;
const bus_service_service_1 = require("../../../core/bus/bus-service/bus-service.service");
const common_1 = require("@nestjs/common");
let AdminBusServiceService = class AdminBusServiceService {
    constructor(busServiceService) {
        this.busServiceService = busServiceService;
        this.ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
    }
    async create(adminCreateBusServiceDto, tenantId) {
        return this.busServiceService.create(adminCreateBusServiceDto, tenantId);
    }
    async update(adminUpdateBusServiceDto, tenantId) {
        return this.busServiceService.update(adminUpdateBusServiceDto, tenantId);
    }
    async delete(id, tenantId) {
        return this.busServiceService.delete(id, tenantId);
    }
    async findAll(tenantIds) {
        return this.busServiceService.findAll(tenantIds);
    }
    async findOne(id, tenantIds) {
        return this.busServiceService.findOne(id, tenantIds);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        return this.busServiceService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.AdminBusServiceService = AdminBusServiceService;
exports.AdminBusServiceService = AdminBusServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_service_service_1.BusServiceService))),
    __metadata("design:paramtypes", [bus_service_service_1.BusServiceService])
], AdminBusServiceService);
//# sourceMappingURL=admin-bus-service.service.js.map