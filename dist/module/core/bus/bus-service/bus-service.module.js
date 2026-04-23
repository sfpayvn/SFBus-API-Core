"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusServiceModule = void 0;
const common_1 = require("@nestjs/common");
const bus_service_service_1 = require("./bus-service.service");
const bus_service_controller_1 = require("./bus-service.controller");
const mongoose_1 = require("@nestjs/mongoose");
const bus_service_schema_1 = require("./schema/bus-service.schema");
let BusServiceModule = class BusServiceModule {
};
exports.BusServiceModule = BusServiceModule;
exports.BusServiceModule = BusServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: bus_service_schema_1.BusServiceDocument.name, schema: bus_service_schema_1.BusServiceSchema }])],
        controllers: [bus_service_controller_1.BusServiceController],
        providers: [bus_service_service_1.BusServiceService],
        exports: [bus_service_service_1.BusServiceService],
    })
], BusServiceModule);
//# sourceMappingURL=bus-service.module.js.map