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
exports.ClientTenantService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const tenant_service_1 = require("../../core/tenant/tenant.service");
let ClientTenantService = class ClientTenantService {
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    findOne(id) {
        return this.tenantService.findOne(new mongoose_1.Types.ObjectId(id));
    }
    findByCode(code) {
        return this.tenantService.findByCode(code);
    }
    findByPhoneNumber(phoneNumber) {
        return this.tenantService.findByPhoneNumber(phoneNumber);
    }
};
exports.ClientTenantService = ClientTenantService;
exports.ClientTenantService = ClientTenantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => tenant_service_1.TenantService))),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], ClientTenantService);
//# sourceMappingURL=client-tenant.service.js.map