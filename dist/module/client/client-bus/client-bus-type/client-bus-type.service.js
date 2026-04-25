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
exports.ClientBusTypeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_type_schema_1 = require("../../../core/bus/bus-type/schema/bus-type.schema");
const bus_type_service_1 = require("../../../core/bus/bus-type/bus-type.service");
let ClientBusTypeService = class ClientBusTypeService {
    constructor(busTypeModel, busTypeService) {
        this.busTypeModel = busTypeModel;
        this.busTypeService = busTypeService;
        this.ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
    }
    async findAll(tenantIds) {
        return this.busTypeService.findAll(tenantIds);
    }
    async findOne(id, tenantIds) {
        return this.busTypeService.findOne(id, tenantIds);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        return this.busTypeService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.ClientBusTypeService = ClientBusTypeService;
exports.ClientBusTypeService = ClientBusTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_type_schema_1.BusTypeDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_type_service_1.BusTypeService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_type_service_1.BusTypeService])
], ClientBusTypeService);
//# sourceMappingURL=client-bus-type.service.js.map