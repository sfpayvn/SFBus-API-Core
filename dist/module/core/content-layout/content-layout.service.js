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
exports.ContentLayoutService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const content_layout_schema_1 = require("./schemas/content-layout.schema");
const class_transformer_1 = require("class-transformer");
const content_layout_dto_1 = require("./dto/content-layout.dto");
let ContentLayoutService = class ContentLayoutService {
    constructor(contentLayoutModel) {
        this.contentLayoutModel = contentLayoutModel;
    }
    async create(createContentLayoutDto, tenantId) {
        try {
            const created = new this.contentLayoutModel({
                ...createContentLayoutDto,
                tenantId,
                isPublish: true,
            });
            const saved = await created.save();
            const contentLayout = await this.mapImageUrl([(0, class_transformer_1.plainToInstance)(content_layout_dto_1.ContentLayoutDto, saved.toObject())]);
            return contentLayout[0];
        }
        catch (error) {
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                throw new common_1.NotFoundException(`${field} "${createContentLayoutDto[field]}" already exists.`);
            }
            throw error;
        }
    }
    async update(updateContentLayoutDto, tenantId) {
        try {
            const id = updateContentLayoutDto._id;
            const contentLayout = await this.contentLayoutModel.findOne({ _id: id, tenantId }).lean().exec();
            if (!contentLayout) {
                throw new common_1.NotFoundException(`Widget block with ID "${id}" not found.`);
            }
            await this.handleImageUpdates(contentLayout.imageId, updateContentLayoutDto.imageId, updateContentLayoutDto.slug, tenantId);
            const updated = await this.contentLayoutModel
                .findOneAndUpdate({ _id: id, tenantId }, updateContentLayoutDto, { new: true })
                .lean()
                .exec();
            const result = await this.mapImageUrl([(0, class_transformer_1.plainToInstance)(content_layout_dto_1.ContentLayoutDto, updated)]);
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
        const res = await this.contentLayoutModel
            .findOneAndUpdate({ _id: id, tenantId }, { isPublish: false }, { new: true })
            .lean()
            .exec();
        return res !== null;
    }
    async findAll(tenantIds) {
        const contentLayouts = await this.contentLayoutModel
            .find({ tenantId: { $in: tenantIds }, isPublish: true })
            .sort({ updatedAt: -1 })
            .lean()
            .exec();
        let result = (0, class_transformer_1.plainToInstance)(content_layout_dto_1.ContentLayoutDto, contentLayouts);
        result = await this.mapImageUrl(result);
        return result;
    }
    async findOne(id, tenantId) {
        const contentLayout = await this.contentLayoutModel.findOne({ _id: id, tenantId, isPublish: true }).lean().exec();
        if (!contentLayout) {
            return null;
        }
        return (0, class_transformer_1.plainToInstance)(content_layout_dto_1.ContentLayoutDto, contentLayout);
    }
    async findByCode(code, tenantId) {
        const contentLayout = await this.contentLayoutModel.findOne({ code, tenantId, isPublish: true }).lean().exec();
        if (!contentLayout) {
            throw new common_1.NotFoundException(`Widget block with code "${code}" not found.`);
        }
        const mapped = await this.mapImageUrl([(0, class_transformer_1.plainToInstance)(content_layout_dto_1.ContentLayoutDto, contentLayout)]);
        return mapped[0];
    }
    findAvailableSlug(appSource, platform, tenantId) {
        return this.contentLayoutModel
            .find({ tenantId, appSource, platform, isPublish: true, slug: { $regex: '^/pages' } })
            .distinct('slug')
            .lean()
            .exec();
    }
    async findAvailableBySlug(appSource, platform, slug, tenantId) {
        const contentLayout = this.contentLayoutModel
            .findOne({ tenantId, appSource, platform, isPublish: true, slug })
            .lean()
            .exec();
        const mapped = await this.mapImageUrl([(0, class_transformer_1.plainToInstance)(content_layout_dto_1.ContentLayoutDto, contentLayout)]);
        return mapped[0];
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const pipeline = await this.buildQuerySearchContentLayouts(pageIdx, pageSize, tenantIds, keyword, sortBy, filters);
        const contentLayouts = await this.contentLayoutModel.aggregate(pipeline).exec();
        const totalItem = await this.contentLayoutModel.countDocuments({
            tenantId: { $in: tenantIds },
            isPublish: true,
        });
        let result = (0, class_transformer_1.plainToInstance)(content_layout_dto_1.ContentLayoutDto, contentLayouts);
        result = await this.mapImageUrl(result);
        return {
            pageIdx,
            contentLayouts: result,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchContentLayouts(pageIdx, pageSize, tenantIds, keyword, sortBy, filters) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [];
        const matchConditions = [];
        matchConditions.push({ tenantId: { $in: tenantIds } });
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
    async validateContentLayout(code, tenantId) {
        const contentLayout = await this.contentLayoutModel.findOne({ code, tenantId, isPublish: true }).lean().exec();
        if (!contentLayout) {
            return null;
        }
        return (0, class_transformer_1.plainToInstance)(content_layout_dto_1.ContentLayoutDto, contentLayout);
    }
    async mapImageUrl(contentLayouts) {
        return Promise.all(contentLayouts.map(async (block) => {
            if (block.imageId) {
                const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
                block.imageUrl = `${process.env.DOMAIN}${port}/file/view/${block.imageId.toString()}`;
            }
            return block;
        }));
    }
    async handleImageUpdates(oldImageId, newImageId, slug, tenantId) {
        if (oldImageId && oldImageId !== newImageId) {
            await this.deleteImage(oldImageId, tenantId);
        }
        if (newImageId && oldImageId !== newImageId) {
        }
    }
    async deleteImage(imageId, tenantId) {
        try {
            console.log(`Deleting image ${imageId} for tenant ${tenantId}`);
        }
        catch (error) {
            console.error(`Failed to delete image ${imageId}:`, error);
        }
    }
};
exports.ContentLayoutService = ContentLayoutService;
exports.ContentLayoutService = ContentLayoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(content_layout_schema_1.ContentLayoutDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ContentLayoutService);
//# sourceMappingURL=content-layout.service.js.map