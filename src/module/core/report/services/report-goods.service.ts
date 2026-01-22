import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StatsQueryDto, StatsResponseDto } from '../dto/report-stats.dto';
import { ChartStatsQueryDto, ChartStatsResponseDto, ChartDataPointDto } from '../dto/report-chart-stats.dto';
import { GoodsDetailQueryDto } from '../dto/report-details.dto';
import { TRACKING_TYPES } from '../../tracking/constants/tracking-types';
import { TrackingDocument } from '../../tracking/schema/tracking.schema';
import { GoodsDocument } from '../../goods/goods/schema/goods.schema';
import { ReportComparisonHelperService } from '../helpers/report-comparison-helper.service';
import { ReportDateHelperService } from '../helpers/report-date-helper.service';
import { ReportChartHelperService } from '../helpers/report-chart-helper.service';

/**
 * Report Goods Service - Xử lý TẤT CẢ logic liên quan đến báo cáo goods
 * Bao gồm: Stats, Charts, Details
 */
@Injectable()
export class ReportGoodsService {
  constructor(
    @InjectModel(TrackingDocument.name)
    private readonly trackingModel: Model<TrackingDocument>,
    @InjectModel(GoodsDocument.name)
    private readonly goodsModel: Model<GoodsDocument>,
    private readonly comparisonHelper: ReportComparisonHelperService,
    private readonly dateHelper: ReportDateHelperService,
    private readonly chartHelper: ReportChartHelperService,
  ) {}

  // ==================== STATS ====================
  async getGoodsStats(
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
      type: TRACKING_TYPES.GOODS_CREATED,
      createdAt: { $gte: startDate, $lte: endDate },
    };
    if (platform) currentFilter.platform = platform;
    if (userId) currentFilter.createdBy = new Types.ObjectId(userId);

    const compareFilter: any = {
      tenantId,
      type: TRACKING_TYPES.GOODS_CREATED,
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
  async getGoodsChartStats(
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
      type: TRACKING_TYPES.GOODS_CREATED,
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
      'createdAt',
    );

    let previousData: ChartDataPointDto | undefined = undefined;
    if (comparisonMode && comparisonStartDate && comparisonEndDate) {
      const compareFilter: any = {
        tenantId,
        type: TRACKING_TYPES.GOODS_CREATED,
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
        'createdAt',
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
  async getGoodsDetailsByDate(query: GoodsDetailQueryDto, tenantId: Types.ObjectId, timezoneOffset: number) {
    const {
      startDate,
      endDate,
      pageIdx = 0,
      pageSize = 20,
      platform,
      userId,
      comparisonMode,
      comparisonStartDate,
      comparisonEndDate,
    } = query;

    const filter: any = {
      tenantId,
      createdAt: { $gte: startDate, $lte: endDate },
    };

    if (platform) filter.platform = platform;
    if (userId) filter.senderId = new Types.ObjectId(userId);

    // Tự động xác định groupBy dựa vào range
    const isSameDay =
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getDate() === endDate.getDate();

    const groupBy: 'hour' | 'day' = isSameDay ? 'hour' : 'day';

    // Count total trước khi phân trang
    const totalCount = await this.goodsModel.countDocuments(filter).exec();

    // Lấy dữ liệu hiện tại với pagination
    const skip = pageIdx * pageSize;
    const allGoods = await this.goodsModel
      .find(filter)
      .populate('busSchedule')
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec();

    const groups = this.chartHelper.groupDataByDate(allGoods, startDate, endDate, groupBy, timezoneOffset);

    let comparisonGroups: any[] | undefined = undefined;
    let comparisonTotal: number | undefined = undefined;

    if (comparisonMode && comparisonStartDate && comparisonEndDate) {
      const compareFilter = { ...filter, createdAt: { $gte: comparisonStartDate, $lte: comparisonEndDate } };

      // Count comparison total
      comparisonTotal = await this.goodsModel.countDocuments(compareFilter).exec();

      const compareGoods = await this.goodsModel
        .find(compareFilter)
        .populate('busSchedule')
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(pageSize)
        .lean()
        .exec();

      comparisonGroups = this.chartHelper.groupDataByDate(
        compareGoods,
        comparisonStartDate,
        comparisonEndDate,
        groupBy,
        timezoneOffset,
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
}
