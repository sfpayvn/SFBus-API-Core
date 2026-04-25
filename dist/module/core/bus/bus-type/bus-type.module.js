"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusTypeModule = void 0;
const common_1 = require("@nestjs/common");
const bus_type_service_1 = require("./bus-type.service");
const mongoose_1 = require("@nestjs/mongoose");
const bus_type_controller_1 = require("./bus-type.controller");
const bus_type_schema_1 = require("./schema/bus-type.schema");
let BusTypeModule = class BusTypeModule {
};
exports.BusTypeModule = BusTypeModule;
exports.BusTypeModule = BusTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: bus_type_schema_1.BusTypeDocument.name, schema: bus_type_schema_1.BusTypeSchema }])],
        controllers: [bus_type_controller_1.BusTypeController],
        providers: [bus_type_service_1.BusTypeService],
        exports: [bus_type_service_1.BusTypeService],
    })
], BusTypeModule);
//# sourceMappingURL=bus-type.module.js.map