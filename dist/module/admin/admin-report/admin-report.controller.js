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
exports.AdminReportController = void 0;
const common_1 = require("@nestjs/common");
const report_service_1 = require("../../core/report/report.service");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const timezone_decorator_1 = require("../../../decorators/timezone.decorator");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const report_stats_dto_1 = require("../../core/report/dto/report-stats.dto");
const report_chart_stats_dto_1 = require("../../core/report/dto/report-chart-stats.dto");
const report_payment_method_stats_dto_1 = require("../../core/report/dto/report-payment-method-stats.dto");
const report_top_routes_dto_1 = require("../../core/report/dto/report-top-routes.dto");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let AdminReportController = class AdminReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async getBookingStats(query, user, timezoneOffset) {
        const { tenantId } = user;
        return this.reportService.getBookingStats({
            startDate: new Date(query.startDate),
            endDate: new Date(query.endDate),
            comparisonStartDate: query.comparisonStartDate ? new Date(query.comparisonStartDate) : undefined,
            comparisonEndDate: query.comparisonEndDate ? new Date(query.comparisonEndDate) : undefined,
            platform: query.platform,
            comparisonMode: query.comparisonMode,
        }, tenantId, timezoneOffset);
    }
    async getBookingChartStats(query, user, timezoneOffset) {
        const { tenantId } = user;
        return this.reportService.getBookingChartStats({
            startDate: new Date(query.startDate),
            endDate: new Date(query.endDate),
            comparisonStartDate: query.comparisonStartDate ? new Date(query.comparisonStartDate) : undefined,
            comparisonEndDate: query.comparisonEndDate ? new Date(query.comparisonEndDate) : undefined,
            comparisonMode: query.comparisonMode,
            platform: query.platform,
        }, tenantId, timezoneOffset);
    }
    async getRevenueBookingStats(query, user, timezoneOffset) {
        const { tenantId } = user;
        return this.reportService.getRevenueBookingStats({
            startDate: new Date(query.startDate),
            endDate: new Date(query.endDate),
            comparisonStartDate: query.comparisonStartDate ? new Date(query.comparisonStartDate) : undefined,
            comparisonEndDate: query.comparisonEndDate ? new Date(query.comparisonEndDate) : undefined,
            comparisonMode: query.comparisonMode,
            platform: query.platform,
        }, tenantId, timezoneOffset);
    }
    async getRevenueBookingChartStats(query, user, timezoneOffset) {
        const { tenantId } = user;
        return this.reportService.getRevenueBookingChartStats({
            startDate: new Date(query.startDate),
            endDate: new Date(query.endDate),
            comparisonMode: query.comparisonMode,
            platform: query.platform,
        }, tenantId, timezoneOffset);
    }
    async getScheduleStats(query, user, timezoneOffset) {
        const { tenantId } = user;
        return this.reportService.getScheduleStats({
            startDate: new Date(query.startDate),
            endDate: new Date(query.endDate),
            comparisonStartDate: query.comparisonStartDate ? new Date(query.comparisonStartDate) : undefined,
            comparisonEndDate: query.comparisonEndDate ? new Date(query.comparisonEndDate) : undefined,
            platform: query.platform,
            comparisonMode: query.comparisonMode,
        }, tenantId, timezoneOffset);
    }
    async getScheduleChartStats(query, user, timezoneOffset) {
        const { tenantId } = user;
        return this.reportService.getScheduleChartStats({
            startDate: new Date(query.startDate),
            endDate: new Date(query.endDate),
            comparisonMode: query.comparisonMode,
            platform: query.platform,
        }, tenantId, timezoneOffset);
    }
    async getGoodsStats(query, user, timezoneOffset) {
        const { tenantId } = user;
        return this.reportService.getGoodsStats({
            startDate: new Date(query.startDate),
            endDate: new Date(query.endDate),
            comparisonStartDate: query.comparisonStartDate ? new Date(query.comparisonStartDate) : undefined,
            comparisonEndDate: query.comparisonEndDate ? new Date(query.comparisonEndDate) : undefined,
            platform: query.platform,
            comparisonMode: query.comparisonMode,
        }, tenantId, timezoneOffset);
    }
    async getGoodsChartStats(query, user, timezoneOffset) {
        const { tenantId } = user;
        return this.reportService.getGoodsChartStats({
            startDate: new Date(query.startDate),
            endDate: new Date(query.endDate),
            comparisonMode: query.comparisonMode,
            platform: query.platform,
        }, tenantId, timezoneOffset);
    }
    async getRevenueGoodsStats(query, user, timezoneOffset) {
        const { tenantId } = user;
        return this.reportService.getRevenueGoodsStats({
            startDate: new Date(query.startDate),
            endDate: new Date(query.endDate),
            comparisonStartDate: query.comparisonStartDate ? new Date(query.comparisonStartDate) : undefined,
            comparisonEndDate: query.comparisonEndDate ? new Date(query.comparisonEndDate) : undefined,
            comparisonMode: query.comparisonMode,
            platform: query.platform,
        }, tenantId, timezoneOffset);
    }
    async getRevenueGoodsChartStats(query, user, timezoneOffset) {
        const { tenantId } = user;
        return this.reportService.getRevenueGoodsChartStats({
            startDate: new Date(query.startDate),
            endDate: new Date(query.endDate),
            comparisonMode: query.comparisonMode,
            platform: query.platform,
        }, tenantId, timezoneOffset);
    }
    async getPaymentMethodStats(query, user, timezoneOffset) {
        const { tenantId } = user;
        return this.reportService.getPaymentMethodStats({
            startDate: new Date(query.startDate),
            endDate: new Date(query.endDate),
            platform: query.platform,
        }, tenantId, timezoneOffset);
    }
    async getTopRoutes(query, user, timezoneOffset) {
        const { tenantId } = user;
        return this.reportService.getTopRoutesReport({
            startDate: new Date(query.startDate),
            endDate: new Date(query.endDate),
            platform: query.platform,
        }, tenantId, timezoneOffset);
    }
};
exports.AdminReportController = AdminReportController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('booking-stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_stats_dto_1.StatsQueryDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getBookingStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('booking-chart-stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_chart_stats_dto_1.ChartStatsQueryDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getBookingChartStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('revenue-booking-stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_stats_dto_1.StatsQueryDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getRevenueBookingStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('revenue-booking-chart-stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_chart_stats_dto_1.ChartStatsQueryDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getRevenueBookingChartStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('schedule-stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_stats_dto_1.StatsQueryDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getScheduleStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('schedule-chart-stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_chart_stats_dto_1.ChartStatsQueryDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getScheduleChartStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('goods-stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_stats_dto_1.StatsQueryDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getGoodsStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('goods-chart-stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_chart_stats_dto_1.ChartStatsQueryDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getGoodsChartStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('revenue-goods-stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_stats_dto_1.StatsQueryDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getRevenueGoodsStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('revenue-goods-chart-stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_chart_stats_dto_1.ChartStatsQueryDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getRevenueGoodsChartStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('payment-method-stats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_payment_method_stats_dto_1.PaymentMethodStatsQueryDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getPaymentMethodStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('top-routes'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(2, (0, timezone_decorator_1.TimezoneOffset)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_top_routes_dto_1.TopRoutesQueryDto,
        user_token_dto_1.UserTokenDto, Number]),
    __metadata("design:returntype", Promise)
], AdminReportController.prototype, "getTopRoutes", null);
exports.AdminReportController = AdminReportController = __decorate([
    (0, common_1.Controller)('admin/report'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], AdminReportController);
//# sourceMappingURL=admin-report.controller.js.map