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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminWidgetBlocksService = void 0;
const common_1 = require("@nestjs/common");
const widget_blocks_service_1 = require("../../core/widget-blocks/widget-blocks.service");
let AdminWidgetBlocksService = class AdminWidgetBlocksService {
    constructor(widgetBlocksService) {
        this.widgetBlocksService = widgetBlocksService;
    }
    async create(createWidgetBlockDto, tenantId) {
        return this.widgetBlocksService.create(createWidgetBlockDto, tenantId);
    }
    async update(updateWidgetBlockDto, tenantId) {
        return this.widgetBlocksService.update(updateWidgetBlockDto, tenantId);
    }
    async remove(id, tenantId) {
        return this.widgetBlocksService.delete(id, tenantId);
    }
    async findAll(tenantIds) {
        return this.widgetBlocksService.findAll(tenantIds);
    }
    async findOne(id, tenantId) {
        return this.widgetBlocksService.findOne(id, tenantId);
    }
    search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        return this.widgetBlocksService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.AdminWidgetBlocksService = AdminWidgetBlocksService;
exports.AdminWidgetBlocksService = AdminWidgetBlocksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => widget_blocks_service_1.WidgetBlocksService))),
    __metadata("design:paramtypes", [widget_blocks_service_1.WidgetBlocksService])
], AdminWidgetBlocksService);
//# sourceMappingURL=admin-widget-blocks.service.js.map