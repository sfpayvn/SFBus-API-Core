"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosBusStationModule = void 0;
const common_1 = require("@nestjs/common");
const pos_bus_station_service_1 = require("./pos-bus-station.service");
const pos_bus_station_controller_1 = require("./pos-bus-station.controller");
const mongoose_1 = require("@nestjs/mongoose");
const bus_station_schema_1 = require("../../../core/bus/bus-station/schema/bus-station.schema");
const bus_station_module_1 = require("../../../core/bus/bus-station/bus-station.module");
let PosBusStationModule = class PosBusStationModule {
};
exports.PosBusStationModule = PosBusStationModule;
exports.PosBusStationModule = PosBusStationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_station_schema_1.BusStationDocument.name, schema: bus_station_schema_1.BusStationSchema }]),
            (0, common_1.forwardRef)(() => bus_station_module_1.BusStationModule),
        ],
        controllers: [pos_bus_station_controller_1.PosBusStationController],
        providers: [pos_bus_station_service_1.PosBusStationService],
        exports: [pos_bus_station_service_1.PosBusStationService],
    })
], PosBusStationModule);
//# sourceMappingURL=pos-bus-station.module.js.map