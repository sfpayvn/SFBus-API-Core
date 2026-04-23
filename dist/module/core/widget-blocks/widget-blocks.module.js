"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetBlocksModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const widget_blocks_controller_1 = require("./widget-blocks.controller");
const widget_blocks_service_1 = require("./widget-blocks.service");
const widget_block_schema_1 = require("./schemas/widget-block.schema");
let WidgetBlocksModule = class WidgetBlocksModule {
};
exports.WidgetBlocksModule = WidgetBlocksModule;
exports.WidgetBlocksModule = WidgetBlocksModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: widget_block_schema_1.WidgetBlockDocument.name, schema: widget_block_schema_1.WidgetBlockSchema }])],
        controllers: [widget_blocks_controller_1.WidgetBlocksController],
        providers: [widget_blocks_service_1.WidgetBlocksService],
        exports: [widget_blocks_service_1.WidgetBlocksService],
    })
], WidgetBlocksModule);
//# sourceMappingURL=widget-blocks.module.js.map