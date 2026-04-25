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
exports.BusRouteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_route_dto_1 = require("./dto/bus-route.dto");
const bus_route_schema_1 = require("./schema/bus-route.schema");
const class_transformer_1 = require("class-transformer");
const bus_station_service_1 = require("../bus-station/bus-station.service");
let BusRouteService = class BusRouteService {
    constructor(busRouteModel, busStationService) {
        this.busRouteModel = busRouteModel;
        this.busStationService = busStationService;
    }
    async create(createBusRouteDto, tenantId) {
        const createdBusroute = new this.busRouteModel({ ...createBusRouteDto, tenantId });
        const savedBusRoute = await createdBusroute.save();
        return (0, class_transformer_1.plainToInstance)(bus_route_dto_1.BusRouteDto, savedBusRoute.toObject());
    }
    async update(updateBusRouteDto, tenantId) {
        const updatedBusService = await this.busRouteModel
            .findOneAndUpdate({ _id: updateBusRouteDto._id, tenantId }, updateBusRouteDto, { new: true })
            .lean()
            .exec();
        if (!updatedBusService) {
            throw new common_1.NotFoundException(`Bus service with ID "${updateBusRouteDto._id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(bus_route_dto_1.BusRouteDto, updatedBusService);
    }
    async delete(id, tenantId) {
        const result = await this.busRouteModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async findAll(tenantIds) {
        const busRoutesModel = await this.busRouteModel
            .find({ tenantId: { $in: tenantIds } })
            .populate('breakPoints.busStation')
            .lean()
            .exec();
        const result = (0, class_transformer_1.plainToInstance)(bus_route_dto_1.BusRouteDto, busRoutesModel);
        return result;
    }
    async findOne(id, tenantIds) {
        const busRouteModel = await this.busRouteModel
            .findOne({ _id: id, tenantId: { $in: tenantIds } })
            .populate('breakPoints.busStation')
            .lean()
            .exec();
        if (!busRouteModel)
            return null;
        const busRoute = (0, class_transformer_1.plainToInstance)(bus_route_dto_1.BusRouteDto, busRouteModel);
        return busRoute;
    }
    async findByStationId(stationId, tenantIds) {
        const busRoutesModel = await this.busRouteModel
            .find({ 'breakPoints.busStationId': stationId, tenantId: { $in: tenantIds } })
            .populate('breakPoints.busStation')
            .lean()
            .exec();
        const result = (0, class_transformer_1.plainToInstance)(bus_route_dto_1.BusRouteDto, busRoutesModel);
        return result;
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const pipeline = await this.buildQuerySearchBusRoute(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
        const busRoutes = await this.busRouteModel.aggregate(pipeline).exec();
        const totalItem = await this.busRouteModel.countDocuments({ tenantId: { $in: tenantIds } });
        const stationIdSet = new Set();
        for (const r of busRoutes) {
            if (!r.breakPoints)
                continue;
            for (const bp of r.breakPoints) {
                if (bp && bp.busStationId)
                    stationIdSet.add(String(bp.busStationId));
            }
        }
        const stationIds = Array.from(stationIdSet).map((id) => new mongoose_2.Types.ObjectId(id));
        const stations = await this.busStationService.findByIds(stationIds, tenantIds);
        const stationMap = new Map(stations.map((s) => [String(s._id), s]));
        const enriched = busRoutes.map((busRoute) => {
            if (!busRoute.breakPoints)
                return busRoute;
            for (const bp of busRoute.breakPoints) {
                bp.busStation = stationMap.get(String(bp.busStationId)) || null;
            }
            return busRoute;
        });
        const result = (0, class_transformer_1.plainToInstance)(bus_route_dto_1.BusRouteDto, enriched);
        return {
            pageIdx,
            busRoutes: result,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchBusRoute(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
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
exports.BusRouteService = BusRouteService;
exports.BusRouteService = BusRouteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_route_schema_1.BusRouteDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_station_service_1.BusStationService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_station_service_1.BusStationService])
], BusRouteService);
//# sourceMappingURL=bus-route.service.js.map