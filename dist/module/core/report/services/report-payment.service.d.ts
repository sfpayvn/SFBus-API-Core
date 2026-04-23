import { Model, Types } from 'mongoose';
import { StatsQueryDto, StatsResponseDto } from '../dto/report-stats.dto';
import { ChartStatsQueryDto, ChartStatsResponseDto } from '../dto/report-chart-stats.dto';
import { PaymentMethodStatsQueryDto, PaymentMethodStatsResponseDto } from '../dto/report-payment-method-stats.dto';
import { PaymentDetailQueryDto } from '../dto/report-details.dto';
import { TrackingDocument } from '../../tracking/schema/tracking.schema';
import { PaymentDocument } from '../../payment/schema/payment.schema';
import { PaymentMethodDocument } from '../../payment-method/schema/payment-method.schema';
import { BusRouteDocument } from '../../bus/bus-route/schema/bus-route.schema';
import { ReportComparisonHelperService } from '../helpers/report-comparison-helper.service';
import { ReportDateHelperService } from '../helpers/report-date-helper.service';
import { ReportChartHelperService } from '../helpers/report-chart-helper.service';
export declare class ReportPaymentService {
    private readonly trackingModel;
    private readonly paymentModel;
    private readonly paymentMethodModel;
    private readonly busRouteModel;
    private readonly comparisonHelper;
    private readonly dateHelper;
    private readonly chartHelper;
    ROOT_TENANT_ID: string;
    constructor(trackingModel: Model<TrackingDocument>, paymentModel: Model<PaymentDocument>, paymentMethodModel: Model<PaymentMethodDocument>, busRouteModel: Model<BusRouteDocument>, comparisonHelper: ReportComparisonHelperService, dateHelper: ReportDateHelperService, chartHelper: ReportChartHelperService);
    getRevenueStats(query: StatsQueryDto, tenantId: Types.ObjectId, paymentType: string, timezoneOffset: number): Promise<StatsResponseDto>;
    getRevenueChartStats(query: ChartStatsQueryDto, tenantId: Types.ObjectId, paymentType: string, timezoneOffset: number): Promise<ChartStatsResponseDto>;
    getPaymentMethodStats(query: PaymentMethodStatsQueryDto, tenantId: Types.ObjectId, paymentType: string, timezoneOffset: number): Promise<PaymentMethodStatsResponseDto>;
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
    private calculateRevenue;
}
