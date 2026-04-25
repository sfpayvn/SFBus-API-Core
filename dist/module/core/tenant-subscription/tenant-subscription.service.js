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
exports.TenantSubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tenant_subscription_schema_1 = require("./schema/tenant-subscription.schema");
const tenant_subscription_dto_1 = require("./dto/tenant-subscription.dto");
const class_transformer_1 = require("class-transformer");
const status_constants_1 = require("../../../common/constants/status.constants");
const subscription_service_1 = require("../subscription/subscription.service");
const utils_1 = require("../../../utils/utils");
function addMonths(date, months) {
    const d = new Date(date);
    const day = d.getDate();
    d.setMonth(d.getMonth() + months);
    if (d.getDate() < day)
        d.setDate(0);
    return d;
}
function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}
let TenantSubscriptionService = class TenantSubscriptionService {
    constructor(tenantSubModel, subscriptionService, connection) {
        this.tenantSubModel = tenantSubModel;
        this.subscriptionService = subscriptionService;
        this.connection = connection;
    }
    async registerForTenant(tenantId, dto) {
        const subId = new mongoose_2.Types.ObjectId(dto.subscriptionId);
        const session = await this.connection.startSession();
        try {
            return await session.withTransaction(async () => {
                const plan = await this.subscriptionService.findOne(subId);
                if (!plan)
                    throw new common_1.NotFoundException('Subscription plan not found');
                const startAt = dto.startAt ? new Date(dto.startAt) : new Date();
                if (isNaN(+startAt))
                    throw new common_1.BadRequestException('Invalid startAt');
                const durationUnit = dto.durationUnit ?? plan.durationUnit;
                const duration = dto.durationOverride ?? plan.duration ?? 0;
                let endAt;
                switch (durationUnit) {
                    case status_constants_1.DURATION_STATUS.LIFETIME:
                        endAt = new Date('9999-12-31');
                        break;
                    case status_constants_1.DURATION_STATUS.DAY:
                        endAt = addDays(startAt, duration);
                        break;
                    case status_constants_1.DURATION_STATUS.WEEK:
                        endAt = addDays(startAt, duration * 7);
                        break;
                    case status_constants_1.DURATION_STATUS.YEAR:
                        endAt = addMonths(startAt, duration * 12);
                        break;
                    default:
                        endAt = addMonths(startAt, duration);
                }
                const overlapping = await this.tenantSubModel
                    .findOne({
                    tenantId,
                    status: 'active',
                })
                    .session(session);
                if (overlapping) {
                    if (dto.replaceCurrent) {
                        overlapping.status = 'canceled';
                        await overlapping.save({ session });
                    }
                    else {
                        throw new common_1.BadRequestException('Tenant already has an active subscription in this period');
                    }
                }
                const created = await this.tenantSubModel.create([
                    {
                        tenantId,
                        subscriptionId: plan._id,
                        name: plan.name,
                        price: plan.price,
                        duration,
                        durationUnit,
                        limitationSnapshot: plan.limitation,
                        startAt,
                        endAt,
                        status: 'active',
                    },
                ], { session });
                return (0, class_transformer_1.plainToInstance)(tenant_subscription_dto_1.TenantSubscriptionDto, created[0], { excludeExtraneousValues: true });
            });
        }
        finally {
            session.endSession();
        }
    }
    async registerPopularSubscription(tenantId) {
        const popularSubscription = this.subscriptionService.findPopular();
        if (!popularSubscription) {
            throw new common_1.NotFoundException('No popular subscription found to assign to new tenant.');
        }
        const registerSubscriptionDto = {
            subscriptionId: (await popularSubscription)._id,
            startAt: new Date().toISOString(),
            replaceCurrent: true,
        };
        return this.registerForTenant(tenantId, registerSubscriptionDto);
    }
    async getActive(tenantId) {
        const now = new Date();
        return this.tenantSubModel
            .findOne({
            tenantId,
            status: 'active',
            startAt: { $lte: now },
            endAt: { $gt: now },
        })
            .exec();
    }
    async findByTenantId(tenantId) {
        const tenantSubModel = await this.tenantSubModel.findOne({ tenantId }).lean().exec();
        if (!tenantSubModel)
            return null;
        const tenant = (0, class_transformer_1.plainToInstance)(tenant_subscription_dto_1.TenantSubscriptionDto, tenantSubModel);
        return tenant;
    }
    async findAllByTenantId(tenantId) {
        const tenantSubModels = await this.tenantSubModel.find({ tenantId }).lean().exec();
        const tenants = (0, class_transformer_1.plainToInstance)(tenant_subscription_dto_1.TenantSubscriptionDto, tenantSubModels.map((tenant) => tenant));
        return tenants;
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters) {
        const pipeline = await this.buildQuerySearchTenantSubscriptions(pageIdx, pageSize, keyword, sortBy, filters);
        const tenantSubscriptions = await this.tenantSubModel.aggregate(pipeline).exec();
        const tenantId = filters.find((f) => f.key === 'tenantId')?.value;
        const countQuery = tenantId ? { tenantId } : {};
        const totalItem = await this.tenantSubModel.countDocuments(countQuery);
        const result = (0, class_transformer_1.plainToInstance)(tenant_subscription_dto_1.TenantSubscriptionDto, tenantSubscriptions.map((tenantSubscription) => tenantSubscription));
        return {
            pageIdx,
            tenantSubscriptions: result,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchTenantSubscriptions(pageIdx, pageSize, keyword, sortBy, filters) {
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
                    startDateValue = (0, utils_1.getFirstValue)(value);
                }
                else if (key === 'endDate') {
                    endDateValue = (0, utils_1.getFirstValue)(value);
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
exports.TenantSubscriptionService = TenantSubscriptionService;
exports.TenantSubscriptionService = TenantSubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tenant_subscription_schema_1.TenantSubscriptionDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => subscription_service_1.SubscriptionService))),
    __param(2, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        subscription_service_1.SubscriptionService,
        mongoose_2.Connection])
], TenantSubscriptionService);
//# sourceMappingURL=tenant-subscription.service.js.map