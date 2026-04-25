"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientBusRouteModule = void 0;
const bus_route_schema_1 = require("../../../core/bus/bus-route/schema/bus-route.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_bus_route_controller_1 = require("./client-bus-route.controller");
const client_bus_route_service_1 = require("./client-bus-route.service");
const bus_route_module_1 = require("../../../core/bus/bus-route/bus-route.module");
let ClientBusRouteModule = class ClientBusRouteModule {
};
exports.ClientBusRouteModule = ClientBusRouteModule;
exports.ClientBusRouteModule = ClientBusRouteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_route_schema_1.BusRouteDocument.name, schema: bus_route_schema_1.BusRouteSchema }]),
            (0, common_1.forwardRef)(() => bus_route_module_1.BusRouteModule),
        ],
        controllers: [client_bus_route_controller_1.ClientBusRouteController],
        providers: [client_bus_route_service_1.ClientBusRouteService],
        exports: [client_bus_route_service_1.ClientBusRouteService],
    })
], ClientBusRouteModule);
//# sourceMappingURL=client-bus-route.module.js.map