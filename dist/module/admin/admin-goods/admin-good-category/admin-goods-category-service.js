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
exports.AdminGoodsCategoryService = void 0;
const goods_category_service_1 = require("../../../core/goods/good-category/goods-category-service");
const goods__categoryschema_1 = require("../../../core/goods/good-category/schema/goods.-categoryschema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nanoid_1 = require("nanoid");
let AdminGoodsCategoryService = class AdminGoodsCategoryService {
    constructor(goodsCategoryModel, goodsCategoryService) {
        this.goodsCategoryModel = goodsCategoryModel;
        this.goodsCategoryService = goodsCategoryService;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
    }
    async create(adminCreateGoodsCategoryDto, tenantId) {
        return this.goodsCategoryService.create(adminCreateGoodsCategoryDto, tenantId);
    }
    async update(adminUpdateGoodsCategoryDto, tenantId) {
        return this.goodsCategoryService.update(adminUpdateGoodsCategoryDto, tenantId);
    }
    async remove(id, tenantId) {
        return this.goodsCategoryService.remove(id, tenantId);
    }
    async findByIds(ids, tenantId, rootTenantId) {
        return this.goodsCategoryService.findByIds(ids, [tenantId, rootTenantId]);
    }
    async findAll(tenantId) {
        return this.goodsCategoryService.findAll(tenantId);
    }
    async findOne(id, tenantId) {
        return this.goodsCategoryService.findOne(id, tenantId);
    }
    async searchGoodsCategoryPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        return this.goodsCategoryService.searchGoodsCategoryPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.AdminGoodsCategoryService = AdminGoodsCategoryService;
exports.AdminGoodsCategoryService = AdminGoodsCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(goods__categoryschema_1.GoodsCategoryDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => goods_category_service_1.GoodsCategoryService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        goods_category_service_1.GoodsCategoryService])
], AdminGoodsCategoryService);
//# sourceMappingURL=admin-goods-category-service.js.map