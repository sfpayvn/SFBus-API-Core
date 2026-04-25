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
exports.AdminBusLayoutTemplateService = void 0;
const bus_layout_template_schema_1 = require("../../../core/bus/bus-layout-template/schema/bus-layout-template.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_layout_template_service_1 = require("../../../core/bus/bus-layout-template/bus-layout-template.service");
let AdminBusLayoutTemplateService = class AdminBusLayoutTemplateService {
    constructor(busLayoutTemplateModel, busLayoutTemplateService) {
        this.busLayoutTemplateModel = busLayoutTemplateModel;
        this.busLayoutTemplateService = busLayoutTemplateService;
        this.ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
    }
    async create(adminCreateBusLayoutTemplateDto, tenantId) {
        return this.busLayoutTemplateService.create(adminCreateBusLayoutTemplateDto, tenantId);
    }
    async findAll(tenantIds) {
        return await this.busLayoutTemplateService.findAll(tenantIds);
    }
    async findOne(id, tenantIds) {
        return this.busLayoutTemplateService.findOne(id, tenantIds);
    }
    async update(adminUpdateBusLayoutTemplateDto, tenantId) {
        return this.busLayoutTemplateService.update(adminUpdateBusLayoutTemplateDto, tenantId);
    }
    async delete(id, tenantId) {
        return this.busLayoutTemplateService.delete(id, tenantId);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        return this.busLayoutTemplateService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.AdminBusLayoutTemplateService = AdminBusLayoutTemplateService;
exports.AdminBusLayoutTemplateService = AdminBusLayoutTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_layout_template_schema_1.BusLayoutTemplateDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_layout_template_service_1.BusLayoutTemplateService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_layout_template_service_1.BusLayoutTemplateService])
], AdminBusLayoutTemplateService);
//# sourceMappingURL=admin-bus-layout-template.service.js.map