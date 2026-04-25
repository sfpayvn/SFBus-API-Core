"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBusModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_bus_controller_1 = require("./admin-bus.controller");
const admin_bus_service_1 = require("./admin-bus.service");
const bus_schema_1 = require("../../../core/bus/bus/schema/bus.schema");
const bus_module_1 = require("../../../core/bus/bus/bus.module");
let AdminBusModule = class AdminBusModule {
};
exports.AdminBusModule = AdminBusModule;
exports.AdminBusModule = AdminBusModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: bus_schema_1.BusDocument.name, schema: bus_schema_1.BusSchema }]), (0, common_1.forwardRef)(() => bus_module_1.BusModule)],
        controllers: [admin_bus_controller_1.AdminBusController],
        providers: [admin_bus_service_1.AdminBusService],
        exports: [admin_bus_service_1.AdminBusService],
    })
], AdminBusModule);
//# sourceMappingURL=admin-bus.module.js.map