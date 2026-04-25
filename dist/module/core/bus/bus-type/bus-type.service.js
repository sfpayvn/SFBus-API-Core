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
exports.BusTypeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_type_dto_1 = require("./dto/bus-type.dto");
const bus_type_schema_1 = require("./schema/bus-type.schema");
const class_transformer_1 = require("class-transformer");
let BusTypeService = class BusTypeService {
    constructor(busTypeModel) {
        this.busTypeModel = busTypeModel;
    }
    async create(createBusTypeDto, tenantId) {
        const createBusType = new this.busTypeModel({ ...createBusTypeDto, tenantId });
        const savedBusType = await createBusType.save();
        return (0, class_transformer_1.plainToInstance)(bus_type_dto_1.BusTypeDto, savedBusType.toObject());
    }
    async update(updateBusTypeDto, tenantId) {
        const updatedBusType = await this.busTypeModel
            .findOneAndUpdate({ _id: updateBusTypeDto._id, tenantId }, updateBusTypeDto, { new: true })
            .lean()
            .exec();
        if (!updatedBusType) {
            throw new common_1.NotFoundException(`Bus type with ID "${updateBusTypeDto._id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(bus_type_dto_1.BusTypeDto, updatedBusType);
    }
    async delete(id, tenantId) {
        const result = await this.busTypeModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async findAll(tenantIds) {
        const busTypes = await this.busTypeModel
            .find({ tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        return busTypes.map((busType) => (0, class_transformer_1.plainToInstance)(bus_type_dto_1.BusTypeDto, busType));
    }
    async findOne(id, tenantIds) {
        const busType = await this.busTypeModel
            .findOne({ _id: id, tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        if (!busType) {
            throw new common_1.NotFoundException(`Bus type with ID "${id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(bus_type_dto_1.BusTypeDto, busType);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const pipeline = await this.buildQuerySearchBusTypes(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
        const busTypes = await this.busTypeModel.aggregate(pipeline).exec();
        const totalItem = await this.busTypeModel.countDocuments({ tenantId: { $in: tenantIds } });
        const result = (0, class_transformer_1.plainToInstance)(bus_type_dto_1.BusTypeDto, busTypes.map((busType) => busType));
        return {
            pageIdx,
            busTypes: result,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchBusTypes(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [];
        const matchConditions = [{ tenantId: { $in: tenantIds } }];
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
            matchConditions.push({ startDate: rangeCond });
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
exports.BusTypeService = BusTypeService;
exports.BusTypeService = BusTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_type_schema_1.BusTypeDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BusTypeService);
//# sourceMappingURL=bus-type.service.js.map