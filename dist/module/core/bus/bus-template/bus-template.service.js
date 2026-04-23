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
exports.BusTemplateService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bus_template_dto_1 = require("./dto/bus-template.dto");
const mongoose_2 = require("mongoose");
const bus_template_schema_1 = require("./schema/bus-template.schema");
const bus_service_service_1 = require("../bus-service/bus-service.service");
const bus_type_service_1 = require("../bus-type/bus-type.service");
const class_transformer_1 = require("class-transformer");
let BusTemplateService = class BusTemplateService {
    constructor(busTemplateModel, busServiceService, busTypeService) {
        this.busTemplateModel = busTemplateModel;
        this.busServiceService = busServiceService;
        this.busTypeService = busTypeService;
    }
    async create(createBusTemplateDto, tenantId) {
        const createdBus = new this.busTemplateModel({ ...createBusTemplateDto, tenantId });
        const savedBus = await createdBus.save();
        return (0, class_transformer_1.plainToInstance)(bus_template_dto_1.BusTemplateDto, savedBus.toObject());
    }
    async update(updateBusTemplateDto, tenantId) {
        const updatedBusService = await this.busTemplateModel
            .findOneAndUpdate({ _id: updateBusTemplateDto._id, tenantId }, updateBusTemplateDto, { new: true })
            .lean()
            .exec();
        if (!updatedBusService) {
            throw new common_1.NotFoundException(`Bus service with ID "${updateBusTemplateDto._id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(bus_template_dto_1.BusTemplateDto, updatedBusService);
    }
    async delete(id, tenantId) {
        const result = await this.busTemplateModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async findOne(id, tenantIds) {
        const busTemplate = await this.busTemplateModel
            .findOne({ _id: id, tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        if (!busTemplate) {
            throw new common_1.NotFoundException('Bus Template not found');
        }
        const allServices = await this.busServiceService.findAll(tenantIds);
        const busType = await this.busTypeService.findOne(busTemplate.busTypeId, tenantIds);
        const busServices = allServices.filter((service) => busTemplate.busServiceIds.map((id) => id.toString()).includes(service._id.toString()));
        const busWithDetails = {
            ...busTemplate,
            busType,
            busServices,
        };
        return (0, class_transformer_1.plainToInstance)(bus_template_dto_1.BusTemplateDto, busWithDetails);
    }
    async findAll(tenantIds) {
        const buses = await this.busTemplateModel
            .find({ tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        return buses.map((bus) => (0, class_transformer_1.plainToInstance)(bus_template_dto_1.BusTemplateDto, bus));
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const pipeline = await this.buildQuerySearchBusTemplate(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
        const busTemplates = await this.busTemplateModel.aggregate(pipeline).exec();
        const totalItem = await this.busTemplateModel.countDocuments({ tenantId: { $in: tenantIds } });
        const result = (0, class_transformer_1.plainToInstance)(bus_template_dto_1.BusTemplateDto, busTemplates.map((busTemplate) => busTemplate));
        return {
            pageIdx,
            busTemplates: result,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchBusTemplate(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
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
exports.BusTemplateService = BusTemplateService;
exports.BusTemplateService = BusTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_template_schema_1.BusTemplateDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_service_service_1.BusServiceService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_type_service_1.BusTypeService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_service_service_1.BusServiceService,
        bus_type_service_1.BusTypeService])
], BusTemplateService);
//# sourceMappingURL=bus-template.service.js.map