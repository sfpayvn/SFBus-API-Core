import { Model, Types } from 'mongoose';
import { StatsQueryDto, StatsResponseDto } from '../dto/report-stats.dto';
import { ChartStatsQueryDto, ChartStatsResponseDto } from '../dto/report-chart-stats.dto';
import { ScheduleDetailQueryDto } from '../dto/report-details.dto';
import { ScheduleReportDetailDto, ScheduleReportQueryDto } from '../dto/schedule-report-detail.dto';
import { TrackingDocument } from '../../tracking/schema/tracking.schema';
import { BusScheduleDocument } from '../../bus/bus-schedule/schema/bus-schedule.schema';
import { BookingDocument } from '../../booking/schema/booking.schema';
import { GoodsDocument } from '../../goods/goods/schema/goods.schema';
import { PaymentDocument } from '../../payment/schema/payment.schema';
import { ReportComparisonHelperService } from '../helpers/report-comparison-helper.service';
import { ReportDateHelperService } from '../helpers/report-date-helper.service';
import { ReportChartHelperService } from '../helpers/report-chart-helper.service';
import { TopRoutesQueryDto, TopRoutesResponseDto } from '../dto/report-top-routes.dto';
import { BusRouteDocument } from '../../bus/bus-route/schema/bus-route.schema';
import { BusScheduleLayoutDocument } from '../../bus/bus-schedule-layout/schema/bus-schedule-layout.schema';
export declare class ReportScheduleService {
    private readonly trackingModel;
    private readonly busScheduleModel;
    private readonly busRouteModel;
    private readonly bookingModel;
    private readonly goodsModel;
    private readonly paymentModel;
    private readonly comparisonHelper;
    private readonly dateHelper;
    private readonly chartHelper;
    private readonly busScheduleLayoutModel;
    ROOT_TENANT_ID: string;
    constructor(trackingModel: Model<TrackingDocument>, busScheduleModel: Model<BusScheduleDocument>, busRouteModel: Model<BusRouteDocument>, bookingModel: Model<BookingDocument>, goodsModel: Model<GoodsDocument>, paymentModel: Model<PaymentDocument>, comparisonHelper: ReportComparisonHelperService, dateHelper: ReportDateHelperService, chartHelper: ReportChartHelperService, busScheduleLayoutModel: Model<BusScheduleLayoutDocument>);
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
    getTopRoutesReport(query: TopRoutesQueryDto, tenantId: Types.ObjectId, paymentType: string, timezoneOffset: number): Promise<TopRoutesResponseDto>;
    getScheduleReportDetail(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId, query?: ScheduleReportQueryDto): Promise<ScheduleReportDetailDto>;
    private calculateScheduleStats;
    private formatBookings;
    private formatGoods;
}
