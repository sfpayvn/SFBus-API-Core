"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosBusTemplateModule = void 0;
const bus_template_schema_1 = require("../../../core/bus/bus-template/schema/bus-template.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pos_bus_template_controller_1 = require("./pos-bus-template.controller");
const pos_bus_template_service_1 = require("./pos-bus-template.service");
const pos_bus_type_module_1 = require("../pos-bus-type/pos-bus-type.module");
const pos_bus_service_module_1 = require("../pos-bus-service/pos-bus-service.module");
const bus_template_module_1 = require("../../../core/bus/bus-template/bus-template.module");
let PosBusTemplateModule = class PosBusTemplateModule {
};
exports.PosBusTemplateModule = PosBusTemplateModule;
exports.PosBusTemplateModule = PosBusTemplateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_template_schema_1.BusTemplateDocument.name, schema: bus_template_schema_1.BusTemplateSchema }]),
            (0, common_1.forwardRef)(() => pos_bus_service_module_1.PosBusServiceModule),
            (0, common_1.forwardRef)(() => pos_bus_type_module_1.PosBusTypeModule),
            (0, common_1.forwardRef)(() => bus_template_module_1.BusTemplateModule),
        ],
        controllers: [pos_bus_template_controller_1.PosBusTemplateController],
        providers: [pos_bus_template_service_1.PosBusTemplateService],
        exports: [pos_bus_template_service_1.PosBusTemplateService],
    })
], PosBusTemplateModule);
//# sourceMappingURL=pos-bus-template.module.js.map