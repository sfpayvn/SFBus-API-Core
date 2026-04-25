"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientBusTemplateModule = void 0;
const bus_template_schema_1 = require("../../../core/bus/bus-template/schema/bus-template.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_bus_template_controller_1 = require("./client-bus-template.controller");
const client_bus_template_service_1 = require("./client-bus-template.service");
const client_bus_type_module_1 = require("../client-bus-type/client-bus-type.module");
const client_bus_service_module_1 = require("../client-bus-service/client-bus-service.module");
const bus_template_module_1 = require("../../../core/bus/bus-template/bus-template.module");
let ClientBusTemplateModule = class ClientBusTemplateModule {
};
exports.ClientBusTemplateModule = ClientBusTemplateModule;
exports.ClientBusTemplateModule = ClientBusTemplateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_template_schema_1.BusTemplateDocument.name, schema: bus_template_schema_1.BusTemplateSchema }]),
            (0, common_1.forwardRef)(() => client_bus_service_module_1.ClientBusServiceModule),
            (0, common_1.forwardRef)(() => client_bus_type_module_1.ClientBusTypeModule),
            (0, common_1.forwardRef)(() => bus_template_module_1.BusTemplateModule),
        ],
        controllers: [client_bus_template_controller_1.ClientBusTemplateController],
        providers: [client_bus_template_service_1.ClientBusTemplateService],
        exports: [client_bus_template_service_1.ClientBusTemplateService],
    })
], ClientBusTemplateModule);
//# sourceMappingURL=client-bus-template.module.js.map