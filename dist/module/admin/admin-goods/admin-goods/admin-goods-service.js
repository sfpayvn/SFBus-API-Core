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
exports.AdminGoodsService = void 0;
const goods_schema_1 = require("../../../core/goods/goods/schema/goods.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nanoid_1 = require("nanoid");
const goods_service_1 = require("../../../core/goods/goods/goods-service");
let AdminGoodsService = class AdminGoodsService {
    constructor(goodsModel, goodsService) {
        this.goodsModel = goodsModel;
        this.goodsService = goodsService;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
    }
    async create(adminCreateGoodsDto, tenantId) {
        return this.goodsService.create(adminCreateGoodsDto, tenantId);
    }
    async findAll(tenantId) {
        return this.goodsService.findAll(tenantId);
    }
    async findOne(id, tenantId) {
        return this.goodsService.findOne(id, tenantId);
    }
    async findAllGoodsForBusSchedule(busScheduleId, tenantId) {
        return this.goodsService.findAllGoodsForBusSchedule(busScheduleId, tenantId);
    }
    async findAllGoodsAvailable(busRouteId, tenantId) {
        return this.goodsService.findAllGoodsAvailable(busRouteId, tenantId);
    }
    async update(adminUpdateGoodsDto, tenantId) {
        return this.goodsService.update(adminUpdateGoodsDto, tenantId);
    }
    async updates(adminUpdateGoodsDto, tenantId) {
        return this.goodsService.updates(adminUpdateGoodsDto, tenantId);
    }
    async remove(id, tenantId) {
        return this.goodsService.remove(id, tenantId);
    }
    async searchGoodsPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        return this.goodsService.searchGoodsPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.AdminGoodsService = AdminGoodsService;
exports.AdminGoodsService = AdminGoodsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(goods_schema_1.GoodsDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => goods_service_1.GoodsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        goods_service_1.GoodsService])
], AdminGoodsService);
//# sourceMappingURL=admin-goods-service.js.map