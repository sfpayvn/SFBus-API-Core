"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bus_template_service_1 = require("./bus-template.service");
const bus_template_controller_1 = require("./bus-template.controller");
const bus_template_schema_1 = require("./schema/bus-template.schema");
const bus_service_module_1 = require("../bus-service/bus-service.module");
const bus_type_module_1 = require("../bus-type/bus-type.module");
let BusTemplateModule = class BusTemplateModule {
};
exports.BusTemplateModule = BusTemplateModule;
exports.BusTemplateModule = BusTemplateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_template_schema_1.BusTemplateDocument.name, schema: bus_template_schema_1.BusTemplateSchema }]),
            (0, common_1.forwardRef)(() => bus_service_module_1.BusServiceModule),
            (0, common_1.forwardRef)(() => bus_type_module_1.BusTypeModule),
        ],
        controllers: [bus_template_controller_1.BusTemplateController],
        providers: [bus_template_service_1.BusTemplateService],
        exports: [bus_template_service_1.BusTemplateService],
    })
], BusTemplateModule);
//# sourceMappingURL=bus-template.module.js.map