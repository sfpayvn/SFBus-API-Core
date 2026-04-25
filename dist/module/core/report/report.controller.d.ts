import { ReportService } from './report.service';
import { StatsQueryDto } from './dto/report-stats.dto';
import { ChartStatsQueryDto } from './dto/report-chart-stats.dto';
import { PaymentMethodStatsQueryDto } from './dto/report-payment-method-stats.dto';
import { TopRoutesQueryDto } from './dto/report-top-routes.dto';
import { ScheduleDetailQueryDto, GoodsDetailQueryDto, PaymentDetailQueryDto } from './dto/report-details.dto';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    getBookingStats(query: StatsQueryDto, user: any, timezoneOffset: number): Promise<import("./dto/report-stats.dto").StatsResponseDto>;
    getBookingChartStats(query: ChartStatsQueryDto, user: any, timezoneOffset: number): Promise<import("./dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getScheduleStats(query: StatsQueryDto, user: any, timezoneOffset: number): Promise<import("./dto/report-stats.dto").StatsResponseDto>;
    getScheduleChartStats(query: ChartStatsQueryDto, user: any, timezoneOffset: number): Promise<import("./dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getScheduleDetailsByDate(query: ScheduleDetailQueryDto, user: any, timezoneOffset: number): Promise<{
        groups: {
            label: string;
            date: string;
            count: number;
            data: any[];
        }[];
        total: number;
        pageIdx: number;
        pageSize: number;
        totalPage: number;
        comparisonGroups: any[] | undefined;
        comparisonTotal: number | undefined;
        metadata: {
            startDate: string;
            endDate: string;
            groupBy: "day" | "hour";
            comparisonStartDate: string | undefined;
            comparisonEndDate: string | undefined;
        };
    }>;
    getTopRoutesReport(query: TopRoutesQueryDto, user: any, timezoneOffset: number): Promise<import("./dto/report-top-routes.dto").TopRoutesResponseDto>;
    getGoodsStats(query: StatsQueryDto, user: any, timezoneOffset: number): Promise<import("./dto/report-stats.dto").StatsResponseDto>;
    getGoodsChartStats(query: ChartStatsQueryDto, user: any, timezoneOffset: number): Promise<import("./dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getGoodsDetailsByDate(query: GoodsDetailQueryDto, user: any, timezoneOffset: number): Promise<{
        groups: {
            label: string;
            date: string;
            count: number;
            data: any[];
        }[];
        total: number;
        pageIdx: number;
        pageSize: number;
        totalPage: number;
        comparisonGroups: any[] | undefined;
        comparisonTotal: number | undefined;
        metadata: {
            startDate: string;
            endDate: string;
            groupBy: "day" | "hour";
            comparisonStartDate: string | undefined;
            comparisonEndDate: string | undefined;
        };
    }>;
    getRevenueStats(query: StatsQueryDto, user: any, timezoneOffset: number): Promise<import("./dto/report-stats.dto").StatsResponseDto>;
    getRevenueChartStats(query: ChartStatsQueryDto, user: any, timezoneOffset: number): Promise<import("./dto/report-chart-stats.dto").ChartStatsResponseDto>;
    getPaymentDetailsByDate(query: PaymentDetailQueryDto, user: any, timezoneOffset: number): Promise<{
        groups: {
            label: string;
            date: string;
            count: number;
            data: any[];
        }[];
        total: number;
        pageIdx: number;
        pageSize: number;
        totalPage: number;
        comparisonGroups: any[] | undefined;
        comparisonTotal: number | undefined;
        metadata: {
            startDate: string;
            endDate: string;
            groupBy: "day" | "hour";
            comparisonStartDate: string | undefined;
            comparisonEndDate: string | undefined;
        };
    }>;
    getPaymentMethodStats(query: PaymentMethodStatsQueryDto, user: any, timezoneOffset: number): Promise<import("./dto/report-payment-method-stats.dto").PaymentMethodStatsResponseDto>;
}
