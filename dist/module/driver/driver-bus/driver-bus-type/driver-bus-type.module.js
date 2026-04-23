"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverBusTypeModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const driver_bus_type_controller_1 = require("./driver-bus-type.controller");
const driver_bus_type_service_1 = require("./driver-bus-type.service");
const bus_type_schema_1 = require("../../../core/bus/bus-type/schema/bus-type.schema");
const common_1 = require("@nestjs/common");
const bus_type_module_1 = require("../../../core/bus/bus-type/bus-type.module");
let DriverBusTypeModule = class DriverBusTypeModule {
};
exports.DriverBusTypeModule = DriverBusTypeModule;
exports.DriverBusTypeModule = DriverBusTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_type_schema_1.BusTypeDocument.name, schema: bus_type_schema_1.BusTypeSchema }]),
            (0, common_1.forwardRef)(() => bus_type_module_1.BusTypeModule),
        ],
        controllers: [driver_bus_type_controller_1.DriverBusTypeController],
        providers: [driver_bus_type_service_1.DriverBusTypeService],
        exports: [driver_bus_type_service_1.DriverBusTypeService],
    })
], DriverBusTypeModule);
//# sourceMappingURL=driver-bus-type.module.js.map