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
exports.SeatTypeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const seat_type_dto_1 = require("./dto/seat-type.dto");
const seat_type_schema_1 = require("./schema/seat-type.schema");
const class_transformer_1 = require("class-transformer");
let SeatTypeService = class SeatTypeService {
    constructor(seatTypeModel) {
        this.seatTypeModel = seatTypeModel;
    }
    async create(createSeatTypeDto, tenantId) {
        const createSeatType = new this.seatTypeModel({ ...createSeatTypeDto, tenantId });
        const savedSeatType = await createSeatType.save();
        return (0, class_transformer_1.plainToInstance)(seat_type_dto_1.SeatTypeDto, savedSeatType);
    }
    async update(updateSeatTypeDto, tenantId) {
        const seatTypeModel = await this.seatTypeModel
            .findOneAndUpdate({ _id: updateSeatTypeDto._id, tenantId }, updateSeatTypeDto, { new: true })
            .lean()
            .exec();
        if (!seatTypeModel) {
            throw new common_1.NotFoundException(`Bus service with ID "${updateSeatTypeDto._id}" not found.`);
        }
        let seatType = (0, class_transformer_1.plainToInstance)(seat_type_dto_1.SeatTypeDto, seatTypeModel);
        seatType = this.mapSeatTypeIconUrl([seatType])[0];
        return seatType;
    }
    async delete(id, tenantId) {
        const result = await this.seatTypeModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async findAll(tenantIds) {
        const seatTypeModels = await this.seatTypeModel
            .find({ tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        let seatTypes = seatTypeModels.map((seatType) => (0, class_transformer_1.plainToInstance)(seat_type_dto_1.SeatTypeDto, seatType));
        seatTypes = this.mapSeatTypeIconUrl(seatTypes);
        return seatTypes;
    }
    async findOne(id, tenantIds) {
        const seatTypeModel = await this.seatTypeModel
            .findOne({ _id: id, tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        if (!seatTypeModel) {
            throw new common_1.NotFoundException(`Seat type with ID "${id}" not found.`);
        }
        let seatType = (0, class_transformer_1.plainToInstance)(seat_type_dto_1.SeatTypeDto, seatTypeModel);
        seatType = this.mapSeatTypeIconUrl([seatType])[0];
        return seatType;
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const pipeline = await this.buildQuerySearchBusTypes(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
        const seatTypes = await this.seatTypeModel.aggregate(pipeline).exec();
        const totalItem = await this.seatTypeModel.countDocuments({ tenantId: { $in: tenantIds } });
        let result = (0, class_transformer_1.plainToInstance)(seat_type_dto_1.SeatTypeDto, seatTypes.map((seatType) => seatType));
        result = this.mapSeatTypeIconUrl(seatTypes);
        return {
            pageIdx,
            seatTypes: result,
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
    mapSeatTypeIconUrl(seatTypes) {
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        return seatTypes.map((seatType) => {
            if (seatType.iconId) {
                seatType.icon = `${process.env.DOMAIN}${port}/file/view/${seatType.iconId.toString()}`;
            }
            return seatType;
        });
    }
};
exports.SeatTypeService = SeatTypeService;
exports.SeatTypeService = SeatTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(seat_type_schema_1.SeatTypeDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SeatTypeService);
//# sourceMappingURL=seat-type.service.js.map