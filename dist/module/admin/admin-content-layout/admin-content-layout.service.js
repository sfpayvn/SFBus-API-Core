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
exports.AdminContentLayoutService = void 0;
const common_1 = require("@nestjs/common");
const content_layout_service_1 = require("../../core/content-layout/content-layout.service");
let AdminContentLayoutService = class AdminContentLayoutService {
    constructor(contentLayoutService) {
        this.contentLayoutService = contentLayoutService;
    }
    async create(createContentLayoutDto, tenantId) {
        return this.contentLayoutService.create(createContentLayoutDto, tenantId);
    }
    async update(updateContentLayoutDto, tenantId) {
        return this.contentLayoutService.update(updateContentLayoutDto, tenantId);
    }
    async remove(id, tenantId) {
        return this.contentLayoutService.delete(id, tenantId);
    }
    async findAll(tenantIds) {
        return this.contentLayoutService.findAll(tenantIds);
    }
    async findOne(id, tenantId) {
        return this.contentLayoutService.findOne(id, tenantId);
    }
    search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        return this.contentLayoutService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
    }
};
exports.AdminContentLayoutService = AdminContentLayoutService;
exports.AdminContentLayoutService = AdminContentLayoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => content_layout_service_1.ContentLayoutService))),
    __metadata("design:paramtypes", [content_layout_service_1.ContentLayoutService])
], AdminContentLayoutService);
//# sourceMappingURL=admin-content-layout.service.js.map