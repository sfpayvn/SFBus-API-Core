import { Types } from 'mongoose';
import { StatsQueryDto, StatsResponseDto } from './dto/report-stats.dto';
import { ChartStatsQueryDto, ChartStatsResponseDto } from './dto/report-chart-stats.dto';
import { PaymentMethodStatsQueryDto, PaymentMethodStatsResponseDto } from './dto/report-payment-method-stats.dto';
import { TopRoutesQueryDto, TopRoutesResponseDto } from './dto/report-top-routes.dto';
import { ScheduleDetailQueryDto, GoodsDetailQueryDto, PaymentDetailQueryDto } from './dto/report-details.dto';
import { ScheduleReportDetailDto, ScheduleReportQueryDto } from './dto/schedule-report-detail.dto';
import { ReportBookingService } from './services/report-booking.service';
import { ReportGoodsService } from './services/report-goods.service';
import { ReportPaymentService } from './services/report-payment.service';
import { ReportScheduleService } from './services/report-schedule.service';
export declare class ReportService {
    private readonly reportBookingService;
    private readonly reportScheduleService;
    private readonly reportGoodsService;
    private readonly reportPaymentService;
    constructor(reportBookingService: ReportBookingService, reportScheduleService: ReportScheduleService, reportGoodsService: ReportGoodsService, reportPaymentService: ReportPaymentService);
    getBookingStats(query: StatsQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<StatsResponseDto>;
    getBookingChartStats(query: ChartStatsQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<ChartStatsResponseDto>;
    getScheduleStats(query: StatsQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<StatsResponseDto>;
    getScheduleChartStats(query: ChartStatsQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<ChartStatsResponseDto>;
    getScheduleDetailsByDate(query: ScheduleDetailQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<{
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
    getRevenueGoodsStats(query: StatsQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<StatsResponseDto>;
    getRevenueGoodsChartStats(query: ChartStatsQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<ChartStatsResponseDto>;
    getGoodsStats(query: StatsQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<StatsResponseDto>;
    getGoodsChartStats(query: ChartStatsQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<ChartStatsResponseDto>;
    getGoodsDetailsByDate(query: GoodsDetailQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<{
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
    getRevenueBookingStats(query: StatsQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<StatsResponseDto>;
    getRevenueBookingChartStats(query: ChartStatsQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<ChartStatsResponseDto>;
    getPaymentDetailsByDate(query: PaymentDetailQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<{
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
    getPaymentMethodStats(query: PaymentMethodStatsQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<PaymentMethodStatsResponseDto>;
    getTopRoutesReport(query: TopRoutesQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<TopRoutesResponseDto>;
    getScheduleReportDetail(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId, query?: ScheduleReportQueryDto): Promise<ScheduleReportDetailDto>;
}
