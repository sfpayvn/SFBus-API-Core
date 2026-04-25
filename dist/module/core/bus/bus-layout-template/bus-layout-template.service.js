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
exports.BusLayoutTemplateService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_layout_template_schema_1 = require("./schema/bus-layout-template.schema");
const bus_layout_template_dto_1 = require("./dto/bus-layout-template.dto");
const class_transformer_1 = require("class-transformer");
let BusLayoutTemplateService = class BusLayoutTemplateService {
    constructor(busLayoutTemplateModel) {
        this.busLayoutTemplateModel = busLayoutTemplateModel;
    }
    async create(createBusLayoutTemplateDto, tenantId) {
        const createdBusTemplate = new this.busLayoutTemplateModel({
            ...createBusLayoutTemplateDto,
            tenantId,
        });
        for (const seatLayout of createdBusTemplate.seatLayouts) {
            for (const seat of seatLayout.seats) {
                seat._id = new mongoose_2.Types.ObjectId();
            }
            seatLayout._id = new mongoose_2.Types.ObjectId();
        }
        const savedBusTemplate = await createdBusTemplate.save();
        return (0, class_transformer_1.plainToInstance)(bus_layout_template_dto_1.BusLayoutTemplateDto, savedBusTemplate.toObject());
    }
    async update(updateBusLayoutTemplateDto, tenantId) {
        const updatedBusService = await this.busLayoutTemplateModel
            .findOneAndUpdate({ _id: updateBusLayoutTemplateDto._id, tenantId }, updateBusLayoutTemplateDto, { new: true })
            .lean()
            .exec();
        if (!updatedBusService) {
            throw new common_1.NotFoundException(`Bus service with ID "${updateBusLayoutTemplateDto._id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(bus_layout_template_dto_1.BusLayoutTemplateDto, updatedBusService);
    }
    async delete(id, tenantId) {
        const result = await this.busLayoutTemplateModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async findAll(tenantIds) {
        const templates = await this.busLayoutTemplateModel
            .find({ tenantId: { $in: tenantIds } })
            .populate('seatLayouts')
            .exec();
        return templates.map((template) => (0, class_transformer_1.plainToInstance)(bus_layout_template_dto_1.BusLayoutTemplateDto, template));
    }
    async findOne(id, tenantIds) {
        const template = await this.busLayoutTemplateModel
            .findOne({ _id: id, tenantId: { $in: tenantIds } })
            .populate('seatLayouts')
            .exec();
        if (!template) {
            throw new common_1.NotFoundException(`BusTemplate with ID "${id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(bus_layout_template_dto_1.BusLayoutTemplateDto, template);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
        const pipeline = await this.buildQuerySearchBusLayoutTemplate(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
        const busLayoutTemplates = await this.busLayoutTemplateModel.aggregate(pipeline).exec();
        const totalItem = await this.busLayoutTemplateModel.countDocuments({ tenantId: { $in: tenantIds } });
        const result = (0, class_transformer_1.plainToInstance)(bus_layout_template_dto_1.BusLayoutTemplateDto, busLayoutTemplates.map((busLayoutTemplate) => busLayoutTemplate));
        return {
            pageIdx,
            busLayoutTemplates: result,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchBusLayoutTemplate(pageIdx, pageSize, keyword, sortBy, filters, tenantIds) {
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
exports.BusLayoutTemplateService = BusLayoutTemplateService;
exports.BusLayoutTemplateService = BusLayoutTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_layout_template_schema_1.BusLayoutTemplateDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BusLayoutTemplateService);
//# sourceMappingURL=bus-layout-template.service.js.map