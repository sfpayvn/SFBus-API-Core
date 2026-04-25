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
exports.ClientBusProvinceService = void 0;
const bus_province_service_1 = require("../../../core/bus/bus-province/bus-province.service");
const bus_schema_schema_1 = require("../../../core/bus/bus-province/schema/bus-schema.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ClientBusProvinceService = class ClientBusProvinceService {
    constructor(busProvinceModel, busProvinceService) {
        this.busProvinceModel = busProvinceModel;
        this.busProvinceService = busProvinceService;
        this.ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
    }
    async findAll(tenantIds) {
        return this.busProvinceService.findAll(tenantIds);
    }
    async findOne(id, tenantIds) {
        return this.busProvinceService.findOne(id, tenantIds);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        return this.busProvinceService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.ClientBusProvinceService = ClientBusProvinceService;
exports.ClientBusProvinceService = ClientBusProvinceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_schema_schema_1.BusProvinceDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_province_service_1.BusProvinceService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_province_service_1.BusProvinceService])
], ClientBusProvinceService);
//# sourceMappingURL=client-bus-province.service.js.map