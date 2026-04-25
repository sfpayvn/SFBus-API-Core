"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminWidgetBlocksModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_widget_blocks_service_1 = require("./admin-widget-blocks.service");
const admin_widget_blocks_controller_1 = require("./admin-widget-blocks.controller");
const widget_block_schema_1 = require("../../core/widget-blocks/schemas/widget-block.schema");
const widget_blocks_module_1 = require("../../core/widget-blocks/widget-blocks.module");
let AdminWidgetBlocksModule = class AdminWidgetBlocksModule {
};
exports.AdminWidgetBlocksModule = AdminWidgetBlocksModule;
exports.AdminWidgetBlocksModule = AdminWidgetBlocksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: widget_block_schema_1.WidgetBlockDocument.name, schema: widget_block_schema_1.WidgetBlockSchema }]),
            (0, common_1.forwardRef)(() => widget_blocks_module_1.WidgetBlocksModule),
        ],
        providers: [admin_widget_blocks_service_1.AdminWidgetBlocksService],
        controllers: [admin_widget_blocks_controller_1.AdminWidgetBlocksController],
        exports: [admin_widget_blocks_service_1.AdminWidgetBlocksService],
    })
], AdminWidgetBlocksModule);
//# sourceMappingURL=admin-widget-blocks.module.js.map