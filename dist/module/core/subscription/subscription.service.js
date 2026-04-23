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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const subscription_dto_1 = require("./dto/subscription.dto");
const subscription_schema_1 = require("./schema/subscription.schema");
let SubscriptionService = class SubscriptionService {
    constructor(subscriptionModel) {
        this.subscriptionModel = subscriptionModel;
    }
    async create(dto) {
        const created = new this.subscriptionModel({ ...dto });
        const saved = await created.save();
        return (0, class_transformer_1.plainToInstance)(subscription_dto_1.SubscriptionDto, saved.toObject());
    }
    async findAll() {
        const docs = await this.subscriptionModel.find().lean().exec();
        return docs.map((d) => (0, class_transformer_1.plainToInstance)(subscription_dto_1.SubscriptionDto, d));
    }
    async findAllAvailable() {
        const docs = await this.subscriptionModel.find({ status: 'active' }).lean().exec();
        return docs.map((d) => (0, class_transformer_1.plainToInstance)(subscription_dto_1.SubscriptionDto, d));
    }
    async findOne(id) {
        const doc = await this.subscriptionModel.findOne({ _id: id }).lean().exec();
        if (!doc) {
            throw new common_1.NotFoundException(`Subscription with ID "${id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(subscription_dto_1.SubscriptionDto, doc);
    }
    async findPopular() {
        const doc = await this.subscriptionModel.findOne({ popular: true, status: 'active' }).lean().exec();
        if (!doc) {
            throw new common_1.NotFoundException(`Popular subscription not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(subscription_dto_1.SubscriptionDto, doc);
    }
    async update(dto) {
        if (dto.popular === true) {
            await this.subscriptionModel.updateMany({ _id: { $ne: dto._id } }, { popular: false }).exec();
        }
        const updated = await this.subscriptionModel.findOneAndUpdate({ _id: dto._id }, dto, { new: true }).lean().exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Subscription with ID "${dto._id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(subscription_dto_1.SubscriptionDto, updated);
    }
    async delete(id) {
        const res = await this.subscriptionModel.findOneAndDelete({ _id: id }).lean().exec();
        return res !== null;
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters) {
        const pipeline = await this.buildQuerySearchSubscriptions(pageIdx, pageSize, keyword, sortBy, filters);
        const subscriptions = await this.subscriptionModel.aggregate(pipeline).exec();
        const totalItem = await this.subscriptionModel.countDocuments();
        const result = (0, class_transformer_1.plainToInstance)(subscription_dto_1.SubscriptionDto, subscriptions.map((tenantSubscription) => tenantSubscription));
        return {
            pageIdx,
            subscriptions: result,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchSubscriptions(pageIdx, pageSize, keyword, sortBy, filters) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [];
        const matchConditions = [];
        if (keyword) {
            matchConditions.push({
                $or: [{ name: { $regex: keyword, $options: 'i' } }],
            });
        }
        let startDateValue = '';
        let endDateValue = '';
        if (Array.isArray(filters)) {
            await Promise.all(filters.map(async ({ key, value }) => {
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
            }));
        }
        if (startDateValue || endDateValue) {
            const rangeCond = {};
            if (startDateValue)
                rangeCond.$gte = startDateValue;
            if (endDateValue)
                rangeCond.$lte = endDateValue;
            matchConditions.push({ createDate: rangeCond });
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
        pipeline.push({ $skip: skip }, { $limit: pageSize });
        return pipeline;
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subscription_schema_1.SubscriptionDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map