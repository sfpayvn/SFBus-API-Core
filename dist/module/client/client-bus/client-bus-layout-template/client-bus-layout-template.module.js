"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientBusLayoutTemplateModule = void 0;
const bus_layout_template_schema_1 = require("../../../core/bus/bus-layout-template/schema/bus-layout-template.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_bus_layout_template_controller_1 = require("./client-bus-layout-template.controller");
const client_bus_layout_template_service_1 = require("./client-bus-layout-template.service");
const bus_layout_template_module_1 = require("../../../core/bus/bus-layout-template/bus-layout-template.module");
let ClientBusLayoutTemplateModule = class ClientBusLayoutTemplateModule {
};
exports.ClientBusLayoutTemplateModule = ClientBusLayoutTemplateModule;
exports.ClientBusLayoutTemplateModule = ClientBusLayoutTemplateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_layout_template_schema_1.BusLayoutTemplateDocument.name, schema: bus_layout_template_schema_1.BusLayoutTemplateSchema }]),
            (0, common_1.forwardRef)(() => bus_layout_template_module_1.BusLayoutTemplateModule),
        ],
        controllers: [client_bus_layout_template_controller_1.ClientBusLayoutTemplateController],
        providers: [client_bus_layout_template_service_1.ClientBusLayoutTemplateService],
        exports: [client_bus_layout_template_service_1.ClientBusLayoutTemplateService],
    })
], ClientBusLayoutTemplateModule);
//# sourceMappingURL=client-bus-layout-template.module.js.map