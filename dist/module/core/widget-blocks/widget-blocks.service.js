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
exports.WidgetBlocksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const widget_block_schema_1 = require("./schemas/widget-block.schema");
const widget_block_dto_1 = require("./dto/widget-block.dto");
let WidgetBlocksService = class WidgetBlocksService {
    constructor(widgetBlockModel) {
        this.widgetBlockModel = widgetBlockModel;
    }
    async create(createWidgetBlockDto, tenantId) {
        try {
            const created = new this.widgetBlockModel({
                ...createWidgetBlockDto,
                tenantId,
                isActive: true,
            });
            const saved = await created.save();
            const widgetBlock = await this.mapImageUrl([(0, class_transformer_1.plainToInstance)(widget_block_dto_1.WidgetBlockDto, saved.toObject())]);
            return widgetBlock[0];
        }
        catch (error) {
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                throw new common_1.NotFoundException(`${field} "${createWidgetBlockDto[field]}" already exists.`);
            }
            throw error;
        }
    }
    async update(updateWidgetBlockDto, tenantId) {
        try {
            const id = updateWidgetBlockDto._id;
            const widgetBlock = await this.widgetBlockModel.findOne({ _id: id, tenantId }).lean().exec();
            if (!widgetBlock) {
                throw new common_1.NotFoundException(`Widget block with ID "${id}" not found.`);
            }
            const updated = await this.widgetBlockModel
                .findOneAndUpdate({ _id: id, tenantId }, updateWidgetBlockDto, { new: true })
                .lean()
                .exec();
            const result = await this.mapImageUrl([(0, class_transformer_1.plainToInstance)(widget_block_dto_1.WidgetBlockDto, updated)]);
            return result[0];
        }
        catch (error) {
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                throw new common_1.NotFoundException(`${field} already exists.`);
            }
            throw error;
        }
    }
    async delete(id, tenantId) {
        const res = await this.widgetBlockModel
            .findOneAndUpdate({ _id: id, tenantId }, { isActive: false }, { new: true })
            .lean()
            .exec();
        return res !== null;
    }
    async findAll(tenantIds) {
        const widgetBlocks = await this.widgetBlockModel
            .find({ tenantId: { $in: tenantIds }, isActive: true })
            .sort({ updatedAt: -1 })
            .lean()
            .exec();
        let result = (0, class_transformer_1.plainToInstance)(widget_block_dto_1.WidgetBlockDto, widgetBlocks);
        result = await this.mapImageUrl(result);
        return result;
    }
    async findOne(id, tenantId) {
        const widgetBlock = await this.widgetBlockModel.findOne({ _id: id, tenantId, isActive: true }).lean().exec();
        if (!widgetBlock) {
            return null;
        }
        return (0, class_transformer_1.plainToInstance)(widget_block_dto_1.WidgetBlockDto, widgetBlock);
    }
    async findByCode(code, tenantId) {
        const widgetBlock = await this.widgetBlockModel.findOne({ code, tenantId, isActive: true }).lean().exec();
        if (!widgetBlock) {
            throw new common_1.NotFoundException(`Widget block with code "${code}" not found.`);
        }
        const mapped = await this.mapImageUrl([(0, class_transformer_1.plainToInstance)(widget_block_dto_1.WidgetBlockDto, widgetBlock)]);
        return mapped[0];
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const pipeline = await this.buildQuerySearchWidgetBlocks(pageIdx, pageSize, tenantIds, keyword, sortBy, filters);
        const widgetBlocks = await this.widgetBlockModel.aggregate(pipeline).exec();
        const totalItem = await this.widgetBlockModel.countDocuments({
            tenantId: { $in: tenantIds },
            isActive: true,
        });
        let result = (0, class_transformer_1.plainToInstance)(widget_block_dto_1.WidgetBlockDto, widgetBlocks);
        result = await this.mapImageUrl(result);
        return {
            pageIdx,
            widgetBlocks: result,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchWidgetBlocks(pageIdx, pageSize, tenantIds, keyword, sortBy, filters) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [];
        const matchConditions = [];
        matchConditions.push({ tenantId: { $in: tenantIds } });
        matchConditions.push({ isActive: true });
        if (keyword) {
            matchConditions.push({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { code: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                ],
            });
        }
        let startDateValue = '';
        let endDateValue = '';
        if (Array.isArray(filters)) {
            filters.forEach(({ key, value }) => {
                if (!key || value == null)
                    return;
                if (key === 'startDate') {
                    startDateValue = value;
                }
                else if (key === 'endDate') {
                    endDateValue = value;
                }
                else {
                    matchConditions.push({ [key]: value });
                }
            });
        }
        if (startDateValue || endDateValue) {
            const rangeCond = {};
            if (startDateValue)
                rangeCond.$gte = startDateValue;
            if (endDateValue)
                rangeCond.$lte = endDateValue;
            matchConditions.push({ createdAt: rangeCond });
        }
        if (matchConditions.length) {
            pipeline.push({
                $match: { $and: matchConditions },
            });
        }
        if (sortBy?.key) {
            pipeline.push({
                $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
            });
        }
        else {
            pipeline.push({
                $sort: { updatedAt: -1 },
            });
        }
        pipeline.push({ $skip: skip }, { $limit: pageSize });
        return pipeline;
    }
    async validateWidgetBlock(code, tenantId) {
        const widgetBlock = await this.widgetBlockModel.findOne({ code, tenantId, isActive: true }).lean().exec();
        if (!widgetBlock) {
            return null;
        }
        return (0, class_transformer_1.plainToInstance)(widget_block_dto_1.WidgetBlockDto, widgetBlock);
    }
    async mapImageUrl(widgetBlocks) {
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        return Promise.all(widgetBlocks.map(async (block) => {
            if (block.imageId) {
                block.imageUrl = `${process.env.DOMAIN}${port}/file/view/${block.imageId.toString()}`;
            }
            return block;
        }));
    }
};
exports.WidgetBlocksService = WidgetBlocksService;
exports.WidgetBlocksService = WidgetBlocksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(widget_block_schema_1.WidgetBlockDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WidgetBlocksService);
//# sourceMappingURL=widget-blocks.service.js.map