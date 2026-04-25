"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBusServiceModule = void 0;
const bus_service_schema_1 = require("../../../core/bus/bus-service/schema/bus-service.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_bus_service_controller_1 = require("./admin-bus-service.controller");
const admin_bus_service_service_1 = require("./admin-bus-service.service");
const bus_service_module_1 = require("../../../core/bus/bus-service/bus-service.module");
let AdminBusServiceModule = class AdminBusServiceModule {
};
exports.AdminBusServiceModule = AdminBusServiceModule;
exports.AdminBusServiceModule = AdminBusServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_service_schema_1.BusServiceDocument.name, schema: bus_service_schema_1.BusServiceSchema }]),
            (0, common_1.forwardRef)(() => bus_service_module_1.BusServiceModule),
        ],
        controllers: [admin_bus_service_controller_1.AdminBusServiceController],
        providers: [admin_bus_service_service_1.AdminBusServiceService],
        exports: [admin_bus_service_service_1.AdminBusServiceService],
    })
], AdminBusServiceModule);
//# sourceMappingURL=admin-bus-service.module.js.map