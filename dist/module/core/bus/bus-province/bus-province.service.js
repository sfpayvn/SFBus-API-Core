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
exports.BusProvinceService = void 0;
const common_1 = require("@nestjs/common");
const create_bus_province_dto_1 = require("./dto/create-bus-province.dto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_decorator_1 = require("../../../../common/decorators/transaction.decorator");
const bus_province_dto_1 = require("./dto/bus-province.dto");
const bus_schema_schema_1 = require("./schema/bus-schema.schema");
const class_transformer_1 = require("class-transformer");
const bus_station_service_1 = require("../bus-station/bus-station.service");
const bus_station_dto_1 = require("../bus-station/dto/bus-station.dto");
let BusProvinceService = class BusProvinceService {
    constructor(busProvinceModel, busStationService) {
        this.busProvinceModel = busProvinceModel;
        this.busStationService = busStationService;
    }
    async create(createBusProvinceDto, tenantId, session) {
        const createBusProvince = new this.busProvinceModel({ ...createBusProvinceDto, tenantId });
        const savedBusProvince = await createBusProvince.save({ session });
        return (0, class_transformer_1.plainToInstance)(bus_province_dto_1.BusProvinceDto, savedBusProvince);
    }
    async clone(cloneBusProvinceDto, tenantId, session) {
        const busProvince = await this.create(cloneBusProvinceDto.busProvince, tenantId, session);
        await this.busStationService.createMany(cloneBusProvinceDto.busStations, tenantId, busProvince._id, session);
        return busProvince;
    }
    async findAll(tenantIds) {
        const busProvinces = await this.busProvinceModel
            .find({ tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        return busProvinces.map((busProvince) => (0, class_transformer_1.plainToInstance)(bus_province_dto_1.BusProvinceDto, busProvince));
    }
    async findAvailable(tenantIds) {
        const busProvinces = await this.busProvinceModel.find({ tenantId: { $in: tenantIds }, isActive: true }).lean().exec();
        return busProvinces.map((busProvince) => (0, class_transformer_1.plainToInstance)(bus_province_dto_1.BusProvinceDto, busProvince));
    }
    async findOne(id, tenantIds) {
        const busProvince = await this.busProvinceModel
            .findOne({ _id: id, tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        if (!busProvince) {
            throw new common_1.NotFoundException('Bus province not found');
        }
        return (0, class_transformer_1.plainToInstance)(bus_province_dto_1.BusProvinceDto, busProvince);
    }
    async update(updateBusProvinceDto, tenantId) {
        const updatedBusProvince = await this.busProvinceModel
            .findOneAndUpdate({ _id: updateBusProvinceDto._id, tenantId }, updateBusProvinceDto, { new: true })
            .lean()
            .exec();
        if (!updatedBusProvince) {
            throw new common_1.NotFoundException('Bus province not found');
        }
        return (0, class_transformer_1.plainToInstance)(bus_province_dto_1.BusProvinceDto, updatedBusProvince);
    }
    async delete(id, tenantId) {
        const result = await this.busProvinceModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const pipeline = await this.buildQuerySearchBusProvince(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
        pipeline.push({
            $lookup: {
                from: 'bus_stations',
                localField: '_id',
                foreignField: 'provinceId',
                as: 'busStations',
            },
        });
        const busProvinces = await this.busProvinceModel.aggregate(pipeline).exec();
        const totalItem = await this.busProvinceModel.countDocuments({ tenantId: { $in: tenantIds } });
        const result = busProvinces.map((busProvince) => {
            const dto = (0, class_transformer_1.plainToInstance)(bus_province_dto_1.BusProvinceDto, busProvince);
            if (busProvince.busStations) {
                dto.busStations = busProvince.busStations.map((station) => (0, class_transformer_1.plainToInstance)(bus_station_dto_1.BusStationDto, station));
            }
            return dto;
        });
        return {
            pageIdx,
            busProvinces: result,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchBusProvince(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
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
exports.BusProvinceService = BusProvinceService;
__decorate([
    (0, transaction_decorator_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bus_province_dto_1.CloneBusProvinceDto, mongoose_2.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], BusProvinceService.prototype, "clone", null);
exports.BusProvinceService = BusProvinceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_schema_schema_1.BusProvinceDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_station_service_1.BusStationService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_station_service_1.BusStationService])
], BusProvinceService);
//# sourceMappingURL=bus-province.service.js.map