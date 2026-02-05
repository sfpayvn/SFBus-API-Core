import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StatsQueryDto, StatsResponseDto } from '../dto/report-stats.dto';
import { ChartStatsQueryDto, ChartStatsResponseDto, ChartDataPointDto } from '../dto/report-chart-stats.dto';
import { ScheduleDetailQueryDto } from '../dto/report-details.dto';
import { ScheduleReportDetailDto, ScheduleReportQueryDto } from '../dto/schedule-report-detail.dto';
import { TRACKING_TYPES } from '../../tracking/constants/tracking-types';
import { TrackingDocument } from '../../tracking/schema/tracking.schema';
import { BusScheduleDocument } from '../../bus/bus-schedule/schema/bus-schedule.schema';
import { BookingDocument } from '../../booking/schema/booking.schema';
import { GoodsDocument } from '../../goods/goods/schema/goods.schema';
import { PaymentDocument } from '../../payment/schema/payment.schema';
import { ReportComparisonHelperService } from '../helpers/report-comparison-helper.service';
import { ReportDateHelperService } from '../helpers/report-date-helper.service';
import { ReportChartHelperService } from '../helpers/report-chart-helper.service';
import { TopRouteItemDto, TopRoutesQueryDto, TopRoutesResponseDto } from '../dto/report-top-routes.dto';
import { BusRouteDocument } from '../../bus/bus-route/schema/bus-route.schema';
import { toObjectId } from '@/utils/utils';
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/common/constants/status.constants';
import { BusScheduleLayoutDocument } from '../../bus/bus-schedule-layout/schema/bus-schedule-layout.schema';

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
    @InjectModel(BookingDocument.name)
    private readonly bookingModel: Model<BookingDocument>,
    @InjectModel(GoodsDocument.name)
    private readonly goodsModel: Model<GoodsDocument>,
    @InjectModel(PaymentDocument.name)
    private readonly paymentModel: Model<PaymentDocument>,
    private readonly comparisonHelper: ReportComparisonHelperService,
    private readonly dateHelper: ReportDateHelperService,
    private readonly chartHelper: ReportChartHelperService,

    @InjectModel(BusScheduleLayoutDocument.name)
    private readonly busScheduleLayoutModel: Model<BusScheduleLayoutDocument>,
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

  // ==================== SCHEDULE REPORT DETAIL ====================
  /**
   * Lấy chi tiết báo cáo cho một chuyến xe cụ thể
   * Bao gồm: Thông tin schedule, danh sách booking, danh sách hàng hóa, thống kê
   */
  async getScheduleReportDetail(
    busScheduleId: Types.ObjectId,
    tenantId: Types.ObjectId,
    query?: ScheduleReportQueryDto,
  ): Promise<ScheduleReportDetailDto> {
    const scheduleObjectId = new Types.ObjectId(busScheduleId);
    const includeBookings = query?.includeBookings !== false;
    const includeGoods = query?.includeGoods !== false;

    // Lấy thông tin schedule (không populate busId vì ref không được register)
    const schedule: any = await this.busScheduleModel
      .findOne({
        _id: scheduleObjectId,
        tenantId,
      })
      .lean()
      .exec();

    if (!schedule) {
      throw new Error(`Schedule với ID ${busScheduleId} không tồn tại`);
    }

    const busScheduleLayout = await this.busScheduleLayoutModel
      .findOne({
        busScheduleId: scheduleObjectId,
        tenantId,
      })
      .lean()
      .exec();

    // Lấy route details (với break points)
    const route: any = await this.busRouteModel.findById(schedule.busRouteId).lean().exec();

    let bookings: any[] = [];
    let goods: any[] = [];

    if (includeBookings) {
      bookings = await this.bookingModel
        .find({
          busScheduleId: scheduleObjectId,
          tenantId,
          status: { $ne: BOOKING_STATUS.CANCELLED },
        })
        .lean()
        .exec();
    }

    if (includeGoods) {
      goods = await this.goodsModel
        .find({
          busScheduleId: scheduleObjectId,
          tenantId,
        })
        .lean()
        .exec();
    }

    // Lấy dữ liệu payment cho các booking trong schedule này
    let payments: any[] = [];
    if (includeBookings && bookings.length > 0) {
      const bookingIds = bookings.map((b) => b._id);
      payments = await this.paymentModel
        .find({
          referrentId: { $in: bookingIds },
          tenantId,
          status: PAYMENT_STATUS.COMPLETED,
        })
        .lean()
        .exec();
    }

    // Lấy dữ liệu payment cho các goods trong schedule này
    let goodsPayments: any[] = [];
    if (includeGoods && goods.length > 0) {
      const goodsIds = goods.map((g) => g._id);
      goodsPayments = await this.paymentModel
        .find({
          referrentId: { $in: goodsIds },
          tenantId,
          status: { $in: [PAYMENT_STATUS.COMPLETED, PAYMENT_STATUS.REFUNDED] },
        })
        .lean()
        .exec();
    }

    // Xây dựng response
    const totalCapacity =
      busScheduleLayout?.seatLayouts?.reduce(
        (acc, layout) =>
          acc +
          (layout.seats.reduce((seatAcc, seat) => seatAcc + (seat.name && seat.status !== 'blocked' ? 1 : 0), 0) || 0),
        0,
      ) || 0; // Default capacity, có thể lấy từ bus configuration
    const stats = this.calculateScheduleStats(bookings, goods, payments, goodsPayments, totalCapacity);

    const tripDate =
      typeof schedule.startDate === 'string' ? new Date(schedule.startDate) : schedule.startDate || new Date();

    const report: ScheduleReportDetailDto = {
      // Schedule Info
      scheduleId: String(schedule._id),
      scheduleNumber: schedule.busScheduleNumber,
      scheduleName: schedule.name,
      tripDate,
      status: schedule.status,

      // Bus Info (busId is just ObjectId, no populated data)
      bus: undefined,

      // Route Info
      route: {
        _id: String(schedule.busRouteId),
        name: route?.name || 'N/A',
      },

      // Driver Info (drivers are just ObjectIds without population)
      drivers: [],

      // Seat Capacity
      totalCapacity,

      // Bookings
      bookings: this.formatBookings(bookings, route?.breakPoints),

      // Goods
      goods: this.formatGoods(goods, route?.breakPoints),

      // Stats
      stats,

      // Generation Info
      generatedAt: new Date(),
    };

    return report;
  }

  /**
   * Tính toán thống kê cho schedule report
   * Sử dụng dữ liệu từ payment records để tính totalRevenue và totalGoodsRevenue chính xác
   */
  private calculateScheduleStats(
    bookings: any[],
    goods: any[],
    payments: any[],
    goodsPayments: any[],
    totalCapacity: number,
  ) {
    let totalSeatsBooked = 0;
    let totalRevenue = 0; // Sẽ được tính từ payments
    let totalDiscount = 0;
    let totalItemsShipped = 0; // goods
    let totalShippingCost = 0;
    let totalCod = 0;

    // Process bookings
    bookings.forEach((booking: any) => {
      if (booking.bookingItems && booking.bookingItems.length > 0) {
        totalSeatsBooked += booking.quantity || booking.bookingItems.length;
        totalDiscount += booking.discountTotalAmount || 0;
      }
    });

    // Calculate totalRevenue từ payment records (chargedAmount là số tiền thực tế thu được)
    payments.forEach((payment: any) => {
      totalRevenue += payment.chargedAmount || payment.paymentAmount || 0;
    });

    // Process goods - tính toán thống kê giống booking
    goods.forEach((good: any) => {
      const quantity = good.quantity || 1;
      totalItemsShipped += quantity;
      totalShippingCost += good.shippingCost || 0;
      totalCod += good.cod || 0;
    });

    // Calculate totalGoodsRevenue từ payment records (chargedAmount là số tiền thực tế thu được)
    let totalGoodsRevenue = 0;

    goodsPayments.forEach((payment: any) => {
      totalGoodsRevenue += payment.chargedAmount || payment.paymentAmount || 0;
    });

    const occupancyRate = totalCapacity > 0 ? Math.round((totalSeatsBooked / totalCapacity) * 100) : 0;
    const netRevenue = totalRevenue - totalDiscount;

    // Goods stats: Giả sử tổng goods capacity là 100% (có thể điều chỉnh theo yêu cầu)
    const totalGoodsCapacity = goods.length > 0 ? Math.max(goods.length, totalItemsShipped) : 0;
    const shipmentRate = totalGoodsCapacity > 0 ? Math.round((totalItemsShipped / totalGoodsCapacity) * 100) : 0;
    const netGoodsRevenue = totalGoodsRevenue; // revenue ròng từ payment records

    return {
      booking: {
        totalBookings: bookings.length,
        totalSeatsBooked,
        totalSeatsAvailable: totalCapacity - totalSeatsBooked,
        occupancyRate,
        totalRevenue,
        totalDiscount,
        netRevenue,
      },
      goods: {
        totalGoods: goods.length,
        totalItemsShipped,
        totalItemsRemaining: totalGoodsCapacity - totalItemsShipped,
        shipmentRate,
        totalShippingCost,
        totalCod,
        totalGoodsRevenue,
        netGoodsRevenue,
      },
    };
  }

  /**
   * Format booking data cho report
   */
  private formatBookings(bookings: any[], breakPoints: any[] = []) {
    return bookings.map((booking: any) => {
      const bookingItems = (booking.bookingItems || []).map((item: any) => {
        const departureId = item.departure ? String(item.departure) : '';
        const destinationId = item.destination ? String(item.destination) : '';

        const departureStation = breakPoints?.find((bp: any) => String(bp.busStationId || bp._id) === departureId) || {
          busStationId: item.departure,
          name: 'N/A',
        };

        const destinationStation = breakPoints?.find(
          (bp: any) => String(bp.busStationId || bp._id) === destinationId,
        ) || { busStationId: item.destination, name: 'N/A' };

        return {
          bookingItemNumber: item.bookingItemNumber,
          seat: {
            seatId: (item.seat?._id as any)?.toString?.() || 'unknown',
            seatNumber: item.seat?.seatNumber || 0,
            seatName: item.seat?.name || 'N/A',
            seatType: (item.seat?.typeId as any)?.toString?.() || 'standard',
            status: item.seat?.status || 'booked',
            price: item.price || 0,
            discountAmount: item.discountAmount || 0,
            finalPrice: item.afterDiscountPrice || item.price || 0,
          },
          departureStation: {
            _id: String(departureStation.busStationId || departureStation._id || ''),
            name: departureStation.name,
          },
          destinationStation: {
            _id: String(destinationStation.busStationId || destinationStation._id || ''),
            name: destinationStation.name,
          },
          price: item.price || 0,
          discountAmount: item.discountAmount || 0,
          finalPrice: item.afterDiscountPrice || item.price || 0,
        };
      });

      return {
        bookingId: (booking._id as any)?.toString?.() || booking._id,
        bookingNumber: booking.bookingNumber,
        bookingGroupNumber: booking.bookingGroupNumber,
        status: booking.status,
        passenger: {
          name: booking.userInfo?.name || 'N/A',
          phoneNumber: booking.userInfo?.phoneNumber || 'N/A',
          email: booking.userInfo?.email || 'N/A',
        },
        quantity: booking.quantity || booking.bookingItems?.length || 0,
        bookingItems,
        totalPrice: booking.totalPrice || 0,
        discountTotalAmount: booking.discountTotalAmount || 0,
        afterDiscountTotalPrice: booking.afterDiscountTotalPrice || 0,
        paymentStatus: booking.status,
        paymentTime: booking.paymentTime,
        createdAt: booking.createdAt,
      };
    });
  }

  /**
   * Format goods data cho report
   */
  private formatGoods(goods: any[], breakPoints: any[] = []) {
    return goods.map((good: any) => {
      return {
        goodsId: (good._id as any)?.toString?.() || good._id,
        goodsNumber: good.goodsNumber,
        name: good.name,
        status: good.status,
        paymentStatus: good.paymentStatus,
        quantity: good.quantity || 0,
        weight: good.weight || 0,
        goodsValue: good.goodsValue || 0,
        shippingCost: good.shippingCost || 0,
        cod: good.cod || 0,
        sender: {
          name: good.senderName || 'N/A',
          phoneNumber: good.senderPhoneNumber || 'N/A',
        },
        customer: {
          name: good.customerName || 'N/A',
          phoneNumber: good.customerPhoneNumber || 'N/A',
        },
        note: good.note,
        createdAt: good.createdAt,
      };
    });
  }
}
