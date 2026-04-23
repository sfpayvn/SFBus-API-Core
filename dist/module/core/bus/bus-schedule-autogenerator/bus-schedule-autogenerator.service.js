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
exports.BusScheduleAutogeneratorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const bus_schedule_autogenerator_dto_1 = require("./dto/bus-schedule-autogenerator.dto");
const bus_schedule_autogenerator_schema_1 = require("./schema/bus-schedule-autogenerator.schema");
const class_transformer_1 = require("class-transformer");
const bus_schedule_template_service_1 = require("../bus-schedule-template/bus-schedule-template.service");
const bus_schedule_service_1 = require("../bus-schedule/bus-schedule.service");
const create_bus_schedule_dto_1 = require("../bus-schedule/dto/create-bus-schedule.dto");
const bus_template_service_1 = require("../bus-template/bus-template.service");
const bus_service_1 = require("../bus/bus.service");
const bus_route_service_1 = require("../bus-route/bus-route.service");
const bus_station_service_1 = require("../bus-station/bus-station.service");
const bus_province_service_1 = require("../bus-province/bus-province.service");
const nanoid_1 = require("nanoid");
const utils_1 = require("../../../../utils/utils");
const status_constants_1 = require("../../../../common/constants/status.constants");
const auto_job_tracking_1 = require("../../auto-job-tracking");
const settings_service_1 = require("../../settings/settings.service");
const setting_constants_1 = require("../../../../common/constants/setting.constants");
let BusScheduleAutogeneratorService = class BusScheduleAutogeneratorService {
    constructor(busScheduleAutogeneratorModel, busScheduleTemplateService, busScheduleService, busTemplateService, busService, busRouteService, busStationService, busProvinceService, autoJobTrackingService, settingsService) {
        this.busScheduleAutogeneratorModel = busScheduleAutogeneratorModel;
        this.busScheduleTemplateService = busScheduleTemplateService;
        this.busScheduleService = busScheduleService;
        this.busTemplateService = busTemplateService;
        this.busService = busService;
        this.busRouteService = busRouteService;
        this.busStationService = busStationService;
        this.busProvinceService = busProvinceService;
        this.autoJobTrackingService = autoJobTrackingService;
        this.settingsService = settingsService;
        this.ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
        this.isRunDay = (busScheduleAutoGenerator, date) => {
            const todayWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            if (busScheduleAutoGenerator.endDate) {
                const endDate = new Date(busScheduleAutoGenerator.endDate);
                const endDateWithoutTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                if (todayWithoutTime.getTime() > endDateWithoutTime.getTime()) {
                    return false;
                }
            }
            const startDate = new Date(busScheduleAutoGenerator.startDate);
            const adjustedStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            adjustedStartDate.setDate(adjustedStartDate.getDate() - busScheduleAutoGenerator.preGenerateDays);
            const start = new Date(adjustedStartDate.getFullYear(), adjustedStartDate.getMonth(), adjustedStartDate.getDate());
            const diffMs = todayWithoutTime.getTime() - start.getTime();
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            if (diffDays < 0) {
                return false;
            }
            if (busScheduleAutoGenerator.repeatType === 'weeks') {
                const diffWeeks = Math.floor(diffDays / 7);
                const isWeekValid = diffWeeks % busScheduleAutoGenerator.repeatInterval === 0;
                const isDayValid = busScheduleAutoGenerator.repeatDaysPerWeek.includes(todayWithoutTime.toLocaleString('en-US', { weekday: 'short' }));
                return isWeekValid && isDayValid;
            }
            else {
                return diffDays % busScheduleAutoGenerator.repeatInterval === 0;
            }
        };
    }
    async create(createBusScheduleAutogeneratorDto, tenantId, timezoneOffset) {
        const createdBusScheduleAutogenerator = new this.busScheduleAutogeneratorModel({
            ...createBusScheduleAutogeneratorDto,
            tenantId,
        });
        createdBusScheduleAutogenerator.specificTimeSlots.map((specificTimeSlot) => {
            specificTimeSlot._id = new mongoose_3.Types.ObjectId();
        });
        const savedBusScheduleAutogenerator = await createdBusScheduleAutogenerator.save();
        const busScheduleAutogenerator = (0, class_transformer_1.plainToInstance)(bus_schedule_autogenerator_dto_1.BusScheduleAutogeneratorDto, savedBusScheduleAutogenerator.toObject());
        const rootTenantId = (0, utils_1.toObjectId)(this.ROOT_TENANT_ID);
        const jobName = `auto_schedule:${busScheduleAutogenerator._id}`;
        if (busScheduleAutogenerator.status === status_constants_1.EVENT_STATUS.SCHEDULED) {
            const shouldRun = await this.autoJobTrackingService.tryRunToday(tenantId, jobName, timezoneOffset);
            if (shouldRun) {
                this.runCreateBusSchedule(busScheduleAutogenerator._id, rootTenantId, tenantId, timezoneOffset);
            }
        }
        return busScheduleAutogenerator;
    }
    async findAll(tenantId) {
        const busScheduleAutogenerators = await this.busScheduleAutogeneratorModel.find({ tenantId }).lean().exec();
        return busScheduleAutogenerators.map((busScheduleAutogenerator) => (0, class_transformer_1.plainToInstance)(bus_schedule_autogenerator_dto_1.BusScheduleAutogeneratorDto, busScheduleAutogenerator));
    }
    async findOne(id, tenantId) {
        const busScheduleAutogenerator = await this.busScheduleAutogeneratorModel
            .findOne({ _id: id, tenantId })
            .lean()
            .exec();
        if (!busScheduleAutogenerator) {
            throw new common_1.NotFoundException(`Không tìm thấy lịch trình xe buýt với ID ${id}`);
        }
        return (0, class_transformer_1.plainToInstance)(bus_schedule_autogenerator_dto_1.BusScheduleAutogeneratorDto, busScheduleAutogenerator);
    }
    async update(updateBusScheduleAutogeneratorDto, tenantId, timezoneOffset) {
        const updatedBusService = await this.busScheduleAutogeneratorModel
            .findOneAndUpdate({ _id: updateBusScheduleAutogeneratorDto._id, tenantId }, updateBusScheduleAutogeneratorDto, {
            new: true,
        })
            .lean()
            .exec();
        if (!updatedBusService) {
            throw new common_1.NotFoundException(`Bus service with ID "${updateBusScheduleAutogeneratorDto._id}" not found.`);
        }
        const result = (0, class_transformer_1.plainToInstance)(bus_schedule_autogenerator_dto_1.BusScheduleAutogeneratorDto, updatedBusService);
        try {
            const rootTenantId = (0, utils_1.toObjectId)(this.ROOT_TENANT_ID);
            const jobName = `auto_schedule:${result._id}`;
            if (result.status === status_constants_1.EVENT_STATUS.SCHEDULED) {
                const shouldRun = await this.autoJobTrackingService.tryRunToday(tenantId, jobName, timezoneOffset);
                if (shouldRun) {
                    this.runCreateBusSchedule(result._id, rootTenantId, tenantId, timezoneOffset);
                }
            }
        }
        catch (err) {
        }
        return result;
    }
    async delete(id, tenantId) {
        const result = await this.busScheduleAutogeneratorModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async searchBusScheduleAutogenerator(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const pipeline = await this.buildQuerySearchBusScheduleAutogenerator(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
        const busSchedules = await this.busScheduleAutogeneratorModel.aggregate(pipeline).exec();
        const totalItem = await this.busScheduleAutogeneratorModel.countDocuments({ tenantId }).lean().exec();
        const result = (0, class_transformer_1.plainToInstance)(bus_schedule_autogenerator_dto_1.BusScheduleAutogeneratorDto, busSchedules.map((busType) => busType));
        return {
            pageIdx,
            busScheduleAutoGenerators: result,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchBusScheduleAutogenerator(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
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
    async generateSchedulesForToday(tenantId, timezoneOffset) {
        const now = new Date();
        const localTime = new Date(now.getTime() + timezoneOffset);
        const todayDate = new Date(localTime.getFullYear(), localTime.getMonth(), localTime.getDate());
        const todayStart = new Date(todayDate.getTime());
        const todayEnd = new Date(todayDate.getTime() + 24 * 60 * 60 * 1000 - 1);
        const query = {
            tenantId,
            status: 'scheduled',
            startDate: { $lte: todayEnd },
            $or: [{ endDate: { $exists: false } }, { endDate: null }, { endDate: { $gte: todayStart } }],
        };
        const busScheduleAutogeneratorsModel = await this.busScheduleAutogeneratorModel.find(query).lean().exec();
        const busScheduleAutogenerators = busScheduleAutogeneratorsModel.map((busScheduleAutogenerator) => (0, class_transformer_1.plainToInstance)(bus_schedule_autogenerator_dto_1.BusScheduleAutogeneratorDto, busScheduleAutogenerator));
        const rootTenantObjectId = (0, utils_1.toObjectId)(this.ROOT_TENANT_ID);
        for (const busScheduleAutogenerator of busScheduleAutogenerators) {
            if (this.isRunDay(busScheduleAutogenerator, todayDate) &&
                busScheduleAutogenerator.status === status_constants_1.EVENT_STATUS.SCHEDULED) {
                await this.runCreateBusSchedule(busScheduleAutogenerator._id, rootTenantObjectId, tenantId, timezoneOffset);
            }
        }
    }
    async runCreateBusSchedule(_id, rootTenantId, tenantId, timezoneOffset = 25200000) {
        const cutoffMs = await this.getCutoffMilliseconds(tenantId);
        const now = new Date();
        const localTime = new Date(now.getTime() + timezoneOffset);
        const todayDate = new Date(localTime.getFullYear(), localTime.getMonth(), localTime.getDate());
        const busScheduleAutogenerator = await this.findOne(_id, tenantId);
        if (busScheduleAutogenerator.status !== status_constants_1.EVENT_STATUS.SCHEDULED) {
            return false;
        }
        if (busScheduleAutogenerator.specificTimeSlots && busScheduleAutogenerator.specificTimeSlots.length > 0) {
            const busScheduleTemplate = await this.busScheduleTemplateService.findOne(busScheduleAutogenerator.busScheduleTemplateId, [rootTenantId, tenantId]);
            if (!busScheduleTemplate) {
                throw new common_1.NotFoundException(`Không tìm thấy lịch trình xe buýt với ID ${busScheduleAutogenerator.busScheduleTemplateId}`);
            }
            const busTemplate = await this.busTemplateService.findOne(busScheduleTemplate.busTemplateId, [
                rootTenantId,
                tenantId,
            ]);
            if (!busTemplate) {
                throw new common_1.NotFoundException(`Không tìm thấy mẫu xe buýt với ID ${busScheduleTemplate.busTemplateId}`);
            }
            let bus = null;
            if (busScheduleTemplate.busId) {
                bus = await this.busService.findOne(busScheduleTemplate.busId, tenantId);
            }
            const busStations = await this.busStationService.findAll([rootTenantId, tenantId]);
            if (!busStations) {
                throw new common_1.NotFoundException(`Không tìm thấy trạm xe buýt nào`);
            }
            const busProvinces = await this.busProvinceService.findAll([rootTenantId, tenantId]);
            if (!busProvinces) {
                throw new common_1.NotFoundException(`Không tìm thấy tỉnh xe buý nào`);
            }
            const busRoute = new create_bus_schedule_dto_1.CreateBusRouteScheduleDto();
            busRoute.name = busScheduleTemplate.busRoute.name;
            busRoute.distance = busScheduleTemplate.busRoute.distance;
            busRoute.distanceTime = busScheduleTemplate.busRoute.distanceTime;
            const scheduleDate = new Date(todayDate.getTime());
            scheduleDate.setDate(scheduleDate.getDate() + busScheduleAutogenerator.preGenerateDays);
            for (const specificTimeSlot of busScheduleAutogenerator.specificTimeSlots) {
                busRoute.breakPoints = [];
                for (const breakPoint of busScheduleTemplate.busRoute.breakPoints) {
                    const newBreakPoint = await this.createBreakPoint(breakPoint, busStations, busProvinces, specificTimeSlot, scheduleDate);
                    busRoute.breakPoints.push(newBreakPoint);
                }
                const { _id, name, busRouteId, busTemplateId, busDriverIds, busId, busSeatLayoutBlockIds, busSeatPrices } = busScheduleTemplate;
                const createBusScheduleDto = {
                    tenantId,
                    busScheduleNumber: this.generateBusScheduleNumber(),
                    name,
                    busRouteId,
                    busRoute: busRoute,
                    currentStationId: busRoute.breakPoints[0].busStationId,
                    busTemplateId,
                    busDriverIds,
                    busId,
                    busTemplate: {
                        ...busTemplate,
                        _id: busTemplate._id.toString(),
                        busType: {
                            ...busTemplate.busType,
                            _id: busTemplate.busType._id.toString(),
                        },
                        busServices: busTemplate.busServices?.map((service) => ({
                            ...service,
                            _id: service._id.toString(),
                        })),
                    },
                    busSeatPrices,
                    busSeatLayoutBlockIds: busSeatLayoutBlockIds,
                    startDate: busRoute.breakPoints[0].timeSchedule || '',
                    endDate: busRoute.breakPoints.at(-1)?.timeSchedule || '',
                    busScheduleTemplateId: _id,
                    busLayoutTemplateId: busTemplate.busLayoutTemplateId,
                };
                if (bus) {
                    createBusScheduleDto.bus = bus;
                }
                const now = new Date();
                const scheduleStartTime = new Date(createBusScheduleDto.startDate);
                const timeUntilStart = scheduleStartTime.getTime() - now.getTime();
                if (timeUntilStart < cutoffMs) {
                    continue;
                }
                await this.busScheduleService.create(createBusScheduleDto, rootTenantId, tenantId);
            }
            return true;
        }
        return false;
    }
    async createBreakPoint(breakPoint, busStations, busProvinces, specificTimeSlot, scheduleDate) {
        const busStation = (await busStations.find((busStation) => busStation._id.toString() === breakPoint.busStationId.toString()));
        const { name = '', detailAddress = '', location = '', provinceId = '', isOffice = false } = busStation;
        const province = (await busProvinces.find((busProvince) => busProvince._id.toString() === provinceId.toString()));
        const timeSchedule = this.calculateTimeSchedule(breakPoint.timeOffset, specificTimeSlot, scheduleDate);
        const busRouteBreakPoint = new create_bus_schedule_dto_1.CreateBusScheduleBreakPointsTimeDto();
        busRouteBreakPoint.busStationId = breakPoint.busStationId;
        busRouteBreakPoint.timeSchedule = timeSchedule;
        busRouteBreakPoint.name = name;
        busRouteBreakPoint.detailAddress = detailAddress;
        busRouteBreakPoint.location = location;
        busRouteBreakPoint.provinceId = provinceId || new mongoose_3.Types.ObjectId();
        busRouteBreakPoint.province = province;
        busRouteBreakPoint.isOffice = isOffice;
        return busRouteBreakPoint;
    }
    calculateTimeSchedule(offsetTime, specificTimeSlot, scheduleDate) {
        const baseDate = scheduleDate || new Date();
        const currentDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
        const [hours, minutes, seconds] = specificTimeSlot.timeSlot.split(':').map(Number);
        currentDate.setHours(hours);
        currentDate.setMinutes(minutes);
        currentDate.setSeconds(seconds);
        const match = offsetTime && offsetTime.match(/^(\d+)(h|m)?$/);
        if (!match) {
            return '';
        }
        const value = parseInt(match[1], 10);
        const unit = match[2] || 'h';
        let timeSchedule;
        if (unit === 'h') {
            timeSchedule = new Date(currentDate.getTime() + value * 3600000);
        }
        else if (unit === 'm') {
            timeSchedule = new Date(currentDate.getTime() + value * 60000);
        }
        else {
            throw new Error('Invalid unit. Only "h" (hours) or "m" (minutes) are supported.');
        }
        return timeSchedule.toISOString();
    }
    generateBusScheduleNumber() {
        return this.nanoid();
    }
    async getCutoffMilliseconds(tenantId) {
        try {
            const settingValue = await this.settingsService.findByName(setting_constants_1.SETTING_CONSTANTS.BUS_SCHEDULE_AVAILABILITY_CUTOFF, tenantId);
            if (settingValue?.value) {
                return (0, utils_1.parseTimeHmToMilliseconds)(settingValue.value);
            }
            return 60 * 60 * 1000;
        }
        catch {
            return 60 * 60 * 1000;
        }
    }
};
exports.BusScheduleAutogeneratorService = BusScheduleAutogeneratorService;
exports.BusScheduleAutogeneratorService = BusScheduleAutogeneratorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_schedule_autogenerator_schema_1.BusScheduleAutogeneratorDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_schedule_template_service_1.BusScheduleTemplateService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_schedule_service_1.BusScheduleService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_template_service_1.BusTemplateService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_service_1.BusService))),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_route_service_1.BusRouteService))),
    __param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_station_service_1.BusStationService))),
    __param(7, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_province_service_1.BusProvinceService))),
    __param(8, (0, common_1.Inject)((0, common_1.forwardRef)(() => auto_job_tracking_1.AutoJobTrackingService))),
    __param(9, (0, common_1.Inject)((0, common_1.forwardRef)(() => settings_service_1.SettingsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_schedule_template_service_1.BusScheduleTemplateService,
        bus_schedule_service_1.BusScheduleService,
        bus_template_service_1.BusTemplateService,
        bus_service_1.BusService,
        bus_route_service_1.BusRouteService,
        bus_station_service_1.BusStationService,
        bus_province_service_1.BusProvinceService,
        auto_job_tracking_1.AutoJobTrackingService,
        settings_service_1.SettingsService])
], BusScheduleAutogeneratorService);
//# sourceMappingURL=bus-schedule-autogenerator.service.js.map