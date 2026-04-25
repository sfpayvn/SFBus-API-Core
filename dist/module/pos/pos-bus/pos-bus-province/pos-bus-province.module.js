"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosBusProvinceModule = void 0;
const bus_schema_schema_1 = require("../../../core/bus/bus-province/schema/bus-schema.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pos_bus_province_controller_1 = require("./pos-bus-province.controller");
const pos_bus_province_service_1 = require("./pos-bus-province.service");
const bus_province_module_1 = require("../../../core/bus/bus-province/bus-province.module");
let PosBusProvinceModule = class PosBusProvinceModule {
};
exports.PosBusProvinceModule = PosBusProvinceModule;
exports.PosBusProvinceModule = PosBusProvinceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_schema_schema_1.BusProvinceDocument.name, schema: bus_schema_schema_1.BusProvinceSchema }]),
            (0, common_1.forwardRef)(() => bus_province_module_1.BusProvinceModule),
        ],
        controllers: [pos_bus_province_controller_1.PosBusProvinceController],
        providers: [pos_bus_province_service_1.PosBusProvinceService],
        exports: [pos_bus_province_service_1.PosBusProvinceService],
    })
], PosBusProvinceModule);
//# sourceMappingURL=pos-bus-province.module.js.map