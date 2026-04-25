"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminFeeTaxModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_fee_tax_service_1 = require("./admin-fee-tax-service");
const admin_fee_tax_controller_1 = require("./admin-fee-tax.controller");
const fee_tax_schema_1 = require("../../core/fee-tax/schema/fee-tax.schema");
const fee_tax_service_1 = require("../../core/fee-tax/fee-tax.service");
let AdminFeeTaxModule = class AdminFeeTaxModule {
};
exports.AdminFeeTaxModule = AdminFeeTaxModule;
exports.AdminFeeTaxModule = AdminFeeTaxModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: fee_tax_schema_1.FeeTax.name, schema: fee_tax_schema_1.FeeTaxSchema }])],
        controllers: [admin_fee_tax_controller_1.AdminFeeTaxController],
        providers: [admin_fee_tax_service_1.AdminFeeTaxService, fee_tax_service_1.FeeTaxService],
        exports: [admin_fee_tax_service_1.AdminFeeTaxService],
    })
], AdminFeeTaxModule);
//# sourceMappingURL=admin-fee-tax.module.js.map