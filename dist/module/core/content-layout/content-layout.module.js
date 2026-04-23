"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentLayoutModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const content_layout_controller_1 = require("./content-layout.controller");
const content_layout_service_1 = require("./content-layout.service");
const content_layout_schema_1 = require("./schemas/content-layout.schema");
let ContentLayoutModule = class ContentLayoutModule {
};
exports.ContentLayoutModule = ContentLayoutModule;
exports.ContentLayoutModule = ContentLayoutModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: content_layout_schema_1.ContentLayoutDocument.name, schema: content_layout_schema_1.ContentLayoutSchema }])],
        controllers: [content_layout_controller_1.ContentLayoutController],
        providers: [content_layout_service_1.ContentLayoutService],
        exports: [content_layout_service_1.ContentLayoutService],
    })
], ContentLayoutModule);
//# sourceMappingURL=content-layout.module.js.map