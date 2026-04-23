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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusScheduleService = void 0;
const common_1 = require("@nestjs/common");
const create_bus_schedule_dto_1 = require("./dto/create-bus-schedule.dto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const bus_schedule_dto_1 = require("./dto/bus-schedule.dto");
const bus_schedule_schema_1 = require("./schema/bus-schedule.schema");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const bus_service_1 = require("../bus/bus.service");
const class_transformer_1 = require("class-transformer");
const bus_schedule_layout_service_1 = require("../bus-schedule-layout/bus-schedule-layout.service");
const bus_layout_template_service_1 = require("../bus-layout-template/bus-layout-template.service");
const utils_1 = require("../../../../utils/utils");
const utils_2 = require("../../../../utils/utils");
const nanoid_1 = require("nanoid");
const settings_service_1 = require("../../settings/settings.service");
const setting_constants_1 = require("../../../../common/constants/setting.constants");
const driver_service_1 = require("../../user/driver/driver.service");
const status_constants_1 = require("../../../../common/constants/status.constants");
const tracking_service_1 = require("../../tracking/tracking.service");
const tracking_types_1 = require("../../tracking/constants/tracking-types");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let BusScheduleService = class BusScheduleService {
    constructor(busScheduleModel, busService, busScheduleLayoutService, busLayoutTemplateService, driverService, settingsService, trackingService) {
        this.busScheduleModel = busScheduleModel;
        this.busService = busService;
        this.busScheduleLayoutService = busScheduleLayoutService;
        this.busLayoutTemplateService = busLayoutTemplateService;
        this.driverService = driverService;
        this.settingsService = settingsService;
        this.trackingService = trackingService;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
    }
    async create(createBusScheduleDto, rootTenantId, tenantId) {
        const busLayoutTemplate = await this.busLayoutTemplateService.findOne(createBusScheduleDto.busLayoutTemplateId, [
            rootTenantId,
            tenantId,
        ]);
        createBusScheduleDto.busScheduleNumber = this.generateBusScheduleNumber();
        if (createBusScheduleDto.busId) {
            const bus = await this.busService.findOne(createBusScheduleDto.busId, tenantId);
            if (!bus) {
                throw new common_1.NotFoundException(`Không tìm thấy xe buýt với ID ${createBusScheduleDto.busId}`);
            }
            const bus2Update = (0, class_transformer_1.plainToInstance)(create_bus_schedule_dto_1.CreateBusScheduleBusDto, bus, { excludeExtraneousValues: true });
            createBusScheduleDto.bus = bus2Update;
        }
        createBusScheduleDto.currentStationId = createBusScheduleDto.busRoute.breakPoints[0].busStationId;
        busLayoutTemplate.seatLayouts = busLayoutTemplate.seatLayouts.map((seatLayout) => {
            seatLayout.seats = seatLayout.seats.map((seat) => ({
                ...seat,
                status: createBusScheduleDto.busSeatLayoutBlockIds.map((id) => id.toString()).includes(seat._id.toString())
                    ? 'blocked'
                    : 'available',
                _id: new mongoose_3.Types.ObjectId(),
            }));
            return {
                ...seatLayout,
                _id: new mongoose_3.Types.ObjectId(),
            };
        });
        const createdBusSchedule = new this.busScheduleModel({ ...createBusScheduleDto, tenantId });
        const savedBusSchedule = await createdBusSchedule.save();
        const busSchedule = (0, class_transformer_1.plainToInstance)(bus_schedule_dto_1.BusScheduleDto, savedBusSchedule.toObject());
        const createBusScheduleLayoutDto = {
            busLayoutTemplateId: createBusScheduleDto.busLayoutTemplateId,
            name: busLayoutTemplate.name,
            seatLayouts: busLayoutTemplate.seatLayouts,
            busScheduleId: busSchedule._id,
        };
        await this.busScheduleLayoutService.create(createBusScheduleLayoutDto, tenantId);
        return busSchedule;
    }
    async findAll(tenantId, filters) {
        const match = { tenantId };
        const ands = [];
        if (filters && Array.isArray(filters)) {
            for (const { key, value } of filters) {
                ands.push((0, utils_1.processFilterValue)(key, value));
            }
        }
        if (ands.length)
            match.$and = ands;
        const pipeline = [{ $match: match }];
        const items = await this.busScheduleModel.aggregate(pipeline).exec();
        const busSchedules = items.map((schedule) => (0, class_transformer_1.plainToInstance)(bus_schedule_dto_1.BusScheduleDto, schedule));
        const enrichSchedules = await this.enrichSchedules(busSchedules, tenantId);
        return enrichSchedules;
    }
    async findAllAvailable(tenantId) {
        const startOfDay = (0, moment_timezone_1.default)(new Date(), 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Asia/Ho_Chi_Minh')
            .clone()
            .startOf('day')
            .tz('Asia/Ho_Chi_Minh')
            .toDate();
        const endOfDay = (0, moment_timezone_1.default)(new Date(), 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Asia/Ho_Chi_Minh')
            .clone()
            .endOf('day')
            .tz('Asia/Ho_Chi_Minh')
            .toDate();
        const query = {
            tenantId,
            status: { $in: ['scheduled'] },
            startDate: {
                $gte: startOfDay.toISOString(),
                $lte: endOfDay.toISOString(),
            },
        };
        const busScheduleBusDocument = await this.busScheduleModel.find(query).lean().exec();
        const busSchedules = busScheduleBusDocument.map((schedule) => (0, class_transformer_1.plainToInstance)(bus_schedule_dto_1.BusScheduleDto, schedule));
        const enrichSchedules = await this.enrichSchedules(busSchedules, tenantId);
        return enrichSchedules;
    }
    async findOne(id, tenantId) {
        const busScheduleModel = await this.busScheduleModel.findOne({ _id: id, tenantId }).lean().exec();
        if (!busScheduleModel) {
            throw new common_1.NotFoundException(`Không tìm thấy lịch trình xe buýt với ID ${id}`);
        }
        const busSchedule = (0, class_transformer_1.plainToInstance)(bus_schedule_dto_1.BusScheduleDto, busScheduleModel);
        const enrichSchedules = await this.enrichSchedules([busSchedule], tenantId);
        return enrichSchedules[0];
    }
    async update(updateBusScheduleDto, tenantId) {
        const updateData = {};
        if (updateBusScheduleDto.busId) {
            const bus = await this.busService.findOne(updateBusScheduleDto.busId, tenantId);
            if (!bus) {
                throw new common_1.NotFoundException(`Không tìm thấy xe buýt với ID ${updateBusScheduleDto.busId}`);
            }
            const bus2Update = (0, class_transformer_1.plainToInstance)(create_bus_schedule_dto_1.CreateBusScheduleBusDto, bus, { excludeExtraneousValues: true });
            updateBusScheduleDto.bus = bus2Update;
        }
        Object.keys(updateBusScheduleDto).forEach((key) => {
            if (key !== '_id' && key !== 'tenantId' && updateBusScheduleDto[key] !== undefined) {
                updateData[key] = updateBusScheduleDto[key];
            }
        });
        const updateBusScheduleDocument = await this.busScheduleModel
            .findOneAndUpdate({ _id: updateBusScheduleDto._id, tenantId }, { $set: updateData }, { new: true })
            .exec();
        if (!updateBusScheduleDocument) {
            throw new common_1.NotFoundException(`Bus Schedule with ID "${updateBusScheduleDto._id}" not found.`);
        }
        if (updateBusScheduleDto.busSeatLayoutBlockIds && updateBusScheduleDto.busSeatLayoutBlockIds.length > 0) {
            const requestUpdateSeatsStatus = [];
            for (const _id of updateBusScheduleDto.busSeatLayoutBlockIds) {
                const updateSeatStatus = {
                    _id,
                    status: 'blocked',
                };
                requestUpdateSeatsStatus.push(updateSeatStatus);
            }
            await this.busScheduleLayoutService.updateSeatStatusByBusSchedule(updateBusScheduleDto._id, requestUpdateSeatsStatus, tenantId);
        }
        return (0, class_transformer_1.plainToInstance)(bus_schedule_dto_1.BusScheduleDto, updateBusScheduleDocument.toObject());
    }
    async delete(id, tenantId) {
        const result = await this.busScheduleModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async searchBusSchedulePaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const pipeline = await this.buildQuerySearchBusSchedule(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
        const busSchedules = await this.busScheduleModel.aggregate(pipeline).exec();
        const totalItem = await this.busScheduleModel.countDocuments({ tenantId });
        const filteredSchedules = await this.enrichSchedules(busSchedules, tenantId);
        return {
            pageIdx,
            busSchedules: filteredSchedules,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async searchBusScheduleByDriver(keyword, sortBy, filters, driverId, tenantId) {
        const pipeline = await this.buildQuerySearchBusScheduleByDriver(keyword, sortBy, filters, driverId, tenantId);
        const busSchedules = await this.busScheduleModel.aggregate(pipeline).exec();
        const filteredSchedules = await this.enrichSchedules(busSchedules, tenantId);
        return filteredSchedules;
    }
    async buildQuerySearchScheduleDeparture(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const filtersWithDirection = Array.isArray(filters)
            ? [...filters.filter((f) => f.key !== 'scheduleDirection')]
            : [];
        filtersWithDirection.push({ key: 'scheduleDirection', value: 'departure' });
        return this.buildQuerySearchBusScheduleDirection(pageIdx, pageSize, keyword, sortBy, filtersWithDirection, tenantId);
    }
    async buildQuerySearchScheduleArrival(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const filtersWithDirection = Array.isArray(filters)
            ? [...filters.filter((f) => f.key !== 'scheduleDirection')]
            : [];
        filtersWithDirection.push({ key: 'scheduleDirection', value: 'arrival' });
        return this.buildQuerySearchBusScheduleDirection(pageIdx, pageSize, keyword, sortBy, filtersWithDirection, tenantId);
    }
    async searchBusScheduleDeparture(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const pipeline = await this.buildQuerySearchScheduleDeparture(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
        const busSchedules = await this.busScheduleModel.aggregate(pipeline).exec();
        const totalItem = await this.busScheduleModel.countDocuments({ tenantId });
        const filteredSchedules = await this.enrichSchedules(busSchedules, tenantId);
        return {
            pageIdx,
            busSchedules: filteredSchedules,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async searchBusScheduleArrival(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const pipeline = await this.buildQuerySearchScheduleArrival(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
        const busSchedules = await this.busScheduleModel.aggregate(pipeline).exec();
        const totalItem = await this.busScheduleModel.countDocuments({ tenantId });
        const filteredSchedules = await this.enrichSchedules(busSchedules, tenantId);
        return {
            pageIdx,
            busSchedules: filteredSchedules,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async updateScheduleStatus(schedules, tenantId) {
        const updates = [];
        const currentDate = (0, utils_1.getCurrentDate)();
        for (const schedule of schedules) {
            if ([status_constants_1.EVENT_STATUS.UN_PUBLISHED, status_constants_1.EVENT_STATUS.IN_PROGRESS, status_constants_1.EVENT_STATUS.SCHEDULED].includes(schedule.status)) {
                const startDate = (0, moment_timezone_1.default)(schedule.startDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Asia/Ho_Chi_Minh')
                    .clone()
                    .tz('Asia/Ho_Chi_Minh')
                    .toDate();
                const endDate = (0, moment_timezone_1.default)(schedule.endDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Asia/Ho_Chi_Minh')
                    .clone()
                    .tz('Asia/Ho_Chi_Minh')
                    .toDate();
                const cutoffMs = this.getCutoffMilliseconds(schedule.tenantId);
                let newStatus = schedule.status;
                if (endDate < currentDate) {
                    newStatus = status_constants_1.EVENT_STATUS.OVERDUE;
                }
                else if (startDate < new Date(currentDate.getTime() + cutoffMs) &&
                    endDate > currentDate) {
                    newStatus = status_constants_1.EVENT_STATUS.IN_PROGRESS;
                }
                if (newStatus !== schedule.status && schedule && schedule._id) {
                    schedule.status = newStatus;
                    if (newStatus === status_constants_1.EVENT_STATUS.IN_PROGRESS) {
                        await this.trackingService.create({
                            type: tracking_types_1.TRACKING_TYPES.SCHEDULE_IN_PROGRESS,
                            platform: roles_constants_1.ROLE_CONSTANTS.ADMIN,
                            metadata: {
                                schedule,
                            },
                            createdBy: tenantId,
                        }, tenantId);
                    }
                    updates.push({ _id: schedule._id, newStatus });
                }
            }
        }
        if (updates.length > 0) {
            const bulkOps = updates.map((update) => ({
                updateOne: {
                    filter: { _id: update._id },
                    update: { $set: { status: update.newStatus } },
                },
            }));
            await this.busScheduleModel.bulkWrite(bulkOps).catch(() => { });
        }
        return schedules;
    }
    getCutoffMilliseconds(tenantId) {
        try {
            const settingValue = this.settingsService.findByName(setting_constants_1.SETTING_CONSTANTS.BUS_SCHEDULE_AVAILABILITY_CUTOFF, tenantId);
            if (settingValue) {
                return (0, utils_1.parseTimeHmToMilliseconds)(settingValue);
            }
            return 60 * 60 * 1000;
        }
        catch {
            return 60 * 60 * 1000;
        }
    }
    async updateBusScheduleNote(busScheduleId, note, tenantId) {
        if (!busScheduleId) {
            throw new common_1.NotFoundException(`Bus Schedule not found.`);
        }
        const updatedBusSchedule = await this.busScheduleModel
            .findOneAndUpdate({ _id: busScheduleId, tenantId }, { note }, { new: true })
            .lean()
            .exec();
        if (!updatedBusSchedule) {
            throw new common_1.NotFoundException(`Bus Schedule not found.`);
        }
        return updatedBusSchedule.note;
    }
    async updateCurrentStation(busScheduleId, currentStationId, tenantId) {
        if (!busScheduleId) {
            throw new common_1.NotFoundException(`Bus Schedule not found.`);
        }
        const updated = await this.busScheduleModel
            .findOneAndUpdate({ _id: busScheduleId, tenantId }, { $set: { currentStationId } }, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Bus Schedule not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(bus_schedule_dto_1.BusScheduleDto, updated.toObject());
    }
    generateBusScheduleNumber() {
        return this.nanoid();
    }
    async buildQuerySearchBusScheduleDirection(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
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
        let scheduleDirection = '';
        let currentStationIdValue = null;
        if (Array.isArray(filters)) {
            await Promise.all(filters.map(async ({ key, value }) => {
                if (!key || value == null)
                    return;
                if (key === 'startDate') {
                    startDateValue = (0, utils_1.getFirstValue)(value);
                }
                else if (key === 'endDate') {
                    endDateValue = (0, utils_1.getFirstValue)(value);
                }
                else if (key === 'scheduleDirection') {
                    scheduleDirection = (0, utils_1.getFirstValue)(value);
                }
                else if (key === 'currentStationId') {
                    const firstVal = (0, utils_1.getFirstValue)(value);
                    let idHex = null;
                    if (firstVal && typeof firstVal === 'object' && firstVal.buffer != null) {
                        idHex = (0, utils_2.bufferToObjectIdHex)(firstVal);
                    }
                    else if (firstVal) {
                        idHex = firstVal;
                    }
                    currentStationIdValue = idHex ? new mongoose_3.Types.ObjectId(idHex) : null;
                }
                else if (key === 'departureId') {
                    matchConditions.push({ 'busRoute.breakPoints.0.busStationId': new mongoose_3.Types.ObjectId((0, utils_1.getFirstValue)(value)) });
                }
                else if (key === 'destinationId') {
                    if (!pipeline.some((stage) => stage.$addFields?.lastBreakPoint)) {
                        pipeline.push({
                            $addFields: {
                                lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] },
                            },
                        });
                    }
                    matchConditions.push({ 'lastBreakPoint.busStationId': new mongoose_3.Types.ObjectId((0, utils_1.getFirstValue)(value)) });
                }
                else {
                    matchConditions.push((0, utils_1.processFilterValue)(key, value));
                }
            }));
        }
        if (currentStationIdValue) {
            if (scheduleDirection === 'arrival') {
                if (!pipeline.some((stage) => stage.$addFields?.lastBreakPoint)) {
                    pipeline.push({
                        $addFields: {
                            lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] },
                        },
                    });
                }
                matchConditions.push({ 'lastBreakPoint.busStationId': currentStationIdValue });
            }
            else {
                matchConditions.push({ 'busRoute.breakPoints.0.busStationId': currentStationIdValue });
            }
        }
        if (scheduleDirection === 'arrival') {
            if (startDateValue || endDateValue) {
                const endRange = {};
                if (startDateValue)
                    endRange.$gte = startDateValue;
                if (endDateValue)
                    endRange.$lte = endDateValue;
                matchConditions.push({ endDate: endRange });
            }
        }
        else {
            if (startDateValue || endDateValue) {
                const rangeCond = {};
                if (startDateValue)
                    rangeCond.$gte = startDateValue;
                if (endDateValue)
                    rangeCond.$lte = endDateValue;
                matchConditions.push({ startDate: rangeCond });
            }
        }
        const matchConditionsWithoutStatus = matchConditions.filter((cond) => !cond.status && !(cond.$and && cond.$and.some((c) => c.status)));
        if (matchConditionsWithoutStatus.length) {
            pipeline.push({
                $match: { $and: matchConditionsWithoutStatus },
            });
        }
        const statusFilter = matchConditions.find((cond) => cond.status);
        if (statusFilter) {
            pipeline.push({
                $match: { status: statusFilter.status },
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
    async buildQuerySearchBusSchedule(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
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
        let scheduleDirection = '';
        let currentStationIdValue = null;
        if (Array.isArray(filters)) {
            await Promise.all(filters.map(async ({ key, value }) => {
                if (!key || value == null)
                    return;
                if (key === 'startDate') {
                    startDateValue = (0, utils_1.getFirstValue)(value);
                }
                else if (key === 'endDate') {
                    endDateValue = (0, utils_1.getFirstValue)(value);
                }
                else if (key === 'scheduleDirection') {
                    scheduleDirection = (0, utils_1.getFirstValue)(value);
                }
                else if (key === 'currentStationId') {
                    const firstVal = (0, utils_1.getFirstValue)(value);
                    if (firstVal && typeof firstVal === 'object' && firstVal.buffer != null) {
                        currentStationIdValue = null;
                    }
                    else {
                        currentStationIdValue = new mongoose_3.Types.ObjectId((0, utils_1.getFirstValue)(value));
                    }
                }
                else if (key === 'departureId') {
                    matchConditions.push({ 'busRoute.breakPoints.0.busStationId': new mongoose_3.Types.ObjectId((0, utils_1.getFirstValue)(value)) });
                }
                else if (key === 'destinationId') {
                    if (!pipeline.some((stage) => stage.$addFields?.lastBreakPoint)) {
                        pipeline.push({
                            $addFields: {
                                lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] },
                            },
                        });
                    }
                    matchConditions.push({ 'lastBreakPoint.busStationId': new mongoose_3.Types.ObjectId((0, utils_1.getFirstValue)(value)) });
                }
                else {
                    matchConditions.push((0, utils_1.processFilterValue)(key, value));
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
        if (currentStationIdValue) {
            if (scheduleDirection === 'arrival') {
                if (!pipeline.some((stage) => stage.$addFields?.lastBreakPoint)) {
                    pipeline.push({
                        $addFields: {
                            lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] },
                        },
                    });
                }
                matchConditions.push({ 'lastBreakPoint.busStationId': currentStationIdValue });
            }
            else {
                matchConditions.push({ 'busRoute.breakPoints.0.busStationId': currentStationIdValue });
            }
        }
        pipeline.push({
            $match: { $and: matchConditions },
        });
        if (sortBy?.key) {
            pipeline.push({
                $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
            });
        }
        if (pageSize > 0) {
            pipeline.push({ $skip: skip }, { $limit: pageSize });
        }
        return pipeline;
    }
    async buildQuerySearchBusScheduleByDriver(keyword, sortBy, filters, driverId, tenantId) {
        const pipeline = [];
        const matchConditions = [{ tenantId }, { busDriverIds: { $in: [driverId] } }];
        if (keyword) {
            matchConditions.push({
                $or: [{ name: { $regex: keyword, $options: 'i' } }],
            });
        }
        let startDateValue = '';
        let endDateValue = '';
        let scheduleDirection = '';
        let currentStationIdValue = null;
        if (Array.isArray(filters)) {
            await Promise.all(filters.map(async ({ key, value }) => {
                if (!key || value == null)
                    return;
                if (key === 'startDate') {
                    startDateValue = (0, utils_1.getFirstValue)(value);
                }
                else if (key === 'endDate') {
                    endDateValue = (0, utils_1.getFirstValue)(value);
                }
                else if (key === 'scheduleDirection') {
                    scheduleDirection = (0, utils_1.getFirstValue)(value);
                }
                else if (key === 'currentStationId') {
                    const firstVal = (0, utils_1.getFirstValue)(value);
                    let idHex = null;
                    if (firstVal && typeof firstVal === 'object' && firstVal.buffer != null) {
                        idHex = (0, utils_2.bufferToObjectIdHex)(firstVal);
                    }
                    else if (firstVal) {
                        idHex = firstVal;
                    }
                    currentStationIdValue = idHex ? new mongoose_3.Types.ObjectId(idHex) : null;
                }
                else if (key === 'departureId') {
                    matchConditions.push({ 'busRoute.breakPoints.0.busStationId': new mongoose_3.Types.ObjectId((0, utils_1.getFirstValue)(value)) });
                }
                else if (key === 'destinationId') {
                    pipeline.push({
                        $addFields: {
                            lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] },
                        },
                    });
                    pipeline.push({
                        $addFields: {
                            lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] },
                        },
                    });
                    matchConditions.push({ 'lastBreakPoint.busStationId': new mongoose_3.Types.ObjectId((0, utils_1.getFirstValue)(value)) });
                }
                else {
                    matchConditions.push((0, utils_1.processFilterValue)(key, value));
                }
            }));
        }
        if (currentStationIdValue) {
            if (scheduleDirection === 'arrival') {
                if (!pipeline.some((stage) => stage.$addFields?.lastBreakPoint)) {
                    pipeline.push({
                        $addFields: {
                            lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] },
                        },
                    });
                }
                matchConditions.push({ 'lastBreakPoint.busStationId': currentStationIdValue });
            }
            else {
                matchConditions.push({ 'busRoute.breakPoints.0.busStationId': currentStationIdValue });
            }
        }
        if (scheduleDirection === 'arrival') {
            if (startDateValue || endDateValue) {
                const endRange = {};
                if (startDateValue)
                    endRange.$gte = startDateValue;
                if (endDateValue)
                    endRange.$lte = endDateValue;
                matchConditions.push({ endDate: endRange });
            }
        }
        else {
            if (startDateValue || endDateValue) {
                const rangeCond = {};
                if (startDateValue)
                    rangeCond.$gte = startDateValue;
                if (endDateValue)
                    rangeCond.$lte = endDateValue;
                matchConditions.push({ startDate: rangeCond });
            }
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
        return pipeline;
    }
    mapBusServiceImages(busServices) {
        return busServices.map((service) => {
            if (!service.icon) {
                const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
                service.icon = `${process.env.DOMAIN}${port}/file/view/${service.iconId.toString()}`;
            }
            return service;
        });
    }
    mapBusTemplateServices(schedule) {
        if (schedule.busTemplate && schedule.busTemplate.busServices) {
            schedule.busTemplate.busServices = this.mapBusServiceImages(schedule.busTemplate.busServices);
        }
        return schedule;
    }
    async enrichSchedules(schedules, tenantId) {
        const updatedSchedules = await this.updateScheduleStatus(schedules, tenantId);
        schedules = updatedSchedules;
        const remainSeats = await Promise.all(schedules.map((schedule) => this.busScheduleLayoutService.getRemainSeats(schedule._id, tenantId)));
        schedules.forEach((schedule, index) => {
            schedule.remainSeat = remainSeats[index];
        });
        const busDriversList = await Promise.all(schedules.map((schedule) => this.driverService.findUserDriverByIds(schedule.busDriverIds, tenantId)));
        return schedules.map((schedule, index) => {
            schedule.busDrivers = busDriversList[index];
            schedule = this.mapBusTemplateServices(schedule);
            return schedule;
        });
    }
};
exports.BusScheduleService = BusScheduleService;
exports.BusScheduleService = BusScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_schedule_schema_1.BusScheduleDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_service_1.BusService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_schedule_layout_service_1.BusScheduleLayoutService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_layout_template_service_1.BusLayoutTemplateService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => driver_service_1.DriverService))),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => settings_service_1.SettingsService))),
    __param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => tracking_service_1.TrackingService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_service_1.BusService,
        bus_schedule_layout_service_1.BusScheduleLayoutService,
        bus_layout_template_service_1.BusLayoutTemplateService,
        driver_service_1.DriverService,
        settings_service_1.SettingsService,
        tracking_service_1.TrackingService])
], BusScheduleService);
//# sourceMappingURL=bus-schedule.service.js.map