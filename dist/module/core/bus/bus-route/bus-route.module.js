"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusRouteModule = void 0;
const common_1 = require("@nestjs/common");
const bus_route_service_1 = require("./bus-route.service");
const bus_route_controller_1 = require("./bus-route.controller");
const mongoose_1 = require("@nestjs/mongoose");
const bus_route_schema_1 = require("./schema/bus-route.schema");
const bus_station_module_1 = require("../bus-station/bus-station.module");
let BusRouteModule = class BusRouteModule {
};
exports.BusRouteModule = BusRouteModule;
exports.BusRouteModule = BusRouteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_route_schema_1.BusRouteDocument.name, schema: bus_route_schema_1.BusRouteSchema }]),
            (0, common_1.forwardRef)(() => bus_station_module_1.BusStationModule),
        ],
        controllers: [bus_route_controller_1.BusRouteController],
        providers: [bus_route_service_1.BusRouteService],
        exports: [bus_route_service_1.BusRouteService],
    })
], BusRouteModule);
//# sourceMappingURL=bus-route.module.js.map