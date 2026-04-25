"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusLayoutTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bus_layout_template_schema_1 = require("./schema/bus-layout-template.schema");
const bus_layout_template_controller_1 = require("./bus-layout-template.controller");
const bus_layout_template_service_1 = require("./bus-layout-template.service");
let BusLayoutTemplateModule = class BusLayoutTemplateModule {
};
exports.BusLayoutTemplateModule = BusLayoutTemplateModule;
exports.BusLayoutTemplateModule = BusLayoutTemplateModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: bus_layout_template_schema_1.BusLayoutTemplateDocument.name, schema: bus_layout_template_schema_1.BusLayoutTemplateSchema }])],
        controllers: [bus_layout_template_controller_1.BusLayoutTemplateController],
        providers: [bus_layout_template_service_1.BusLayoutTemplateService],
        exports: [bus_layout_template_service_1.BusLayoutTemplateService],
    })
], BusLayoutTemplateModule);
//# sourceMappingURL=bus-layout-template.module.js.map