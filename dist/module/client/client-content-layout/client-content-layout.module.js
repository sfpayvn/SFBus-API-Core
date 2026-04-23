"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientContentLayoutModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_content_layout_service_1 = require("./client-content-layout.service");
const client_content_layout_controller_1 = require("./client-content-layout.controller");
const content_layout_schema_1 = require("../../core/content-layout/schemas/content-layout.schema");
const content_layout_module_1 = require("../../core/content-layout/content-layout.module");
const client_tenant_module_1 = require("../client-tenant/client-tenant.module");
const tenant_module_1 = require("../../core/tenant/tenant.module");
let ClientContentLayoutModule = class ClientContentLayoutModule {
};
exports.ClientContentLayoutModule = ClientContentLayoutModule;
exports.ClientContentLayoutModule = ClientContentLayoutModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: content_layout_schema_1.ContentLayoutDocument.name, schema: content_layout_schema_1.ContentLayoutSchema }]),
            (0, common_1.forwardRef)(() => content_layout_module_1.ContentLayoutModule),
            (0, common_1.forwardRef)(() => client_tenant_module_1.ClientTenantModule),
            (0, common_1.forwardRef)(() => tenant_module_1.TenantModule),
        ],
        providers: [client_content_layout_service_1.ClientContentLayoutService],
        controllers: [client_content_layout_controller_1.ClientContentLayoutController],
        exports: [client_content_layout_service_1.ClientContentLayoutService],
    })
], ClientContentLayoutModule);
//# sourceMappingURL=client-content-layout.module.js.map