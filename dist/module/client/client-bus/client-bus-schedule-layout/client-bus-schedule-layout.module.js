"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientBusScheduleLayoutModule = void 0;
const bus_schedule_layout_schema_1 = require("../../../core/bus/bus-schedule-layout/schema/bus-schedule-layout.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_bus_schedule_layout_controller_1 = require("./client-bus-schedule-layout.controller");
const client_bus_schedule_layout_service_1 = require("./client-bus-schedule-layout.service");
const bus_schedule_layout_module_1 = require("../../../core/bus/bus-schedule-layout/bus-schedule-layout.module");
const client_tenant_module_1 = require("../../client-tenant/client-tenant.module");
const tenant_module_1 = require("../../../core/tenant/tenant.module");
let ClientBusScheduleLayoutModule = class ClientBusScheduleLayoutModule {
};
exports.ClientBusScheduleLayoutModule = ClientBusScheduleLayoutModule;
exports.ClientBusScheduleLayoutModule = ClientBusScheduleLayoutModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_schedule_layout_schema_1.BusScheduleLayoutDocument.name, schema: bus_schedule_layout_schema_1.BusScheduleLayoutSchema }]),
            (0, common_1.forwardRef)(() => bus_schedule_layout_module_1.BusScheduleLayoutModule),
            (0, common_1.forwardRef)(() => client_tenant_module_1.ClientTenantModule),
            (0, common_1.forwardRef)(() => tenant_module_1.TenantModule),
        ],
        controllers: [client_bus_schedule_layout_controller_1.ClientBusScheduleLayoutController],
        providers: [client_bus_schedule_layout_service_1.ClientBusScheduleLayoutService],
        exports: [client_bus_schedule_layout_service_1.ClientBusScheduleLayoutService],
    })
], ClientBusScheduleLayoutModule);
//# sourceMappingURL=client-bus-schedule-layout.module.js.map