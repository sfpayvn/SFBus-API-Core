"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bus_service_1 = require("./bus.service");
const bus_controller_1 = require("./bus.controller");
const bus_schema_1 = require("./schema/bus.schema");
const bus_service_module_1 = require("../bus-service/bus-service.module");
const bus_type_module_1 = require("../bus-type/bus-type.module");
const bus_template_module_1 = require("../bus-template/bus-template.module");
let BusModule = class BusModule {
};
exports.BusModule = BusModule;
exports.BusModule = BusModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_schema_1.BusDocument.name, schema: bus_schema_1.BusSchema }]),
            (0, common_1.forwardRef)(() => bus_service_module_1.BusServiceModule),
            (0, common_1.forwardRef)(() => bus_type_module_1.BusTypeModule),
            (0, common_1.forwardRef)(() => bus_template_module_1.BusTemplateModule),
        ],
        controllers: [bus_controller_1.BusController],
        providers: [bus_service_1.BusService],
        exports: [bus_service_1.BusService],
    })
], BusModule);
//# sourceMappingURL=bus.module.js.map