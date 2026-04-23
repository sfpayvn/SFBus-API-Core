"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetBlocksController = void 0;
const common_1 = require("@nestjs/common");
const widget_blocks_service_1 = require("./widget-blocks.service");
let WidgetBlocksController = class WidgetBlocksController {
    constructor(widgetBlocksService) {
        this.widgetBlocksService = widgetBlocksService;
    }
};
exports.WidgetBlocksController = WidgetBlocksController;
exports.WidgetBlocksController = WidgetBlocksController = __decorate([
    (0, common_1.Controller)('api/widget-blocks'),
    __metadata("design:paramtypes", [widget_blocks_service_1.WidgetBlocksService])
], WidgetBlocksController);
//# sourceMappingURL=widget-blocks.controller.js.map