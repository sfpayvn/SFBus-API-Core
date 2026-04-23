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
exports.BusScheduleTemplateService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_schedule_template_dto_1 = require("./dto/bus-schedule-template.dto");
const bus_schedule_template_schema_1 = require("./schema/bus-schedule-template.schema");
const bus_service_1 = require("../bus/bus.service");
const class_transformer_1 = require("class-transformer");
const bus_layout_template_service_1 = require("../bus-layout-template/bus-layout-template.service");
let BusScheduleTemplateService = class BusScheduleTemplateService {
    constructor(busScheduleTemplateModel, busService, busLayoutTemplateService) {
        this.busScheduleTemplateModel = busScheduleTemplateModel;
        this.busService = busService;
        this.busLayoutTemplateService = busLayoutTemplateService;
    }
    async create(createBusScheduleTemplateDto, tenantId) {
        const createdBusScheduleTemplate = new this.busScheduleTemplateModel({
            ...createBusScheduleTemplateDto,
            tenantId,
        });
        const savedBusScheduleTemplate = await createdBusScheduleTemplate.save();
        return (0, class_transformer_1.plainToInstance)(bus_schedule_template_dto_1.BusScheduleTemplateDto, savedBusScheduleTemplate);
    }
    async update(updateBusScheduleTemplateDto, tenantId) {
        const updatedBusService = await this.busScheduleTemplateModel
            .findOneAndUpdate({ _id: updateBusScheduleTemplateDto._id, tenantId }, updateBusScheduleTemplateDto, {
            new: true,
        })
            .lean()
            .exec();
        if (!updatedBusService) {
            throw new common_1.NotFoundException(`Bus service with ID "${updateBusScheduleTemplateDto._id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(bus_schedule_template_dto_1.BusScheduleTemplateDto, updatedBusService);
    }
    async delete(id, tenantId) {
        const result = await this.busScheduleTemplateModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async findAll(tenantIds) {
        const BusScheduleTemplates = await this.busScheduleTemplateModel
            .find({ tenantId: { $in: tenantIds } })
            .lean()
            .exec();
        return BusScheduleTemplates.map((BusScheduleTemplate) => (0, class_transformer_1.plainToInstance)(bus_schedule_template_dto_1.BusScheduleTemplateDto, BusScheduleTemplate));
    }
    async findOne(id, tenantIds) {
        const BusScheduleTemplate = await this.busScheduleTemplateModel
            .findOne({ _id: id, tenantId: { $in: tenantIds } })
            .exec();
        if (!BusScheduleTemplate) {
            throw new common_1.NotFoundException(`Không tìm thấy lịch trình xe buýt với ID ${id}`);
        }
        return (0, class_transformer_1.plainToInstance)(bus_schedule_template_dto_1.BusScheduleTemplateDto, BusScheduleTemplate);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const pipeline = await this.buildQuerySearchBusScheduleTemplate(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
        const busSchedulesTemplate = await this.busScheduleTemplateModel.aggregate(pipeline).exec();
        const totalItem = await this.busScheduleTemplateModel.countDocuments({ tenantId: { $in: tenantIds } });
        const result = (0, class_transformer_1.plainToInstance)(bus_schedule_template_dto_1.BusScheduleTemplateDto, busSchedulesTemplate.map((busScheduleTemplate) => busScheduleTemplate));
        return {
            pageIdx,
            busScheduleTemplates: result,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchBusScheduleTemplate(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
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
exports.BusScheduleTemplateService = BusScheduleTemplateService;
exports.BusScheduleTemplateService = BusScheduleTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_schedule_template_schema_1.BusScheduleTemplateDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_service_1.BusService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_layout_template_service_1.BusLayoutTemplateService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_service_1.BusService,
        bus_layout_template_service_1.BusLayoutTemplateService])
], BusScheduleTemplateService);
//# sourceMappingURL=bus-schedule-template.service.js.map