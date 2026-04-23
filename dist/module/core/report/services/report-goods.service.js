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
exports.ReportGoodsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tracking_types_1 = require("../../tracking/constants/tracking-types");
const tracking_schema_1 = require("../../tracking/schema/tracking.schema");
const goods_schema_1 = require("../../goods/goods/schema/goods.schema");
const report_comparison_helper_service_1 = require("../helpers/report-comparison-helper.service");
const report_date_helper_service_1 = require("../helpers/report-date-helper.service");
const report_chart_helper_service_1 = require("../helpers/report-chart-helper.service");
let ReportGoodsService = class ReportGoodsService {
    constructor(trackingModel, goodsModel, comparisonHelper, dateHelper, chartHelper) {
        this.trackingModel = trackingModel;
        this.goodsModel = goodsModel;
        this.comparisonHelper = comparisonHelper;
        this.dateHelper = dateHelper;
        this.chartHelper = chartHelper;
    }
    async getGoodsStats(query, tenantId, timezoneOffset) {
        const { startDate, endDate, comparisonStartDate, comparisonEndDate, platform, userId, comparisonMode } = query;
        const comparisonDates = this.comparisonHelper.calculateComparisonDates(startDate, endDate, comparisonStartDate, comparisonEndDate);
        const currentFilter = {
            tenantId,
            type: tracking_types_1.TRACKING_TYPES.GOODS_CREATED,
            createdAt: { $gte: startDate, $lte: endDate },
        };
        if (platform)
            currentFilter.platform = platform;
        if (userId)
            currentFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
        const compareFilter = {
            tenantId,
            type: tracking_types_1.TRACKING_TYPES.GOODS_CREATED,
            createdAt: {
                $gte: comparisonDates.calculatedCompareStartDate,
                $lte: comparisonDates.calculatedCompareEndDate,
            },
        };
        if (platform)
            compareFilter.platform = platform;
        if (userId)
            compareFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
        const currentCount = await this.trackingModel.countDocuments(currentFilter).exec();
        const compareCount = await this.trackingModel.countDocuments(compareFilter).exec();
        if (!comparisonMode) {
            return { value: currentCount, total: currentCount };
        }
        const comparisonResult = this.comparisonHelper.calculatePercentageChange(currentCount, compareCount, comparisonDates.compareText);
        return {
            value: currentCount,
            total: currentCount,
            change: comparisonResult.change,
            changeType: comparisonResult.changeType,
            percentage: comparisonResult.percentage,
        };
    }
    async getGoodsChartStats(query, tenantId, timezoneOffset) {
        const { startDate, endDate, comparisonMode, platform, userId, comparisonStartDate: customComparisonStartDate, comparisonEndDate: customComparisonEndDate, } = query;
        const _localStart = new Date(startDate.getTime() + timezoneOffset);
        const _localEnd = new Date(endDate.getTime() + timezoneOffset);
        const isSameDay = _localStart.getUTCFullYear() === _localEnd.getUTCFullYear() &&
            _localStart.getUTCMonth() === _localEnd.getUTCMonth() &&
            _localStart.getUTCDate() === _localEnd.getUTCDate();
        const finalGroupBy = isSameDay ? 'hour' : 'day';
        let comparisonStartDate;
        let comparisonEndDate;
        if (comparisonMode) {
            if (customComparisonStartDate && customComparisonEndDate) {
                comparisonStartDate = new Date(customComparisonStartDate);
                comparisonEndDate = new Date(customComparisonEndDate);
            }
            else {
                comparisonEndDate = new Date(startDate.getTime() - 1);
                comparisonStartDate = new Date(comparisonEndDate.getTime() - (endDate.getTime() - startDate.getTime()));
            }
        }
        const currentFilter = {
            tenantId,
            type: tracking_types_1.TRACKING_TYPES.GOODS_CREATED,
            createdAt: { $gte: startDate, $lte: endDate },
        };
        if (platform)
            currentFilter.platform = platform;
        if (userId)
            currentFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
        const currentData = await this.chartHelper.getChartData(this.trackingModel, currentFilter, startDate, endDate, finalGroupBy, timezoneOffset, 'createdAt');
        let previousData = undefined;
        if (comparisonMode && comparisonStartDate && comparisonEndDate) {
            const compareFilter = {
                tenantId,
                type: tracking_types_1.TRACKING_TYPES.GOODS_CREATED,
                createdAt: { $gte: comparisonStartDate, $lte: comparisonEndDate },
            };
            if (platform)
                compareFilter.platform = platform;
            if (userId)
                compareFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
            previousData = await this.chartHelper.getChartData(this.trackingModel, compareFilter, comparisonStartDate, comparisonEndDate, finalGroupBy, timezoneOffset, 'createdAt');
        }
        return {
            current: currentData,
            previous: previousData,
            metadata: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                comparisonStartDate: comparisonStartDate?.toISOString(),
                comparisonEndDate: comparisonEndDate?.toISOString(),
                groupBy: finalGroupBy,
            },
        };
    }
    async getGoodsDetailsByDate(query, tenantId, timezoneOffset) {
        const { startDate, endDate, pageIdx = 0, pageSize = 20, platform, userId, comparisonMode, comparisonStartDate, comparisonEndDate, } = query;
        const filter = {
            tenantId,
            createdAt: { $gte: startDate, $lte: endDate },
        };
        if (platform)
            filter.platform = platform;
        if (userId)
            filter.senderId = new mongoose_2.Types.ObjectId(userId);
        const _localStart = new Date(startDate.getTime() + timezoneOffset);
        const _localEnd = new Date(endDate.getTime() + timezoneOffset);
        const isSameDay = _localStart.getUTCFullYear() === _localEnd.getUTCFullYear() &&
            _localStart.getUTCMonth() === _localEnd.getUTCMonth() &&
            _localStart.getUTCDate() === _localEnd.getUTCDate();
        const groupBy = isSameDay ? 'hour' : 'day';
        const totalCount = await this.goodsModel.countDocuments(filter).exec();
        const skip = pageIdx * pageSize;
        const allGoods = await this.goodsModel
            .find(filter)
            .populate('busSchedule')
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(pageSize)
            .lean()
            .exec();
        const groups = this.chartHelper.groupDataByDate(allGoods, startDate, endDate, groupBy, timezoneOffset);
        let comparisonGroups = undefined;
        let comparisonTotal = undefined;
        if (comparisonMode && comparisonStartDate && comparisonEndDate) {
            const compareFilter = { ...filter, createdAt: { $gte: comparisonStartDate, $lte: comparisonEndDate } };
            comparisonTotal = await this.goodsModel.countDocuments(compareFilter).exec();
            const compareGoods = await this.goodsModel
                .find(compareFilter)
                .populate('busSchedule')
                .sort({ createdAt: 1 })
                .skip(skip)
                .limit(pageSize)
                .lean()
                .exec();
            comparisonGroups = this.chartHelper.groupDataByDate(compareGoods, comparisonStartDate, comparisonEndDate, groupBy, timezoneOffset);
        }
        return {
            groups,
            total: totalCount,
            pageIdx,
            pageSize,
            totalPage: Math.ceil(totalCount / pageSize),
            comparisonGroups,
            comparisonTotal,
            metadata: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                groupBy,
                comparisonStartDate: comparisonStartDate?.toISOString(),
                comparisonEndDate: comparisonEndDate?.toISOString(),
            },
        };
    }
};
exports.ReportGoodsService = ReportGoodsService;
exports.ReportGoodsService = ReportGoodsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tracking_schema_1.TrackingDocument.name)),
    __param(1, (0, mongoose_1.InjectModel)(goods_schema_1.GoodsDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        report_comparison_helper_service_1.ReportComparisonHelperService,
        report_date_helper_service_1.ReportDateHelperService,
        report_chart_helper_service_1.ReportChartHelperService])
], ReportGoodsService);
//# sourceMappingURL=report-goods.service.js.map