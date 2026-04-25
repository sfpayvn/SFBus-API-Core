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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const report_service_1 = require("./report.service");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const timezone_decorator_1 = require("../../../decorators/timezone.decorator");
const mongoose_1 = require("mongoose");
const report_stats_dto_1 = require("./dto/report-stats.dto");
const report_chart_stats_dto_1 = require("./dto/report-chart-stats.dto");
const report_payment_method_stats_dto_1 = require("./dto/report-payment-method-stats.dto");
const report_top_routes_dto_1 = require("./dto/report-top-routes.dto");
const report_details_dto_1 = require("./dto/report-details.dto");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async getBookingStats(query, user, timezoneOffset) {
        return this.reportService.getBookingStats(query, new mongoose_1.Types.ObjectId(user.tenantId), timezoneOffset);
    }
    async getBookingChartStats(query, user, timezoneOffset) {
        return this.reportService.getBookingChartStats(query, new mongoose_1.Types.ObjectId(user.tenantId), timezoneOffset);
    }
    async getScheduleStats(query, user, timezoneOffset) {
        return this.reportService.getScheduleStats(query, new mongoose_1.Types.ObjectId(user.tenantId), timezoneOffset);
    }
    async getScheduleChartStats(query, user, timezoneOffset) {
        return this.reportService.getScheduleChartStats(query, new mongoose_1.Types.ObjectId(user.tenantId), timezoneOffset);
    }
    async getScheduleDetailsByDate(query, user, timezoneOffset) {
        return this.reportService.getScheduleDetailsByDate(query, new mongoose_1.Types.ObjectId(user.tenantId), timezoneOffset);
    }
    async getTopRoutesReport(query, user, timezoneOffset) {
        return this.reportService.getTopRoutesReport(query, new mongoose_1.Types.ObjectId(user.tenantId), timezoneOffset);
    }
    async getGoodsStats(query, user, timezoneOffset) {
        return this.reportService.getGoodsStats(query, new mongoose_1.Types.ObjectId(user.tenantId), timezoneOffset);
    }
    async getGoodsChartStats(query, user, timezoneOffset) {
        return this.reportService.getGoodsChartStats(query, new mongoose_1.Types.ObjectId(user.tenantId), timezoneOffset);
    }
    async getGoodsDetailsByDate(query, user, timezoneOffset) {
        return this.reportService.getGoodsDetailsByDate(query, new mongoose_1.Types.ObjectId(user.tenantId), timezoneOffset);
    }
    async getRevenueStats(query, user, timezoneOffset) {
        return this.reportService.getRevenueBookingStats(query, new mongoose_1.Types.ObjectId(user.tenantId), timezoneOffset);
    }
    async getRevenueChartStats(query, user, timezoneOffset) {
        return this.reportService.getRevenueBookingChartStats(query, new mongoose_1.Types.ObjectId(user.tenantId), timezoneOffset);
    }
    async getPaymentDetailsByDate(query, user, timezoneOffset) {
        return this.reportService.getPaymentDetailsByDate(query, new mongoose_1.Types.ObjectId(user.tenantId), timezoneOffset);
    }
    async getPaymentMethodStats(query, user, timezoneOffset) {
        return this.reportService.getPaymentMethodStats(query, new mongoose_1.Types.ObjectId(user.tenantId), timezoneOffset);
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Post)('booking/stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_stats_dto_1.StatsQueryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getBookingStats", null);
__decorate([
    (0, common_1.Post)('booking/chart'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_chart_stats_dto_1.ChartStatsQueryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getBookingChartStats", null);
__decorate([
    (0, common_1.Post)('schedule/stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_stats_dto_1.StatsQueryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getScheduleStats", null);
__decorate([
    (0, common_1.Post)('schedule/chart'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_chart_stats_dto_1.ChartStatsQueryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getScheduleChartStats", null);
__decorate([
    (0, common_1.Post)('schedule/details'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_details_dto_1.ScheduleDetailQueryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getScheduleDetailsByDate", null);
__decorate([
    (0, common_1.Post)('schedule/top-routes'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_top_routes_dto_1.TopRoutesQueryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getTopRoutesReport", null);
__decorate([
    (0, common_1.Post)('goods/stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_stats_dto_1.StatsQueryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getGoodsStats", null);
__decorate([
    (0, common_1.Post)('goods/chart'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_chart_stats_dto_1.ChartStatsQueryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getGoodsChartStats", null);
__decorate([
    (0, common_1.Post)('goods/details'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_details_dto_1.GoodsDetailQueryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getGoodsDetailsByDate", null);
__decorate([
    (0, common_1.Post)('revenue/stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_stats_dto_1.StatsQueryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getRevenueStats", null);
__decorate([
    (0, common_1.Post)('revenue/chart'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_chart_stats_dto_1.ChartStatsQueryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getRevenueChartStats", null);
__decorate([
    (0, common_1.Post)('payment/details'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_details_dto_1.PaymentDetailQueryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getPaymentDetailsByDate", null);
__decorate([
    (0, common_1.Post)('payment/methods'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_payment_method_stats_dto_1.PaymentMethodStatsQueryDto, Object, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getPaymentMethodStats", null);
exports.ReportController = ReportController = __decorate([
    (0, common_1.Controller)('report'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map