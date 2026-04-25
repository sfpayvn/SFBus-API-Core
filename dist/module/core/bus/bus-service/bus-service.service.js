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
exports.BusServiceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_service_dto_1 = require("./dto/bus-service.dto");
const bus_service_schema_1 = require("./schema/bus-service.schema");
const class_transformer_1 = require("class-transformer");
let BusServiceService = class BusServiceService {
    constructor(busServiceModel) {
        this.busServiceModel = busServiceModel;
    }
    async create(createBusServiceDto, tenantId) {
        const createdBusServiceModel = new this.busServiceModel({ ...createBusServiceDto, tenantId });
        const savedBusService = await createdBusServiceModel.save();
        let busService = (0, class_transformer_1.plainToInstance)(bus_service_dto_1.BusServiceDto, savedBusService.toObject());
        busService = this.mapBusServiceIconUrl([busService])[0];
        return busService;
    }
    async update(updateBusServiceDto, tenantId) {
        const updatedBusServiceModel = await this.busServiceModel
            .findOneAndUpdate({ _id: updateBusServiceDto._id, tenantId }, updateBusServiceDto, { new: true })
            .lean()
            .exec();
        if (!updatedBusServiceModel) {
            throw new common_1.NotFoundException(`Bus service with ID "${updateBusServiceDto._id}" not found.`);
        }
        let busService = (0, class_transformer_1.plainToInstance)(bus_service_dto_1.BusServiceDto, updatedBusServiceModel);
        busService = this.mapBusServiceIconUrl([busService])[0];
        return busService;
    }
    async delete(id, tenantId) {
        const result = await this.busServiceModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async findAll(tenantIds) {
        const busServicesModel = await this.busServiceModel
            .find({ tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        let busServices = busServicesModel.map((busService) => {
            return (0, class_transformer_1.plainToInstance)(bus_service_dto_1.BusServiceDto, busService);
        });
        busServices = this.mapBusServiceIconUrl(busServices);
        return busServices;
    }
    async findOne(id, tenantIds) {
        const busServiceModel = await this.busServiceModel
            .findOne({ _id: id, tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        if (!busServiceModel) {
            throw new common_1.NotFoundException(`Bus service with ID "${id}" not found.`);
        }
        let busService = (0, class_transformer_1.plainToInstance)(bus_service_dto_1.BusServiceDto, busServiceModel);
        busService = this.mapBusServiceIconUrl([busService])[0];
        return busService;
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const pipeline = await this.buildQuerySearchBusServices(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
        const busServices = await this.busServiceModel.aggregate(pipeline).exec();
        const totalItem = await this.busServiceModel.countDocuments({ tenantId: { $in: tenantIds } });
        let result = (0, class_transformer_1.plainToInstance)(bus_service_dto_1.BusServiceDto, busServices.map((busService) => busService));
        result = this.mapBusServiceIconUrl(result);
        return {
            pageIdx,
            busServices: result,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchBusServices(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
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
    mapBusServiceIconUrl(busServices) {
        return busServices.map((busService) => {
            if (busService.iconId) {
                const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
                busService.icon = `${process.env.DOMAIN}${port}/file/view/${busService.iconId.toString()}`;
            }
            return busService;
        });
    }
};
exports.BusServiceService = BusServiceService;
exports.BusServiceService = BusServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_service_schema_1.BusServiceDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BusServiceService);
//# sourceMappingURL=bus-service.service.js.map