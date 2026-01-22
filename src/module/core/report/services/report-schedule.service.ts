import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StatsQueryDto, StatsResponseDto } from '../dto/report-stats.dto';
import { ChartStatsQueryDto, ChartStatsResponseDto, ChartDataPointDto } from '../dto/report-chart-stats.dto';
import { ScheduleDetailQueryDto } from '../dto/report-details.dto';
import { TRACKING_TYPES } from '../../tracking/constants/tracking-types';
import { TrackingDocument } from '../../tracking/schema/tracking.schema';
import { BusScheduleDocument } from '../../bus/bus-schedule/schema/bus-schedule.schema';
import { ReportComparisonHelperService } from '../helpers/report-comparison-helper.service';
import { ReportDateHelperService } from '../helpers/report-date-helper.service';
import { ReportChartHelperService } from '../helpers/report-chart-helper.service';
import { TopRouteItemDto, TopRoutesQueryDto, TopRoutesResponseDto } from '../dto/report-top-routes.dto';
import { BusRouteDocument } from '../../bus/bus-route/schema/bus-route.schema';
import { toObjectId } from '@/utils/utils';

/**
 * Report Schedule Service - Xử lý TẤT CẢ logic liên quan đến báo cáo schedule
 * Bao gồm: Stats, Charts, Details
 */
@Injectable()
export class ReportScheduleService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(TrackingDocument.name)
    private readonly trackingModel: Model<TrackingDocument>,
    @InjectModel(BusScheduleDocument.name)
    private readonly busScheduleModel: Model<BusScheduleDocument>,
    @InjectModel(BusRouteDocument.name)
    private readonly busRouteModel: Model<BusRouteDocument>,
    private readonly comparisonHelper: ReportComparisonHelperService,
    private readonly dateHelper: ReportDateHelperService,
    private readonly chartHelper: ReportChartHelperService,
  ) {}

  // ==================== STATS ====================
  async getScheduleStats(
    query: StatsQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<StatsResponseDto> {
    const { startDate, endDate, comparisonStartDate, comparisonEndDate, platform, userId, comparisonMode } = query;

    const comparisonDates = this.comparisonHelper.calculateComparisonDates(
      startDate,
      endDate,
      comparisonStartDate,
      comparisonEndDate,
    );

    const currentFilter: any = {
      tenantId,
      type: TRACKING_TYPES.SCHEDULE_CREATED,
      createdAt: { $gte: startDate, $lte: endDate },
    };
    if (platform) currentFilter.platform = platform;
    if (userId) currentFilter.createdBy = new Types.ObjectId(userId);

    const compareFilter: any = {
      tenantId,
      type: TRACKING_TYPES.SCHEDULE_CREATED,
      createdAt: {
        $gte: comparisonDates.calculatedCompareStartDate,
        $lte: comparisonDates.calculatedCompareEndDate,
      },
    };
    if (platform) compareFilter.platform = platform;
    if (userId) compareFilter.createdBy = new Types.ObjectId(userId);

    const currentCount = await this.trackingModel.countDocuments(currentFilter).exec();
    const compareCount = await this.trackingModel.countDocuments(compareFilter).exec();

    if (!comparisonMode) {
      return { value: currentCount, total: currentCount };
    }

    const comparisonResult = this.comparisonHelper.calculatePercentageChange(
      currentCount,
      compareCount,
      comparisonDates.compareText,
    );

    return {
      value: currentCount,
      total: currentCount,
      change: comparisonResult.change,
      changeType: comparisonResult.changeType,
      percentage: comparisonResult.percentage,
    };
  }

  // ==================== CHARTS ====================
  async getScheduleChartStats(
    query: ChartStatsQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<ChartStatsResponseDto> {
    const {
      startDate,
      endDate,
      comparisonMode,
      platform,
      userId,
      comparisonStartDate: customComparisonStartDate,
      comparisonEndDate: customComparisonEndDate,
    } = query;

    // Tự động xác định groupBy dựa vào range
    const isSameDay =
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getDate() === endDate.getDate();

    const finalGroupBy: 'hour' | 'day' = isSameDay ? 'hour' : 'day';

    let comparisonStartDate: Date | undefined;
    let comparisonEndDate: Date | undefined;

    if (comparisonMode) {
      if (customComparisonStartDate && customComparisonEndDate) {
        comparisonStartDate = new Date(customComparisonStartDate);
        comparisonEndDate = new Date(customComparisonEndDate);
      } else {
        comparisonEndDate = new Date(startDate.getTime() - 1);
        comparisonStartDate = new Date(comparisonEndDate.getTime() - (endDate.getTime() - startDate.getTime()));
      }
    }

    // Tạo match filter cho dữ liệu hiện tại
    const currentFilter: any = {
      tenantId,
      type: TRACKING_TYPES.SCHEDULE_CREATED,
      createdAt: { $gte: startDate, $lte: endDate },
    };
    if (platform) currentFilter.platform = platform;
    if (userId) currentFilter.createdBy = new Types.ObjectId(userId);

    // Lấy dữ liệu hiện tại
    const currentData = await this.chartHelper.getChartData(
      this.trackingModel,
      currentFilter,
      startDate,
      endDate,
      finalGroupBy,
      timezoneOffset,
    );

    let previousData: ChartDataPointDto | undefined = undefined;
    if (comparisonMode && comparisonStartDate && comparisonEndDate) {
      const compareFilter: any = {
        tenantId,
        type: TRACKING_TYPES.SCHEDULE_CREATED,
        createdAt: { $gte: comparisonStartDate, $lte: comparisonEndDate },
      };
      if (platform) compareFilter.platform = platform;
      if (userId) compareFilter.createdBy = new Types.ObjectId(userId);

      previousData = await this.chartHelper.getChartData(
        this.trackingModel,
        compareFilter,
        comparisonStartDate,
        comparisonEndDate,
        finalGroupBy,
        timezoneOffset,
      );
    }

    return {
      current: currentData,
      previous: previousData,
      metadata: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        comparisonStartDate: comparisonStartDate?.toISOString(),
        comparisonEndDate: comparisonEndDate?.toISOString(),
        groupBy: finalGroupBy,
      },
    };
  }

  // ==================== DETAILS ====================
  async getScheduleDetailsByDate(query: ScheduleDetailQueryDto, tenantId: Types.ObjectId, timezoneOffset: number) {
    const {
      startDate,
      endDate,
      pageIdx = 0,
      pageSize = 20,
      platform,
      userId,
      busRouteId,
      comparisonMode,
      comparisonStartDate,
      comparisonEndDate,
    } = query;

    const filter: any = {
      tenantId,
      startDate: {
        $gte: startDate.toISOString().split('T')[0],
        $lte: endDate.toISOString().split('T')[0],
      },
    };

    if (platform) filter.platform = platform;
    if (userId) filter.createdBy = new Types.ObjectId(userId);
    if (busRouteId) filter.busRouteId = new Types.ObjectId(busRouteId);

    // Tự động xác định groupBy dựa vào range
    const isSameDay =
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getDate() === endDate.getDate();

    const groupBy: 'hour' | 'day' = isSameDay ? 'hour' : 'day';

    // Count total trước khi phân trang
    const totalCount = await this.busScheduleModel.countDocuments(filter).exec();

    // Lấy dữ liệu hiện tại với pagination
    const skip = pageIdx * pageSize;
    const allSchedules = await this.busScheduleModel
      .find(filter)
      .populate('busRoute')
      .populate('bus')
      .populate('driver')
      .sort({ startDate: 1, departureTime: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec();

    const groups = this.chartHelper.groupDataByDate(
      allSchedules,
      startDate,
      endDate,
      groupBy,
      timezoneOffset,
      'startDate',
    );

    let comparisonGroups: any[] | undefined = undefined;
    let comparisonTotal: number | undefined = undefined;

    if (comparisonMode && comparisonStartDate && comparisonEndDate) {
      const compareFilter = {
        ...filter,
        startDate: {
          $gte: comparisonStartDate.toISOString().split('T')[0],
          $lte: comparisonEndDate.toISOString().split('T')[0],
        },
      };

      // Count comparison total
      comparisonTotal = await this.busScheduleModel.countDocuments(compareFilter).exec();

      const compareSchedules = await this.busScheduleModel
        .find(compareFilter)
        .populate('busRoute')
        .populate('bus')
        .populate('driver')
        .sort({ startDate: 1, departureTime: 1 })
        .skip(skip)
        .limit(pageSize)
        .lean()
        .exec();

      comparisonGroups = this.chartHelper.groupDataByDate(
        compareSchedules,
        comparisonStartDate,
        comparisonEndDate,
        groupBy,
        timezoneOffset,
        'startDate',
      );
    }

    return {
      groups,
      total: totalCount,
      pageIdx,
      pageSize,
      totalPage: Math.ceil(totalCount / pageSize),
      comparisonGroups,
      comparisonTotal,
      metadata: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        groupBy,
        comparisonStartDate: comparisonStartDate?.toISOString(),
        comparisonEndDate: comparisonEndDate?.toISOString(),
      },
    };
  }

  // ==================== TOP ROUTES REPORT ====================
  /**
   * Lấy báo cáo top 10 tuyến đường
   */
  async getTopRoutesReport(
    query: TopRoutesQueryDto,
    tenantId: Types.ObjectId,
    paymentType: string,
    timezoneOffset: number,
  ): Promise<TopRoutesResponseDto> {
    const { startDate, endDate, platform, userId } = query;

    const matchFilter: any = {
      tenantId,
      type: TRACKING_TYPES.BOOKING_CREATED,
      createdAt: { $gte: startDate, $lte: endDate },
    };
    if (platform) matchFilter.platform = platform;
    if (userId) matchFilter.createdBy = new Types.ObjectId(userId);

    const aggregateResult = await this.trackingModel
      .aggregate([
        { $match: matchFilter },
        { $group: { _id: '$metadata.busRouteId', ticketCount: { $sum: { $toInt: '$metadata.totalTickets' } } } },
        { $sort: { ticketCount: -1 } },
        { $limit: 10 },
      ])
      .exec();

    // Tính tổng số vé từ metadata.totalTickets
    const totalTicketsResult = await this.trackingModel
      .aggregate([
        { $match: matchFilter },
        { $group: { _id: null, total: { $sum: { $toInt: '$metadata.totalTickets' } } } },
      ])
      .exec();
    const totalTickets = totalTicketsResult.length > 0 ? totalTicketsResult[0].total : 0;

    const paymentFilter: any = {
      tenantId,
      type: paymentType,
      createdAt: { $gte: startDate, $lte: endDate },
    };
    if (platform) paymentFilter.platform = platform;
    if (userId) paymentFilter.createdBy = new Types.ObjectId(userId);

    // Map PAYMENT_PROCESSED với BOOKING_CREATED thông qua bookingId để lấy busRouteId
    const revenueByRoute = await this.trackingModel
      .aggregate([
        { $match: paymentFilter },
        {
          $lookup: {
            from: 'trackings',
            let: { bookingId: '$metadata.bookingId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$type', TRACKING_TYPES.BOOKING_CREATED] },
                      { $eq: ['$metadata.bookingId', '$$bookingId'] },
                    ],
                  },
                },
              },
            ],
            as: 'bookingTracking',
          },
        },
        { $unwind: { path: '$bookingTracking', preserveNullAndEmptyArrays: false } },
        {
          $group: {
            _id: '$bookingTracking.metadata.busRouteId',
            revenue: { $sum: { $toDouble: '$metadata.chargedAmount' } },
          },
        },
      ])
      .exec();

    const revenueMap = new Map<string, number>();
    let totalRevenue = 0;
    revenueByRoute.forEach((item) => {
      if (item._id) {
        revenueMap.set(item._id.toString(), item.revenue);
        totalRevenue += item.revenue;
      }
    });

    const data: TopRouteItemDto[] = await Promise.all(
      aggregateResult.map(async (item) => {
        let routeName = 'Không xác định';
        const routeId = item._id ? item._id.toString() : '';

        if (item._id) {
          try {
            const rootTenantObjectId = toObjectId(this.ROOT_TENANT_ID);
            const route = await this.busRouteModel.findOne({
              _id: item._id,
              tenantId: { $in: [tenantId, rootTenantObjectId] },
            });
            if (route) {
              routeName = route.name;
            }
          } catch (error) {
            // Keep default name
          }
        }

        const percentage = totalTickets > 0 ? Number(((item.ticketCount / totalTickets) * 100).toFixed(1)) : 0;
        const revenue = revenueMap.get(routeId) || 0;

        return {
          routeId,
          routeName,
          ticketCount: item.ticketCount,
          percentage,
          revenue,
        };
      }),
    );

    return {
      data,
      total: totalTickets,
      totalRevenue,
      metadata: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    };
  }
}
