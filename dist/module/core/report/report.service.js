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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const report_booking_service_1 = require("./services/report-booking.service");
const report_goods_service_1 = require("./services/report-goods.service");
const report_payment_service_1 = require("./services/report-payment.service");
const report_schedule_service_1 = require("./services/report-schedule.service");
const tracking_types_1 = require("../tracking/constants/tracking-types");
let ReportService = class ReportService {
    constructor(reportBookingService, reportScheduleService, reportGoodsService, reportPaymentService) {
        this.reportBookingService = reportBookingService;
        this.reportScheduleService = reportScheduleService;
        this.reportGoodsService = reportGoodsService;
        this.reportPaymentService = reportPaymentService;
    }
    async getBookingStats(query, tenantId, timezoneOffset) {
        return this.reportBookingService.getBookingStats(query, tenantId, timezoneOffset);
    }
    async getBookingChartStats(query, tenantId, timezoneOffset) {
        return this.reportBookingService.getBookingChartStats(query, tenantId, timezoneOffset);
    }
    async getScheduleStats(query, tenantId, timezoneOffset) {
        return this.reportScheduleService.getScheduleStats(query, tenantId, timezoneOffset);
    }
    async getScheduleChartStats(query, tenantId, timezoneOffset) {
        return this.reportScheduleService.getScheduleChartStats(query, tenantId, timezoneOffset);
    }
    async getScheduleDetailsByDate(query, tenantId, timezoneOffset) {
        return this.reportScheduleService.getScheduleDetailsByDate(query, tenantId, timezoneOffset);
    }
    async getRevenueGoodsStats(query, tenantId, timezoneOffset) {
        return this.reportPaymentService.getRevenueStats(query, tenantId, tracking_types_1.TRACKING_TYPES.PAYMENT_GOODS_PROCESSED, timezoneOffset);
    }
    async getRevenueGoodsChartStats(query, tenantId, timezoneOffset) {
        return this.reportPaymentService.getRevenueChartStats(query, tenantId, tracking_types_1.TRACKING_TYPES.PAYMENT_GOODS_PROCESSED, timezoneOffset);
    }
    async getGoodsStats(query, tenantId, timezoneOffset) {
        return this.reportGoodsService.getGoodsStats(query, tenantId, timezoneOffset);
    }
    async getGoodsChartStats(query, tenantId, timezoneOffset) {
        return this.reportGoodsService.getGoodsChartStats(query, tenantId, timezoneOffset);
    }
    async getGoodsDetailsByDate(query, tenantId, timezoneOffset) {
        return this.reportGoodsService.getGoodsDetailsByDate(query, tenantId, timezoneOffset);
    }
    async getRevenueBookingStats(query, tenantId, timezoneOffset) {
        return this.reportPaymentService.getRevenueStats(query, tenantId, tracking_types_1.TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED, timezoneOffset);
    }
    async getRevenueBookingChartStats(query, tenantId, timezoneOffset) {
        return this.reportPaymentService.getRevenueChartStats(query, tenantId, tracking_types_1.TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED, timezoneOffset);
    }
    async getPaymentDetailsByDate(query, tenantId, timezoneOffset) {
        return this.reportPaymentService.getPaymentDetailsByDate(query, tenantId, timezoneOffset);
    }
    async getPaymentMethodStats(query, tenantId, timezoneOffset) {
        return this.reportPaymentService.getPaymentMethodStats(query, tenantId, tracking_types_1.TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED, timezoneOffset);
    }
    async getTopRoutesReport(query, tenantId, timezoneOffset) {
        return this.reportScheduleService.getTopRoutesReport(query, tenantId, tracking_types_1.TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED, timezoneOffset);
    }
    async getScheduleReportDetail(busScheduleId, tenantId, query) {
        return this.reportScheduleService.getScheduleReportDetail(busScheduleId, tenantId, query);
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [report_booking_service_1.ReportBookingService,
        report_schedule_service_1.ReportScheduleService,
        report_goods_service_1.ReportGoodsService,
        report_payment_service_1.ReportPaymentService])
], ReportService);
//# sourceMappingURL=report.service.js.map