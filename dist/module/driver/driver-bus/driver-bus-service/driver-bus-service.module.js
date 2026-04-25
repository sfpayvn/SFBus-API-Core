"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverBusServiceModule = void 0;
const bus_service_schema_1 = require("../../../core/bus/bus-service/schema/bus-service.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const driver_bus_service_controller_1 = require("./driver-bus-service.controller");
const driver_bus_service_service_1 = require("./driver-bus-service.service");
const bus_service_module_1 = require("../../../core/bus/bus-service/bus-service.module");
let DriverBusServiceModule = class DriverBusServiceModule {
};
exports.DriverBusServiceModule = DriverBusServiceModule;
exports.DriverBusServiceModule = DriverBusServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_service_schema_1.BusServiceDocument.name, schema: bus_service_schema_1.BusServiceSchema }]),
            (0, common_1.forwardRef)(() => bus_service_module_1.BusServiceModule),
        ],
        controllers: [driver_bus_service_controller_1.DriverBusServiceController],
        providers: [driver_bus_service_service_1.DriverBusServiceService],
        exports: [driver_bus_service_service_1.DriverBusServiceService],
    })
], DriverBusServiceModule);
//# sourceMappingURL=driver-bus-service.module.js.map