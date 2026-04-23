import { Model, Types } from 'mongoose';
import { StatsQueryDto, StatsResponseDto } from '../dto/report-stats.dto';
import { ChartStatsQueryDto, ChartStatsResponseDto } from '../dto/report-chart-stats.dto';
import { GoodsDetailQueryDto } from '../dto/report-details.dto';
import { TrackingDocument } from '../../tracking/schema/tracking.schema';
import { GoodsDocument } from '../../goods/goods/schema/goods.schema';
import { ReportComparisonHelperService } from '../helpers/report-comparison-helper.service';
import { ReportDateHelperService } from '../helpers/report-date-helper.service';
import { ReportChartHelperService } from '../helpers/report-chart-helper.service';
export declare class ReportGoodsService {
    private readonly trackingModel;
    private readonly goodsModel;
    private readonly comparisonHelper;
    private readonly dateHelper;
    private readonly chartHelper;
    constructor(trackingModel: Model<TrackingDocument>, goodsModel: Model<GoodsDocument>, comparisonHelper: ReportComparisonHelperService, dateHelper: ReportDateHelperService, chartHelper: ReportChartHelperService);
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
}
