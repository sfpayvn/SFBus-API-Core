import { ReportService } from '../../core/report/report.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { StatsQueryDto } from '../../core/report/dto/report-stats.dto';
import { ChartStatsQueryDto } from '../../core/report/dto/report-chart-stats.dto';
import { PaymentMethodStatsQueryDto } from '../../core/report/dto/report-payment-method-stats.dto';
import { TopRoutesQueryDto } from '../../core/report/dto/report-top-routes.dto';
export declare class AdminReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    getBookingStats(query: StatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../core/report/dto/report-stats.dto").StatsResponseDto>;
    getBookingChartStats(query: ChartStatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../core/report/dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getRevenueBookingStats(query: StatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../core/report/dto/report-stats.dto").StatsResponseDto>;
    getRevenueBookingChartStats(query: ChartStatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../core/report/dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getScheduleStats(query: StatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../core/report/dto/report-stats.dto").StatsResponseDto>;
    getScheduleChartStats(query: ChartStatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../core/report/dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getGoodsStats(query: StatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../core/report/dto/report-stats.dto").StatsResponseDto>;
    getGoodsChartStats(query: ChartStatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../core/report/dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getRevenueGoodsStats(query: StatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../core/report/dto/report-stats.dto").StatsResponseDto>;
    getRevenueGoodsChartStats(query: ChartStatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../core/report/dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getPaymentMethodStats(query: PaymentMethodStatsQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../core/report/dto/report-payment-method-stats.dto").PaymentMethodStatsResponseDto>;
    getTopRoutes(query: TopRoutesQueryDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../core/report/dto/report-top-routes.dto").TopRoutesResponseDto>;
}
