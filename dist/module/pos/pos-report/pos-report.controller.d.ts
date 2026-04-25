import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { StatsQueryDto } from '@/module/core/report/dto/report-stats.dto';
import { ChartStatsQueryDto } from '@/module/core/report/dto/report-chart-stats.dto';
import { PaymentMethodStatsQueryDto } from '@/module/core/report/dto/report-payment-method-stats.dto';
import { ReportService } from '@/module/core/report/report.service';
import { TopRoutesQueryDto } from '@/module/core/report/dto/report-top-routes.dto';
import { Types } from 'mongoose';
import { ScheduleReportQueryDto } from '@/module/core/report/dto/schedule-report-detail.dto';
export declare class PosReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    getBookingStats(query: StatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("@/module/core/report/dto/report-stats.dto").StatsResponseDto>;
    getBookingChartStats(query: ChartStatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("@/module/core/report/dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getRevenueBookingStats(query: StatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("@/module/core/report/dto/report-stats.dto").StatsResponseDto>;
    getRevenueBookingChartStats(query: ChartStatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("@/module/core/report/dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getScheduleStats(query: StatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("@/module/core/report/dto/report-stats.dto").StatsResponseDto>;
    getScheduleChartStats(query: ChartStatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("@/module/core/report/dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getGoodsStats(query: StatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("@/module/core/report/dto/report-stats.dto").StatsResponseDto>;
    getGoodsChartStats(query: ChartStatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("@/module/core/report/dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getRevenueGoodsStats(query: StatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("@/module/core/report/dto/report-stats.dto").StatsResponseDto>;
    getRevenueGoodsChartStats(query: ChartStatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("@/module/core/report/dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getPaymentMethodStats(query: PaymentMethodStatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("@/module/core/report/dto/report-payment-method-stats.dto").PaymentMethodStatsResponseDto>;
    getTopRoutes(query: TopRoutesQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("@/module/core/report/dto/report-top-routes.dto").TopRoutesResponseDto>;
    getScheduleReportDetail(busScheduleId: Types.ObjectId, query: ScheduleReportQueryDto, user: any): Promise<import("@/module/core/report/dto/schedule-report-detail.dto").ScheduleReportDetailDto>;
}
