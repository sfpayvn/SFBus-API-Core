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
exports.PosBusService = void 0;
const bus_schema_1 = require("../../../core/bus/bus/schema/bus.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_service_1 = require("../../../core/bus/bus/bus.service");
let PosBusService = class PosBusService {
    constructor(busModel, busService) {
        this.busModel = busModel;
        this.busService = busService;
    }
    async findOne(id, tenantId) {
        return this.busService.findOne(id, tenantId);
    }
    async findByBusTemplate(busTemplateId, tenantId, rootTenantId) {
        return this.busService.findByBusTemplate(busTemplateId, tenantId, rootTenantId);
    }
    async findAll(tenantId) {
        return this.busService.findAll(tenantId);
    }
};
exports.PosBusService = PosBusService;
exports.PosBusService = PosBusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_schema_1.BusDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_service_1.BusService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_service_1.BusService])
], PosBusService);
//# sourceMappingURL=pos-bus.service.js.map