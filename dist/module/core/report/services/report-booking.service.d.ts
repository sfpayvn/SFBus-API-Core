import { Model, Types } from 'mongoose';
import { StatsQueryDto, StatsResponseDto } from '../dto/report-stats.dto';
import { ChartStatsQueryDto, ChartStatsResponseDto } from '../dto/report-chart-stats.dto';
import { TrackingDocument } from '../../tracking/schema/tracking.schema';
import { BookingDocument } from '../../booking/schema/booking.schema';
import { ReportComparisonHelperService } from '../helpers/report-comparison-helper.service';
import { ReportDateHelperService } from '../helpers/report-date-helper.service';
import { ReportDetailHelperService } from '../helpers/report-detail-helper.service';
import { ReportChartHelperService } from '../helpers/report-chart-helper.service';
export declare class ReportBookingService {
    private readonly trackingModel;
    private readonly bookingModel;
    private readonly comparisonHelper;
    private readonly dateHelper;
    private readonly detailHelper;
    private readonly chartHelper;
    constructor(trackingModel: Model<TrackingDocument>, bookingModel: Model<BookingDocument>, comparisonHelper: ReportComparisonHelperService, dateHelper: ReportDateHelperService, detailHelper: ReportDetailHelperService, chartHelper: ReportChartHelperService);
    getBookingStats(query: StatsQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<StatsResponseDto>;
    getBookingChartStats(query: ChartStatsQueryDto, tenantId: Types.ObjectId, timezoneOffset: number): Promise<ChartStatsResponseDto>;
}
