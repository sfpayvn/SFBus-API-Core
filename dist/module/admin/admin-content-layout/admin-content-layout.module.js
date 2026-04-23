"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminContentLayoutModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_content_layout_service_1 = require("./admin-content-layout.service");
const admin_content_layout_controller_1 = require("./admin-content-layout.controller");
const content_layout_schema_1 = require("../../core/content-layout/schemas/content-layout.schema");
const content_layout_module_1 = require("../../core/content-layout/content-layout.module");
let AdminContentLayoutModule = class AdminContentLayoutModule {
};
exports.AdminContentLayoutModule = AdminContentLayoutModule;
exports.AdminContentLayoutModule = AdminContentLayoutModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: content_layout_schema_1.ContentLayoutDocument.name, schema: content_layout_schema_1.ContentLayoutSchema }]),
            (0, common_1.forwardRef)(() => content_layout_module_1.ContentLayoutModule),
        ],
        providers: [admin_content_layout_service_1.AdminContentLayoutService],
        controllers: [admin_content_layout_controller_1.AdminContentLayoutController],
        exports: [admin_content_layout_service_1.AdminContentLayoutService],
    })
], AdminContentLayoutModule);
//# sourceMappingURL=admin-content-layout.module.js.map