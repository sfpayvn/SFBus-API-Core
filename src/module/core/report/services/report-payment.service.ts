import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StatsQueryDto, StatsResponseDto } from '../dto/report-stats.dto';
import { ChartStatsQueryDto, ChartStatsResponseDto, ChartDataPointDto } from '../dto/report-chart-stats.dto';
import { PaymentMethodStatsQueryDto, PaymentMethodStatsResponseDto } from '../dto/report-payment-method-stats.dto';
import { TopRoutesQueryDto, TopRoutesResponseDto, TopRouteItemDto } from '../dto/report-top-routes.dto';
import { PaymentDetailQueryDto } from '../dto/report-details.dto';
import { TRACKING_TYPES } from '../../tracking/constants/tracking-types';
import { TrackingDocument } from '../../tracking/schema/tracking.schema';
import { PaymentDocument } from '../../payment/schema/payment.schema';
import { PaymentMethodDocument } from '../../payment-method/schema/payment-method.schema';
import { BusRouteDocument } from '../../bus/bus-route/schema/bus-route.schema';
import { toObjectId } from '@/utils/utils';
import { ReportComparisonHelperService } from '../helpers/report-comparison-helper.service';
import { ReportDateHelperService } from '../helpers/report-date-helper.service';
import { ReportChartHelperService } from '../helpers/report-chart-helper.service';

/**
 * Report Payment Service - Xử lý TẤT CẢ logic liên quan đến báo cáo payment/revenue
 * Bao gồm: Revenue Stats, Revenue Charts, Payment Method Stats, Top Routes, Payment Details
 */
@Injectable()
export class ReportPaymentService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(TrackingDocument.name)
    private readonly trackingModel: Model<TrackingDocument>,
    @InjectModel(PaymentDocument.name)
    private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel(PaymentMethodDocument.name)
    private readonly paymentMethodModel: Model<PaymentMethodDocument>,
    @InjectModel(BusRouteDocument.name)
    private readonly busRouteModel: Model<BusRouteDocument>,
    private readonly comparisonHelper: ReportComparisonHelperService,
    private readonly dateHelper: ReportDateHelperService,
    private readonly chartHelper: ReportChartHelperService,
  ) {}

  // ==================== REVENUE STATS ====================
  /**
   * Lấy thống kê doanh thu với so sánh phần trăm thay đổi
   */
  async getRevenueStats(
    query: StatsQueryDto,
    tenantId: Types.ObjectId,
    paymentType: string,
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
      type: paymentType,
      createdAt: { $gte: startDate, $lte: endDate },
    };
    if (platform) currentFilter.platform = platform;
    if (userId) currentFilter.createdBy = new Types.ObjectId(userId);

    const compareFilter: any = {
      tenantId,
      type: paymentType,
      createdAt: {
        $gte: comparisonDates.calculatedCompareStartDate,
        $lte: comparisonDates.calculatedCompareEndDate,
      },
    };
    if (platform) compareFilter.platform = platform;
    if (userId) compareFilter.createdBy = new Types.ObjectId(userId);

    const currentRevenue = await this.calculateRevenue(currentFilter);
    const compareRevenue = await this.calculateRevenue(compareFilter);

    if (!comparisonMode) {
      return { value: currentRevenue, total: currentRevenue };
    }

    const comparisonResult = this.comparisonHelper.calculatePercentageChange(
      currentRevenue,
      compareRevenue,
      comparisonDates.compareText,
    );

    return {
      value: currentRevenue,
      total: currentRevenue,
      change: comparisonResult.change,
      changeType: comparisonResult.changeType,
      percentage: comparisonResult.percentage,
    };
  }

  // ==================== REVENUE CHARTS ====================
  /**
   * Lấy thống kê biểu đồ doanh thu theo thời gian
   */
  async getRevenueChartStats(
    query: ChartStatsQueryDto,
    tenantId: Types.ObjectId,
    paymentType: string,
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
      type: paymentType,
      createdAt: { $gte: startDate, $lte: endDate },
    };
    if (platform) currentFilter.platform = platform;
    if (userId) currentFilter.createdBy = new Types.ObjectId(userId);

    const currentData = await this.chartHelper.getChartData(
      this.trackingModel,
      currentFilter,
      startDate,
      endDate,
      finalGroupBy,
      timezoneOffset,
      'createdAt',
      'metadata.chargedAmount', // Sum số vé từ metadata
    );

    let previousData: ChartDataPointDto | undefined = undefined;
    if (comparisonMode && comparisonStartDate && comparisonEndDate) {
      const compareFilter: any = {
        tenantId,
        type: paymentType,
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
        'metadata.chargedAmount', // Sum số vé từ metadata
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

  /**
   * Lấy thống kê phương thức thanh toán
   */
  async getPaymentMethodStats(
    query: PaymentMethodStatsQueryDto,
    tenantId: Types.ObjectId,
    paymentType: string,
    timezoneOffset: number,
  ): Promise<PaymentMethodStatsResponseDto> {
    const { startDate, endDate, platform, userId } = query;

    const matchFilter: any = {
      tenantId,
      type: paymentType,
      createdAt: { $gte: startDate, $lte: endDate },
    };
    if (platform) matchFilter.platform = platform;
    if (userId) matchFilter.createdBy = new Types.ObjectId(userId);

    const aggregateResult = await this.trackingModel
      .aggregate([
        { $match: matchFilter },
        { $group: { _id: '$metadata.paymentMethodId', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .exec();

    const total = aggregateResult.reduce((sum, item) => sum + item.count, 0);

    const data = await Promise.all(
      aggregateResult.map(async (item) => {
        let methodName = 'Không xác định';

        if (item._id) {
          try {
            const rootTenantObjectId = toObjectId(this.ROOT_TENANT_ID);
            const paymentMethod = await this.paymentMethodModel
              .findOne({ _id: item._id, tenantId: { $in: [tenantId, rootTenantObjectId] } })
              .exec();
            if (paymentMethod) {
              methodName = paymentMethod.name;
            }
          } catch (error) {
            // Keep default name
          }
        }

        const percentage = total > 0 ? Number(((item.count / total) * 100).toFixed(1)) : 0;

        return {
          method: methodName,
          count: item.count,
          percentage,
        };
      }),
    );

    return {
      data,
      total,
      metadata: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    };
  }

  // ==================== PAYMENT DETAILS ====================
  /**
   * Lấy chi tiết payment theo ngày (tự động xác định groupBy dựa vào range)
   * - Cùng ngày: group by giờ
   * - Khác ngày: group by ngày
   */
  async getPaymentDetailsByDate(query: PaymentDetailQueryDto, tenantId: Types.ObjectId, timezoneOffset: number) {
    const {
      startDate,
      endDate,
      pageIdx = 0,
      pageSize = 20,
      platform,
      userId,
      paymentMethodId,
      comparisonMode,
      comparisonStartDate,
      comparisonEndDate,
    } = query;

    const filter: any = {
      tenantId,
      createdAt: { $gte: startDate, $lte: endDate },
    };

    if (platform) filter.platform = platform;
    if (userId) filter.userId = new Types.ObjectId(userId);
    if (paymentMethodId) filter.paymentMethodId = new Types.ObjectId(paymentMethodId);

    // Tự động xác định groupBy dựa vào range
    const isSameDay =
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getDate() === endDate.getDate();

    const groupBy: 'hour' | 'day' = isSameDay ? 'hour' : 'day';

    // Count total trước khi phân trang
    const totalCount = await this.paymentModel.countDocuments(filter).exec();

    // Lấy dữ liệu hiện tại với pagination
    const skip = pageIdx * pageSize;
    const allPayments = await this.paymentModel
      .find(filter)
      .populate('booking')
      .populate('paymentMethod')
      .populate('user')
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec();

    const groups = this.chartHelper.groupDataByDate(allPayments, startDate, endDate, groupBy, timezoneOffset);

    let comparisonGroups: any[] | undefined = undefined;
    let comparisonTotal: number | undefined = undefined;

    if (comparisonMode && comparisonStartDate && comparisonEndDate) {
      const compareFilter = { ...filter, createdAt: { $gte: comparisonStartDate, $lte: comparisonEndDate } };

      // Count comparison total
      comparisonTotal = await this.paymentModel.countDocuments(compareFilter).exec();

      const comparePayments = await this.paymentModel
        .find(compareFilter)
        .populate('booking')
        .populate('paymentMethod')
        .populate('user')
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(pageSize)
        .lean()
        .exec();

      comparisonGroups = this.chartHelper.groupDataByDate(
        comparePayments,
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

  // ==================== HELPER METHODS ====================
  /**
   * Tính tổng doanh thu từ tracking metadata
   */
  private async calculateRevenue(filter: any): Promise<number> {
    const result = await this.trackingModel
      .aggregate([
        { $match: filter },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: { $toDouble: '$metadata.chargedAmount' } },
          },
        },
      ])
      .exec();

    return result.length > 0 ? result[0].totalRevenue : 0;
  }
}
