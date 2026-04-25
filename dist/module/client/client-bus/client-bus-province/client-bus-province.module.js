"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientBusProvinceModule = void 0;
const bus_schema_schema_1 = require("../../../core/bus/bus-province/schema/bus-schema.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_bus_province_controller_1 = require("./client-bus-province.controller");
const client_bus_province_service_1 = require("./client-bus-province.service");
const bus_province_module_1 = require("../../../core/bus/bus-province/bus-province.module");
let ClientBusProvinceModule = class ClientBusProvinceModule {
};
exports.ClientBusProvinceModule = ClientBusProvinceModule;
exports.ClientBusProvinceModule = ClientBusProvinceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_schema_schema_1.BusProvinceDocument.name, schema: bus_schema_schema_1.BusProvinceSchema }]),
            (0, common_1.forwardRef)(() => bus_province_module_1.BusProvinceModule),
        ],
        controllers: [client_bus_province_controller_1.ClientBusProvinceController],
        providers: [client_bus_province_service_1.ClientBusProvinceService],
        exports: [client_bus_province_service_1.ClientBusProvinceService],
    })
], ClientBusProvinceModule);
//# sourceMappingURL=client-bus-province.module.js.map