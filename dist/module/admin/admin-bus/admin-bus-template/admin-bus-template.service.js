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
exports.AdminBusTemplateService = void 0;
const bus_template_service_1 = require("../../../core/bus/bus-template/bus-template.service");
const bus_template_schema_1 = require("../../../core/bus/bus-template/schema/bus-template.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AdminBusTemplateService = class AdminBusTemplateService {
    constructor(busTemplateModel, busTemplateService) {
        this.busTemplateModel = busTemplateModel;
        this.busTemplateService = busTemplateService;
        this.ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
    }
    async create(adminCreateBusTemplateDto, tenantId) {
        return this.busTemplateService.create(adminCreateBusTemplateDto, tenantId);
    }
    async update(adminUpdateBusTemplateDto, tenantId) {
        return this.busTemplateService.update(adminUpdateBusTemplateDto, tenantId);
    }
    async delete(id, tenantId) {
        return this.busTemplateService.delete(id, tenantId);
    }
    async findAll(tenantIds) {
        return this.busTemplateService.findAll(tenantIds);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        return this.busTemplateService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.AdminBusTemplateService = AdminBusTemplateService;
exports.AdminBusTemplateService = AdminBusTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_template_schema_1.BusTemplateDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_template_service_1.BusTemplateService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_template_service_1.BusTemplateService])
], AdminBusTemplateService);
//# sourceMappingURL=admin-bus-template.service.js.map