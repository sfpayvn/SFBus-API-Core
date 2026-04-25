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
exports.PaymentMethodService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const payment_method_schema_1 = require("./schema/payment-method.schema");
const payment_method_dto_1 = require("./dto/payment-method.dto");
const utils_1 = require("../../../utils/utils");
let PaymentMethodService = class PaymentMethodService {
    constructor(paymentMethodModel) {
        this.paymentMethodModel = paymentMethodModel;
    }
    async create(createPaymentMethodDto, tenantId) {
        const existingPaymentMethod = await this.paymentMethodModel.findOne({ tenantId }).lean().exec();
        if (!existingPaymentMethod) {
            createPaymentMethodDto.isPaymentMethodDefault = true;
        }
        const createPayment = new this.paymentMethodModel({ ...createPaymentMethodDto, tenantId });
        const savedPayment = await createPayment.save();
        if (createPaymentMethodDto.isPaymentMethodDefault && existingPaymentMethod) {
            await this.makePaymentMethodSelectDefault(savedPayment._id, tenantId);
        }
        return (0, class_transformer_1.plainToInstance)(payment_method_dto_1.PaymentMethodDto, savedPayment);
    }
    async update(updatePaymentMethodDto, tenantId) {
        const updatedPayment = await this.paymentMethodModel
            .findOneAndUpdate({ _id: updatePaymentMethodDto._id, tenantId }, updatePaymentMethodDto, { new: true })
            .lean()
            .exec();
        if (!updatedPayment) {
            throw new common_1.NotFoundException(`payment with ID "${updatePaymentMethodDto._id}" not found.`);
        }
        if (updatedPayment.isPaymentMethodDefault) {
            await this.makePaymentMethodSelectDefault(updatedPayment._id, tenantId);
        }
        return (0, class_transformer_1.plainToInstance)(payment_method_dto_1.PaymentMethodDto, updatedPayment);
    }
    async remove(id, tenantId) {
        const result = await this.paymentMethodModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        if (!result) {
            throw new common_1.NotFoundException(`payment with ID "${id}" not found.`);
        }
        return result !== null;
    }
    async makePaymentMethodSelectDefault(paymentMethodId, tenantId) {
        const paymentMethod = await this.paymentMethodModel.findOne({ _id: paymentMethodId, tenantId }).lean().exec();
        if (!paymentMethod) {
            throw new common_1.NotFoundException(`Payment method with ID "${paymentMethodId}" not found.`);
        }
        await this.paymentMethodModel.updateMany({ tenantId }, { isDefault: false }).lean().exec();
        const updatedPaymentMethod = await this.paymentMethodModel
            .findOneAndUpdate({ _id: paymentMethodId, tenantId }, { isDefault: true }, { new: true })
            .lean()
            .exec();
        if (!updatedPaymentMethod) {
            throw new common_1.NotFoundException(`Failed to update payment method with ID "${paymentMethodId}".`);
        }
        return (0, class_transformer_1.plainToInstance)(payment_method_dto_1.PaymentMethodDto, updatedPaymentMethod);
    }
    async findAll(tenantIds, filters) {
        const match = { tenantId: { $in: tenantIds } };
        if (Array.isArray(filters) && filters.length > 0) {
            for (const filter of filters) {
                if (filter.key && filter.value !== null && filter.value !== undefined) {
                    match[filter.key] = filter.value;
                }
            }
        }
        const paymentMethodModels = await this.paymentMethodModel.find(match).lean().exec();
        let paymentMethods = paymentMethodModels.map((item) => (0, class_transformer_1.plainToInstance)(payment_method_dto_1.PaymentMethodDto, item));
        paymentMethods = await this.mapImageUrl(paymentMethods);
        return paymentMethods;
    }
    async findOne(id, tenantIds, filters) {
        const match = { tenantId: { $in: tenantIds } };
        if (Array.isArray(filters) && filters.length > 0) {
            for (const filter of filters) {
                if (filter.key && filter.value !== null && filter.value !== undefined) {
                    match[filter.key] = filter.value;
                }
            }
        }
        const paymentMethodModel = await this.paymentMethodModel.findOne(match).lean().exec();
        if (!paymentMethodModel) {
            throw new common_1.NotFoundException(`payment method with ID "${id}" not found.`);
        }
        let paymentMethod = (0, class_transformer_1.plainToInstance)(payment_method_dto_1.PaymentMethodDto, paymentMethodModel);
        const mappedMethods = await this.mapImageUrl([paymentMethod]);
        paymentMethod = mappedMethods[0];
        return paymentMethod;
    }
    async findDefault(tenantIds, filters) {
        const match = { tenantId: { $in: tenantIds }, isPaymentMethodDefault: true };
        if (Array.isArray(filters) && filters.length > 0) {
            for (const filter of filters) {
                if (filter.key && filter.value !== null && filter.value !== undefined) {
                    match[filter.key] = filter.value;
                }
            }
        }
        const paymentMethodModel = await this.paymentMethodModel.findOne(match).lean().exec();
        if (!paymentMethodModel) {
            throw new common_1.NotFoundException(`payment method default not found.`);
        }
        let paymentMethod = (0, class_transformer_1.plainToInstance)(payment_method_dto_1.PaymentMethodDto, paymentMethodModel);
        const mappedMethods = await this.mapImageUrl([paymentMethod]);
        paymentMethod = mappedMethods[0];
        if (!paymentMethod) {
            return null;
        }
        return paymentMethod;
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const { pipeline, matchForCount } = await this.buildQuerySearchPaymentMethodPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
        const items = await this.paymentMethodModel.aggregate(pipeline).exec();
        const totalItem = await this.paymentMethodModel.countDocuments(matchForCount);
        let paymentMethods = items.map((item) => (0, class_transformer_1.plainToInstance)(payment_method_dto_1.PaymentMethodDto, item));
        paymentMethods = await this.mapImageUrl(paymentMethods);
        return {
            pageIdx,
            paymentMethods,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchPaymentMethodPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const match = { tenantId: { $in: tenantIds } };
        const ands = [];
        if (keyword) {
            ands.push({
                $or: [{ name: { $regex: keyword, $options: 'i' } }],
            });
        }
        let startDateValue = null;
        let endDateValue = null;
        if (Array.isArray(filters)) {
            for (const { key, value } of filters) {
                if (!key || value == null)
                    continue;
                if (key === 'startDate') {
                    const dateValue = (0, utils_1.getFirstValue)(value);
                    startDateValue = new Date(dateValue);
                }
                else if (key === 'endDate') {
                    const dateValue = (0, utils_1.getFirstValue)(value);
                    endDateValue = new Date(dateValue);
                }
                else {
                    ands.push((0, utils_1.processFilterValue)(key, value));
                }
            }
        }
        if (startDateValue || endDateValue) {
            const range = {};
            if (startDateValue)
                range.$gte = startDateValue;
            if (endDateValue)
                range.$lte = endDateValue;
            ands.push({ createdAt: range });
        }
        if (ands.length)
            match.$and = ands;
        const pipeline = [{ $match: match }];
        if (sortBy?.key) {
            pipeline.push({ $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 } });
        }
        pipeline.push({ $skip: skip }, { $limit: pageSize });
        return { pipeline, matchForCount: match };
    }
    async mapImageUrl(paymentMethods) {
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        return await Promise.all(paymentMethods.map(async (paymentMethod) => {
            if (paymentMethod.imageId) {
                paymentMethod.image = `${process.env.DOMAIN}${port}/file/view/${paymentMethod.imageId.toString()}`;
            }
            return paymentMethod;
        }));
    }
};
exports.PaymentMethodService = PaymentMethodService;
exports.PaymentMethodService = PaymentMethodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_method_schema_1.PaymentMethodDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PaymentMethodService);
//# sourceMappingURL=payment-method-service.js.map