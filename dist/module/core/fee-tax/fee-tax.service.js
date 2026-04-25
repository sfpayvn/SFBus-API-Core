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
exports.FeeTaxService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fee_tax_schema_1 = require("./schema/fee-tax.schema");
const fee_tax_dto_1 = require("./dto/fee-tax.dto");
const class_transformer_1 = require("class-transformer");
const utils_1 = require("../../../utils/utils");
let FeeTaxService = class FeeTaxService {
    constructor(feeTaxModel) {
        this.feeTaxModel = feeTaxModel;
    }
    async create(tenantId, createDto, userId) {
        const feeTax = new this.feeTaxModel({
            ...createDto,
            tenantId: new mongoose_2.Types.ObjectId(tenantId),
            createdBy: userId ? new mongoose_2.Types.ObjectId(userId) : undefined,
            updatedBy: userId ? new mongoose_2.Types.ObjectId(userId) : undefined,
        });
        const saved = await feeTax.save();
        return this.toDto(saved);
    }
    async findByTenant(tenantId, enabled) {
        const query = { tenantId: new mongoose_2.Types.ObjectId(tenantId) };
        if (enabled !== undefined) {
            query.enabled = enabled;
        }
        const items = await this.feeTaxModel.find(query).sort({ priority: 1 }).exec();
        return items.map((item) => this.toDto(item));
    }
    async findById(id, tenantId) {
        const item = await this.feeTaxModel.findOne({
            _id: new mongoose_2.Types.ObjectId(id),
            tenantId: new mongoose_2.Types.ObjectId(tenantId),
        });
        if (!item) {
            throw new common_1.NotFoundException(`Fee/Tax with ID ${id} not found`);
        }
        return this.toDto(item);
    }
    async getApplicableFeesTaxes(tenantId, params) {
        const query = {
            tenantId: new mongoose_2.Types.ObjectId(tenantId),
            enabled: true,
        };
        if (params.feeType) {
            query.feeType = params.feeType;
        }
        const now = new Date();
        query.$or = [
            {
                $and: [
                    { startDate: { $exists: false } },
                    { endDate: { $exists: false } },
                ],
            },
            {
                $and: [
                    { startDate: { $lte: now } },
                    { endDate: { $exists: false } },
                ],
            },
            {
                $and: [
                    { startDate: { $exists: false } },
                    { endDate: { $gte: now } },
                ],
            },
            {
                $and: [
                    { startDate: { $lte: now } },
                    { endDate: { $gte: now } },
                ],
            },
        ];
        const items = await this.feeTaxModel.find(query).sort({ priority: 1 }).exec();
        return items.filter((item) => {
            if (!item.conditions)
                return true;
            const { minTotal, maxTotal, minTickets, maxTickets, appliedRoutes, excludedRoutes } = item.conditions;
            if (minTotal && params.total < minTotal)
                return false;
            if (maxTotal && params.total > maxTotal)
                return false;
            if (minTickets && params.ticketCount < minTickets)
                return false;
            if (maxTickets && params.ticketCount > maxTickets)
                return false;
            if (params.routeId) {
                const routeObjectId = new mongoose_2.Types.ObjectId(params.routeId);
                if (excludedRoutes?.some((rid) => rid.equals(routeObjectId)))
                    return false;
                if (appliedRoutes && !appliedRoutes.some((rid) => rid.equals(routeObjectId)))
                    return false;
            }
            return true;
        }).map((item) => this.toDto(item));
    }
    async update(id, tenantId, updateDto, userId) {
        const item = await this.feeTaxModel.findOneAndUpdate({
            _id: new mongoose_2.Types.ObjectId(id),
            tenantId: new mongoose_2.Types.ObjectId(tenantId),
        }, {
            ...updateDto,
            updatedBy: userId ? new mongoose_2.Types.ObjectId(userId) : undefined,
        }, { new: true });
        if (!item) {
            throw new common_1.NotFoundException(`Fee/Tax with ID ${id} not found`);
        }
        return this.toDto(item);
    }
    async delete(id, tenantId) {
        const result = await this.feeTaxModel.deleteOne({
            _id: new mongoose_2.Types.ObjectId(id),
            tenantId: new mongoose_2.Types.ObjectId(tenantId),
        });
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Fee/Tax with ID ${id} not found`);
        }
    }
    async calculateFeesAndTaxes(tenantId, params) {
        const applicableFeesTaxes = await this.getApplicableFeesTaxes(tenantId, {
            total: params.afterDiscountTotal,
            ticketCount: params.ticketCount,
            routeId: params.routeId,
        });
        const fees = [];
        const taxes = [];
        let totalFees = 0;
        let totalTaxes = 0;
        for (const feeTax of applicableFeesTaxes) {
            let amount = 0;
            let base = params.afterDiscountTotal;
            if (feeTax.appliedOn === 'ticket_price' && params.tickets) {
                amount = params.tickets.reduce((sum, ticket) => {
                    const ticketAmount = this.calculateAmount(ticket.price, feeTax.value, feeTax.calculationType);
                    return sum + ticketAmount;
                }, 0);
            }
            else if (feeTax.appliedOn === 'total_booking') {
                base = params.bookingTotal;
                amount = this.calculateAmount(base, feeTax.value, feeTax.calculationType);
            }
            else {
                amount = this.calculateAmount(base, feeTax.value, feeTax.calculationType);
            }
            const record = { name: feeTax.name, amount: Math.floor(amount), feeType: feeTax.feeType };
            if (feeTax.feeType === 'fee') {
                fees.push(record);
                totalFees += record.amount;
            }
            else {
                taxes.push(record);
                totalTaxes += record.amount;
            }
        }
        const finalTotal = params.afterDiscountTotal + totalFees + totalTaxes;
        return {
            fees,
            taxes,
            totalFees,
            totalTaxes,
            finalTotal,
        };
    }
    calculateAmount(base, value, type) {
        if (type === 'fixed') {
            return value;
        }
        else {
            return (base * value) / 100;
        }
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const pipeline = await this.buildQuerySearchFeeTaxPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
        const items = await this.feeTaxModel.aggregate(pipeline).exec();
        const countOnlyPipeline = await this.buildQuerySearchFeeTaxPaging(0, 0, keyword, sortBy, filters, tenantId);
        const countResult = await this.feeTaxModel.aggregate([...countOnlyPipeline, { $count: 'total' }]).exec();
        const totalItem = countResult.length > 0 ? countResult[0].total : 0;
        const feeTaxes = items.map((item) => this.toDto(item));
        return {
            pageIdx,
            feeTaxes,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchFeeTaxPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [];
        const matchConditions = [{ tenantId }];
        if (keyword) {
            matchConditions.push({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                ],
            });
        }
        if (Array.isArray(filters)) {
            for (const { key, value } of filters) {
                if (!key || value == null || (Array.isArray(value) && value.length === 0))
                    continue;
                matchConditions.push((0, utils_1.processFilterValue)(key, value));
            }
        }
        pipeline.push({
            $match: { $and: matchConditions },
        });
        if (sortBy?.key) {
            const sortDirection = sortBy.value === 'ascend' ? 1 : -1;
            pipeline.push({
                $sort: { [sortBy.key]: sortDirection },
            });
        }
        else {
            pipeline.push({
                $sort: { priority: 1 },
            });
        }
        if (pageSize > 0) {
            pipeline.push({ $skip: skip }, { $limit: pageSize });
        }
        return pipeline;
    }
    toDto(doc) {
        return (0, class_transformer_1.plainToInstance)(fee_tax_dto_1.FeeTaxDto, {
            _id: doc._id?.toString(),
            tenantId: doc.tenantId?.toString(),
            feeType: doc.feeType,
            name: doc.name,
            calculationType: doc.calculationType,
            appliedOn: doc.appliedOn,
            value: doc.value,
            priority: doc.priority,
            enabled: doc.enabled,
            description: doc.description,
            conditions: doc.conditions,
            startDate: doc.startDate,
            endDate: doc.endDate,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            createdBy: doc.createdBy?.toString(),
            updatedBy: doc.updatedBy?.toString(),
        });
    }
};
exports.FeeTaxService = FeeTaxService;
exports.FeeTaxService = FeeTaxService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(fee_tax_schema_1.FeeTax.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FeeTaxService);
//# sourceMappingURL=fee-tax.service.js.map