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
exports.ReportBookingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tracking_types_1 = require("../../tracking/constants/tracking-types");
const tracking_schema_1 = require("../../tracking/schema/tracking.schema");
const booking_schema_1 = require("../../booking/schema/booking.schema");
const report_comparison_helper_service_1 = require("../helpers/report-comparison-helper.service");
const report_date_helper_service_1 = require("../helpers/report-date-helper.service");
const report_detail_helper_service_1 = require("../helpers/report-detail-helper.service");
const report_chart_helper_service_1 = require("../helpers/report-chart-helper.service");
let ReportBookingService = class ReportBookingService {
    constructor(trackingModel, bookingModel, comparisonHelper, dateHelper, detailHelper, chartHelper) {
        this.trackingModel = trackingModel;
        this.bookingModel = bookingModel;
        this.comparisonHelper = comparisonHelper;
        this.dateHelper = dateHelper;
        this.detailHelper = detailHelper;
        this.chartHelper = chartHelper;
    }
    async getBookingStats(query, tenantId, timezoneOffset) {
        const { startDate, endDate, comparisonStartDate, comparisonEndDate, platform, userId, comparisonMode } = query;
        const sd = new Date(startDate);
        const ed = new Date(endDate);
        console.log('[BookingStats] startDate type:', typeof startDate, '| value:', startDate);
        console.log('[BookingStats] endDate   type:', typeof endDate, '| value:', endDate);
        console.log('[BookingStats] sd instanceof Date:', sd instanceof Date, '| iso:', sd.toISOString());
        console.log('[BookingStats] ed instanceof Date:', ed instanceof Date, '| iso:', ed.toISOString());
        const comparisonDates = this.comparisonHelper.calculateComparisonDates(startDate, endDate, comparisonStartDate, comparisonEndDate, timezoneOffset);
        const currentFilter = {
            tenantId,
            type: tracking_types_1.TRACKING_TYPES.BOOKING_CREATED,
            createdAt: { $gte: startDate, $lte: endDate },
        };
        if (platform)
            currentFilter.platform = platform;
        if (userId)
            currentFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
        const compareFilter = {
            tenantId,
            type: tracking_types_1.TRACKING_TYPES.BOOKING_CREATED,
            createdAt: {
                $gte: comparisonDates.calculatedCompareStartDate,
                $lte: comparisonDates.calculatedCompareEndDate,
            },
        };
        if (platform)
            compareFilter.platform = platform;
        if (userId)
            compareFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
        console.log('[BookingStats] currentFilter.createdAt:', JSON.stringify(currentFilter.createdAt));
        const debugDocs = await this.trackingModel.find(currentFilter).select('createdAt metadata.totalTickets').limit(5).lean().exec();
        console.log('[BookingStats] matched docs (max 5):', JSON.stringify(debugDocs.map(d => ({ createdAt: d.createdAt, tickets: d.metadata?.totalTickets }))));
        const currentResult = await this.trackingModel
            .aggregate([
            { $match: currentFilter },
            { $group: { _id: null, total: { $sum: { $toInt: '$metadata.totalTickets' } } } },
        ])
            .exec();
        const currentCount = currentResult.length > 0 ? currentResult[0].total : 0;
        const compareResult = await this.trackingModel
            .aggregate([
            { $match: compareFilter },
            { $group: { _id: null, total: { $sum: { $toInt: '$metadata.totalTickets' } } } },
        ])
            .exec();
        const compareCount = compareResult.length > 0 ? compareResult[0].total : 0;
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
    async getBookingChartStats(query, tenantId, timezoneOffset) {
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
            type: tracking_types_1.TRACKING_TYPES.BOOKING_CREATED,
            createdAt: { $gte: startDate, $lte: endDate },
        };
        if (platform)
            currentFilter.platform = platform;
        if (userId)
            currentFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
        const currentData = await this.chartHelper.getChartData(this.trackingModel, currentFilter, startDate, endDate, finalGroupBy, timezoneOffset, 'createdAt', 'metadata.totalTickets');
        let previousData = undefined;
        if (comparisonMode && comparisonStartDate && comparisonEndDate) {
            const compareFilter = {
                tenantId,
                type: tracking_types_1.TRACKING_TYPES.BOOKING_CREATED,
                createdAt: { $gte: comparisonStartDate, $lte: comparisonEndDate },
            };
            if (platform)
                compareFilter.platform = platform;
            if (userId)
                compareFilter.createdBy = new mongoose_2.Types.ObjectId(userId);
            previousData = await this.chartHelper.getChartData(this.trackingModel, compareFilter, comparisonStartDate, comparisonEndDate, finalGroupBy, timezoneOffset, 'createdAt', 'metadata.totalTickets');
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
};
exports.ReportBookingService = ReportBookingService;
exports.ReportBookingService = ReportBookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tracking_schema_1.TrackingDocument.name)),
    __param(1, (0, mongoose_1.InjectModel)(booking_schema_1.BookingDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        report_comparison_helper_service_1.ReportComparisonHelperService,
        report_date_helper_service_1.ReportDateHelperService,
        report_detail_helper_service_1.ReportDetailHelperService,
        report_chart_helper_service_1.ReportChartHelperService])
], ReportBookingService);
//# sourceMappingURL=report-booking.service.js.map