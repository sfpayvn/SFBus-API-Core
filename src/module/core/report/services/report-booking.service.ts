import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StatsQueryDto, StatsResponseDto } from '../dto/report-stats.dto';
import { ChartStatsQueryDto, ChartStatsResponseDto, ChartDataPointDto } from '../dto/report-chart-stats.dto';
import { BookingDetailQueryDto } from '../dto/report-details.dto';
import { TRACKING_TYPES } from '../../tracking/constants/tracking-types';
import { TrackingDocument } from '../../tracking/schema/tracking.schema';
import { BookingDocument } from '../../booking/schema/booking.schema';
import { ReportComparisonHelperService } from '../helpers/report-comparison-helper.service';
import { ReportDateHelperService } from '../helpers/report-date-helper.service';
import { ReportDetailHelperService } from '../helpers/report-detail-helper.service';
import { ReportChartHelperService } from '../helpers/report-chart-helper.service';

/**
 * Report Booking Service - Xử lý TẤT CẢ logic liên quan đến báo cáo booking
 * Bao gồm: Stats, Charts, Details
 */
@Injectable()
export class ReportBookingService {
  constructor(
    @InjectModel(TrackingDocument.name)
    private readonly trackingModel: Model<TrackingDocument>,
    @InjectModel(BookingDocument.name)
    private readonly bookingModel: Model<BookingDocument>,
    private readonly comparisonHelper: ReportComparisonHelperService,
    private readonly dateHelper: ReportDateHelperService,
    private readonly detailHelper: ReportDetailHelperService,
    private readonly chartHelper: ReportChartHelperService,
  ) {}

  // ==================== STATS ====================
  /**
   * Lấy thống kê booking với so sánh phần trăm thay đổi
   */
  async getBookingStats(
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
      type: TRACKING_TYPES.BOOKING_CREATED,
      createdAt: { $gte: startDate, $lte: endDate },
    };
    if (platform) currentFilter.platform = platform;
    if (userId) currentFilter.createdBy = new Types.ObjectId(userId);

    const compareFilter: any = {
      tenantId,
      type: TRACKING_TYPES.BOOKING_CREATED,
      createdAt: {
        $gte: comparisonDates.calculatedCompareStartDate,
        $lte: comparisonDates.calculatedCompareEndDate,
      },
    };
    if (platform) compareFilter.platform = platform;
    if (userId) compareFilter.createdBy = new Types.ObjectId(userId);

    // Tính tổng số vé từ metadata.totalTickets
    const currentResult = await this.trackingModel
      .aggregate([
        { $match: currentFilter },
        { $group: { _id: null, total: { $sum: { $toInt: '$metadata.totalTickets' } } } },
      ])
      .exec();
    const currentCount = currentResult.length > 0 ? currentResult[0].total : 0;

    const compareResult = await this.trackingModel
      .aggregate([
        { $match: compareFilter },
        { $group: { _id: null, total: { $sum: { $toInt: '$metadata.totalTickets' } } } },
      ])
      .exec();
    const compareCount = compareResult.length > 0 ? compareResult[0].total : 0;

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
  /**
   * Lấy thống kê biểu đồ booking theo thời gian
   */
  async getBookingChartStats(
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

    // Tính khoảng thời gian so sánh
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
      type: TRACKING_TYPES.BOOKING_CREATED,
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
      'metadata.totalTickets', // Sum số vé từ metadata
    );

    // Lấy dữ liệu so sánh
    let previousData: ChartDataPointDto | undefined = undefined;
    if (comparisonMode && comparisonStartDate && comparisonEndDate) {
      const compareFilter: any = {
        tenantId,
        type: TRACKING_TYPES.BOOKING_CREATED,
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
        'metadata.totalTickets', // Sum số vé từ metadata
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
}
