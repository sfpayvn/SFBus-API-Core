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
exports.GoodsCategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const goods__categoryschema_1 = require("./schema/goods.-categoryschema");
const nanoid_1 = require("nanoid");
const class_transformer_1 = require("class-transformer");
const goods_category_dto_1 = require("./dto/goods-category.dto");
let GoodsCategoryService = class GoodsCategoryService {
    constructor(goodsCategoryModel) {
        this.goodsCategoryModel = goodsCategoryModel;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
    }
    async create(createGoodsCategoryDto, tenantId) {
        const goodsCategory = await this.goodsCategoryModel.create({ ...createGoodsCategoryDto, tenantId });
        return (0, class_transformer_1.plainToInstance)(goods_category_dto_1.GoodsCategoryDto, goodsCategory) || null;
    }
    async update(updateGoodsCategoryDto, tenantId) {
        const goodsCategory = await this.goodsCategoryModel.findOneAndUpdate({ _id: updateGoodsCategoryDto._id, tenantId }, updateGoodsCategoryDto, { new: true });
        if (!goodsCategory) {
            throw new common_1.NotFoundException('goods not found.');
        }
        const dto = (0, class_transformer_1.plainToInstance)(goods_category_dto_1.GoodsCategoryDto, goodsCategory);
        const [mapped] = await this.mapImageUrl([dto]);
        return mapped || null;
    }
    async remove(id, tenantId) {
        const goodsCategory = await this.goodsCategoryModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        if (!goodsCategory) {
            throw new common_1.NotFoundException('goods not found.');
        }
        return goodsCategory !== null;
    }
    async findByIds(ids, tenantIds) {
        const goodsCategories = await this.goodsCategoryModel
            .find({ _id: { $in: ids }, tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        const dtos = (0, class_transformer_1.plainToInstance)(goods_category_dto_1.GoodsCategoryDto, goodsCategories || []);
        return await this.mapImageUrl(dtos);
    }
    async findAll(tenantId) {
        const goodsCategories = await this.goodsCategoryModel.find({ tenantId }).lean().exec();
        const dtos = (0, class_transformer_1.plainToInstance)(goods_category_dto_1.GoodsCategoryDto, goodsCategories || []);
        return await this.mapImageUrl(dtos);
    }
    async findOne(id, tenantId) {
        const goodsCategory = await this.goodsCategoryModel.findOne({ _id: id, tenantId }).lean().exec();
        if (!goodsCategory) {
            throw new common_1.NotFoundException('goods not found.');
        }
        const dto = (0, class_transformer_1.plainToInstance)(goods_category_dto_1.GoodsCategoryDto, goodsCategory);
        const [mapped] = await this.mapImageUrl([dto]);
        return mapped || null;
    }
    async searchGoodsCategoryPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        {
            const pipeline = await this.buildQuerySearchGoodsCategoryPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
            const goodsCategories = await this.goodsCategoryModel.aggregate(pipeline).exec();
            const totalItem = await this.goodsCategoryModel.countDocuments({ tenantId });
            const dtos = (0, class_transformer_1.plainToInstance)(goods_category_dto_1.GoodsCategoryDto, goodsCategories || []);
            const mapped = await this.mapImageUrl(dtos);
            return {
                pageIdx,
                goodsCategories: mapped,
                totalPage: Math.ceil(totalItem / pageSize),
                totalItem,
            };
        }
    }
    async buildQuerySearchGoodsCategoryPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [];
        const matchConditions = [{ tenantId }];
        if (keyword) {
            matchConditions.push({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { goodsNumber: { $regex: keyword, $options: 'i' } },
                    { customerName: { $regex: keyword, $options: 'i' } },
                    { customerPhoneNumber: { $regex: keyword, $options: 'i' } },
                    { customerAddress: { $regex: keyword, $options: 'i' } },
                    { senderName: { $regex: keyword, $options: 'i' } },
                    { senderPhoneNumber: { $regex: keyword, $options: 'i' } },
                ],
            });
        }
        let startDateValue = null;
        let endDateValue = null;
        if (Array.isArray(filters)) {
            await Promise.all(filters.map(async ({ key, value }) => {
                if (!key || value == null)
                    return;
                if (key === 'startDate') {
                    startDateValue = new Date(value);
                }
                else if (key === 'endDate') {
                    endDateValue = new Date(value);
                }
                else if (key === 'phoneNumber') {
                    matchConditions.push({ customerPhoneNumber: { $regex: value, $options: 'i' } });
                }
                else {
                    matchConditions.push({ [key]: value });
                }
            }));
        }
        if (startDateValue || endDateValue) {
            const rangeCond = {};
            if (startDateValue)
                rangeCond.$gte = startDateValue;
            if (endDateValue)
                rangeCond.$lte = endDateValue;
            matchConditions.push({ createdAt: rangeCond });
        }
        pipeline.push({
            $match: { $and: matchConditions },
        });
        if (sortBy?.key) {
            pipeline.push({
                $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
            });
        }
        pipeline.push({ $skip: skip }, { $limit: pageSize });
        return pipeline;
    }
    generateGoodsNumber() {
        return this.nanoid();
    }
    async mapImageUrl(goodsCategories) {
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        return await Promise.all(goodsCategories.map(async (goodsCategory) => {
            if (goodsCategory.iconId) {
                goodsCategory.icon = `${process.env.DOMAIN}${port}/file/view/${goodsCategory.iconId.toString()}`;
            }
            return goodsCategory;
        }));
    }
};
exports.GoodsCategoryService = GoodsCategoryService;
exports.GoodsCategoryService = GoodsCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(goods__categoryschema_1.GoodsCategoryDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GoodsCategoryService);
//# sourceMappingURL=goods-category-service.js.map