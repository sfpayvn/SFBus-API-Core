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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminFeeTaxService = void 0;
const common_1 = require("@nestjs/common");
const fee_tax_service_1 = require("../../core/fee-tax/fee-tax.service");
let AdminFeeTaxService = class AdminFeeTaxService {
    constructor(feeTaxService) {
        this.feeTaxService = feeTaxService;
    }
    async create(tenantId, createDto, userId) {
        return this.feeTaxService.create(tenantId.toString(), createDto, userId?.toString());
    }
    async findByTenant(tenantId, enabled) {
        return this.feeTaxService.findByTenant(tenantId.toString(), enabled);
    }
    async findById(id, tenantId) {
        return this.feeTaxService.findById(id, tenantId.toString());
    }
    async update(id, tenantId, updateDto, userId) {
        return this.feeTaxService.update(id, tenantId.toString(), updateDto, userId?.toString());
    }
    async delete(id, tenantId) {
        return this.feeTaxService.delete(id, tenantId.toString());
    }
    async getApplicableFeesTaxes(tenantId, params) {
        return this.feeTaxService.getApplicableFeesTaxes(tenantId.toString(), params);
    }
    async calculateFeesAndTaxes(tenantId, params) {
        return this.feeTaxService.calculateFeesAndTaxes(tenantId.toString(), params);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        return this.feeTaxService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.AdminFeeTaxService = AdminFeeTaxService;
exports.AdminFeeTaxService = AdminFeeTaxService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [fee_tax_service_1.FeeTaxService])
], AdminFeeTaxService);
//# sourceMappingURL=admin-fee-tax-service.js.map