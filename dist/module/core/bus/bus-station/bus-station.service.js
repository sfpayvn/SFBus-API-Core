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
exports.BusStationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_station_dto_1 = require("./dto/bus-station.dto");
const bus_station_schema_1 = require("./schema/bus-station.schema");
const class_transformer_1 = require("class-transformer");
let BusStationService = class BusStationService {
    constructor(busStationModel) {
        this.busStationModel = busStationModel;
    }
    async create(createBusStationDto, tenantId) {
        const createdBusStation = new this.busStationModel({ ...createBusStationDto, tenantId });
        const savedBusStation = await createdBusStation.save();
        return (0, class_transformer_1.plainToInstance)(bus_station_dto_1.BusStationDto, savedBusStation.toObject());
    }
    createMany(createBusStationDtos, tenantId, provinceId, session) {
        const busStationPromises = createBusStationDtos.map(async (dto) => {
            const createdBusStation = new this.busStationModel({ ...dto, tenantId, provinceId });
            const savedBusStation = await createdBusStation.save({ session });
            return (0, class_transformer_1.plainToInstance)(bus_station_dto_1.BusStationDto, savedBusStation.toObject());
        });
        return Promise.all(busStationPromises);
    }
    async update(updateBusStationDto, tenantId) {
        const updatedBusStation = await this.busStationModel
            .findOneAndUpdate({ _id: updateBusStationDto._id, tenantId }, updateBusStationDto, { new: true })
            .lean()
            .exec();
        if (!updatedBusStation) {
            throw new common_1.NotFoundException('Bus province not found');
        }
        let result = (0, class_transformer_1.plainToInstance)(bus_station_dto_1.BusStationDto, updatedBusStation);
        result = (await this.mapImageUrl([result]))[0];
        return result;
    }
    async updates(updateBusStationDtos, tenantIds) {
        const updatedBusStations = await Promise.all(updateBusStationDtos.map(async (updateBusStationDto) => {
            const updatedBusStation = await this.busStationModel
                .findOneAndUpdate({ _id: updateBusStationDto._id, tenantId: { $in: tenantIds } }, updateBusStationDto, {
                new: true,
            })
                .lean()
                .exec();
            if (!updatedBusStation) {
                throw new common_1.NotFoundException('Bus station not found');
            }
            return (0, class_transformer_1.plainToInstance)(bus_station_dto_1.BusStationDto, updatedBusStation);
        }));
        return updatedBusStations;
    }
    async delete(id, tenantId) {
        const result = await this.busStationModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async findAll(tenantIds) {
        const busStations = await this.busStationModel
            .find({ tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        let result = busStations.map((busStation) => (0, class_transformer_1.plainToInstance)(bus_station_dto_1.BusStationDto, busStation));
        result = await this.mapImageUrl(result);
        return result;
    }
    async findAllAvailable(tenantIds) {
        const busStations = await this.busStationModel
            .find({ tenantId: { $in: tenantIds }, provinceId: { $ne: null }, isActive: true })
            .lean()
            .exec();
        let result = busStations.map((busStation) => (0, class_transformer_1.plainToInstance)(bus_station_dto_1.BusStationDto, busStation));
        result = await this.mapImageUrl(result);
        return result;
    }
    async findAllUnAssignedAvailable(tenantId) {
        const busStations = await this.busStationModel
            .find({ tenantId, provinceId: { $eq: null }, isActive: true })
            .lean()
            .exec();
        let result = busStations.map((busStation) => (0, class_transformer_1.plainToInstance)(bus_station_dto_1.BusStationDto, busStation));
        result = await this.mapImageUrl(result);
        return result;
    }
    async findOffices(tenantIds) {
        const busStations = await this.busStationModel
            .find({ tenantId: { $in: tenantIds }, provinceId: { $ne: null }, isActive: true, isOffice: true })
            .lean()
            .exec();
        let result = busStations.map((busStation) => (0, class_transformer_1.plainToInstance)(bus_station_dto_1.BusStationDto, busStation));
        result = await this.mapImageUrl(result);
        return result;
    }
    async findOne(id, tenantIds) {
        const busStation = await this.busStationModel
            .findOne({ _id: id, tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        if (!busStation) {
            throw new common_1.NotFoundException(`Bus station with ID "${id}" not found.`);
        }
        let result = (0, class_transformer_1.plainToInstance)(bus_station_dto_1.BusStationDto, busStation);
        result = (await this.mapImageUrl([result]))[0];
        return result;
    }
    async findByIds(ids, tenantIds) {
        if (!ids || !ids.length)
            return [];
        const busStations = await this.busStationModel
            .find({ _id: { $in: ids }, tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        let result = busStations.map((busStation) => (0, class_transformer_1.plainToInstance)(bus_station_dto_1.BusStationDto, busStation));
        result = await this.mapImageUrl(result);
        return result;
    }
    async findOneByProvinceId(provinceId, tenantIds) {
        const busStation = await this.busStationModel
            .findOne({ provinceId, tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        if (!busStation) {
            throw new common_1.NotFoundException(`Bus Province with ID "${provinceId}" not found.`);
        }
        let result = (0, class_transformer_1.plainToInstance)(bus_station_dto_1.BusStationDto, busStation);
        result = (await this.mapImageUrl([result]))[0];
        return result;
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const pipeline = await this.buildQuerySearchBusStation(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
        const busStations = await this.busStationModel.aggregate(pipeline).exec();
        const totalItem = await this.busStationModel.countDocuments({ tenantId: { $in: tenantIds } });
        const result = (0, class_transformer_1.plainToInstance)(bus_station_dto_1.BusStationDto, busStations.map((busStation) => busStation));
        let mapped = result;
        mapped = await this.mapImageUrl(mapped);
        return {
            pageIdx,
            busStations: mapped,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async mapImageUrl(busStations) {
        return await Promise.all(busStations.map(async (busStation) => {
            if (busStation.imageId) {
                const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
                busStation.image = `${process.env.DOMAIN}${port}/file/view/${busStation.imageId.toString()}`;
            }
            return busStation;
        }));
    }
    async buildQuerySearchBusStation(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
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
exports.BusStationService = BusStationService;
exports.BusStationService = BusStationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_station_schema_1.BusStationDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BusStationService);
//# sourceMappingURL=bus-station.service.js.map