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
exports.TrackingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tracking_schema_1 = require("./schema/tracking.schema");
const tracking_dto_1 = require("./dto/tracking.dto");
const class_transformer_1 = require("class-transformer");
let TrackingService = class TrackingService {
    constructor(trackingModel) {
        this.trackingModel = trackingModel;
    }
    async create(createTrackingDto, tenantId) {
        const tracking = await this.trackingModel.create({ ...createTrackingDto, tenantId });
        return (0, class_transformer_1.plainToInstance)(tracking_dto_1.TrackingDto, tracking.toObject());
    }
    async findAll(tenantId) {
        const trackings = await this.trackingModel.find({ tenantId }).lean().exec();
        return trackings.map((tracking) => (0, class_transformer_1.plainToInstance)(tracking_dto_1.TrackingDto, tracking));
    }
    async findOne(id, tenantId) {
        const tracking = await this.trackingModel.findOne({ _id: id, tenantId }).lean().exec();
        if (!tracking) {
            throw new common_1.NotFoundException(`Tracking with ID "${id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(tracking_dto_1.TrackingDto, tracking);
    }
    async findByType(type, tenantId) {
        const trackings = await this.trackingModel.find({ type, tenantId }).lean().exec();
        return trackings.map((tracking) => (0, class_transformer_1.plainToInstance)(tracking_dto_1.TrackingDto, tracking));
    }
    async update(updateTrackingDto, tenantId) {
        const updatedTracking = await this.trackingModel
            .findOneAndUpdate({ _id: updateTrackingDto._id, tenantId }, { $set: updateTrackingDto }, { new: true })
            .lean()
            .exec();
        if (!updatedTracking) {
            throw new common_1.NotFoundException(`Tracking with ID "${updateTrackingDto._id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(tracking_dto_1.TrackingDto, updatedTracking);
    }
    async remove(id, tenantId) {
        const result = await this.trackingModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        if (!result) {
            throw new common_1.NotFoundException(`Tracking with ID "${id}" not found.`);
        }
        return true;
    }
    async searchTracking(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [];
        const matchConditions = [{ tenantId }];
        if (keyword) {
            matchConditions.push({
                $or: [{ type: { $regex: keyword, $options: 'i' } }],
            });
        }
        if (Array.isArray(filters)) {
            filters.forEach(({ key, value }) => {
                if (key && value != null) {
                    if (key === 'type') {
                        matchConditions.push({ type: value });
                    }
                    else if (key.startsWith('metadata.')) {
                        matchConditions.push({ [key]: value });
                    }
                    else {
                        matchConditions.push({ [key]: value });
                    }
                }
            });
        }
        pipeline.push({ $match: { $and: matchConditions } });
        if (sortBy?.key) {
            pipeline.push({
                $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
            });
        }
        else {
            pipeline.push({ $sort: { createdAt: -1 } });
        }
        pipeline.push({ $skip: skip }, { $limit: pageSize });
        const trackings = await this.trackingModel.aggregate(pipeline).exec();
        const totalItem = await this.trackingModel.countDocuments({ $and: matchConditions });
        return {
            pageIdx,
            trackings: trackings.map((t) => (0, class_transformer_1.plainToInstance)(tracking_dto_1.TrackingDto, t)),
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
};
exports.TrackingService = TrackingService;
exports.TrackingService = TrackingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tracking_schema_1.TrackingDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TrackingService);
//# sourceMappingURL=tracking.service.js.map