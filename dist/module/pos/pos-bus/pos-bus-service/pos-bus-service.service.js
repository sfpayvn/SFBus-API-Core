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
exports.PosBusServiceService = void 0;
const bus_service_service_1 = require("../../../core/bus/bus-service/bus-service.service");
const bus_service_schema_1 = require("../../../core/bus/bus-service/schema/bus-service.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PosBusServiceService = class PosBusServiceService {
    constructor(busServiceModel, busServiceService) {
        this.busServiceModel = busServiceModel;
        this.busServiceService = busServiceService;
        this.ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
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
exports.PosBusServiceService = PosBusServiceService;
exports.PosBusServiceService = PosBusServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_service_schema_1.BusServiceDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_service_service_1.BusServiceService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_service_service_1.BusServiceService])
], PosBusServiceService);
//# sourceMappingURL=pos-bus-service.service.js.map