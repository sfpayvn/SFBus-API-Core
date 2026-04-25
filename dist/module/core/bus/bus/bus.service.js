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
exports.BusService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bus_dto_1 = require("./dto/bus.dto");
const mongoose_2 = require("mongoose");
const bus_schema_1 = require("./schema/bus.schema");
const bus_service_service_1 = require("../bus-service/bus-service.service");
const bus_type_service_1 = require("../bus-type/bus-type.service");
const class_transformer_1 = require("class-transformer");
const bus_template_service_1 = require("../bus-template/bus-template.service");
let BusService = class BusService {
    constructor(busModel, busServiceService, busTypeService, busTemplateService) {
        this.busModel = busModel;
        this.busServiceService = busServiceService;
        this.busTypeService = busTypeService;
        this.busTemplateService = busTemplateService;
    }
    async create(createBusDto, tenantId) {
        const createdBus = new this.busModel({ ...createBusDto, tenantId });
        const savedBus = await createdBus.save();
        return (0, class_transformer_1.plainToInstance)(bus_dto_1.BusDto, savedBus);
    }
    async findOne(id, tenantId) {
        const bus = await this.busModel.findOne({ _id: id, tenantId }).lean().exec();
        if (!bus) {
            return null;
        }
        return (0, class_transformer_1.plainToInstance)(bus_dto_1.BusDto, bus);
    }
    async findByBusTemplate(busTemplateId, tenantId, rootTenantId) {
        const busesModel = await this.busModel.find({ busTemplateId, tenantId }).lean().exec();
        if (!busesModel) {
            return [];
        }
        const buses = busesModel.map((bus) => (0, class_transformer_1.plainToInstance)(bus_dto_1.BusDto, bus));
        await Promise.all(buses.map(async (bus) => {
            bus.busTemplate = await this.busTemplateService.findOne(bus.busTemplateId, [tenantId, rootTenantId]);
        }));
        return buses;
    }
    async findAll(tenantId) {
        const buses = await this.busModel.find({ tenantId }).lean().exec();
        return buses.map((bus) => (0, class_transformer_1.plainToInstance)(bus_dto_1.BusDto, bus));
    }
    async update(updateBusDto, tenantId) {
        const updated = await this.busModel
            .findOneAndUpdate({ _id: updateBusDto._id, tenantId }, updateBusDto, { new: true })
            .lean()
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Bus service with ID "${updateBusDto._id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(bus_dto_1.BusDto, updated);
    }
    async delete(id, tenantId) {
        const result = await this.busModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const pipeline = await this.buildQuerySearchBus(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
        const buses = await this.busModel.aggregate(pipeline).exec();
        const totalItem = await this.busModel.countDocuments({ tenantId });
        const result = (0, class_transformer_1.plainToInstance)(bus_dto_1.BusDto, buses.map((b) => b));
        return {
            pageIdx,
            buses: result,
            totalPage: Math.ceil(totalItem / (pageSize || 1)),
            totalItem,
        };
    }
    async buildQuerySearchBus(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [];
        const matchConditions = [{ tenantId }];
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
exports.BusService = BusService;
exports.BusService = BusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_schema_1.BusDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_service_service_1.BusServiceService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_type_service_1.BusTypeService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_template_service_1.BusTemplateService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_service_service_1.BusServiceService,
        bus_type_service_1.BusTypeService,
        bus_template_service_1.BusTemplateService])
], BusService);
//# sourceMappingURL=bus.service.js.map