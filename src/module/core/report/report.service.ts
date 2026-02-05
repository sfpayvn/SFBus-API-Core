import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { StatsQueryDto, StatsResponseDto } from './dto/report-stats.dto';
import { ChartStatsQueryDto, ChartStatsResponseDto } from './dto/report-chart-stats.dto';
import { PaymentMethodStatsQueryDto, PaymentMethodStatsResponseDto } from './dto/report-payment-method-stats.dto';
import { TopRoutesQueryDto, TopRoutesResponseDto } from './dto/report-top-routes.dto';
import {
  BookingDetailQueryDto,
  ScheduleDetailQueryDto,
  GoodsDetailQueryDto,
  PaymentDetailQueryDto,
} from './dto/report-details.dto';
import { ScheduleReportDetailDto, ScheduleReportQueryDto } from './dto/schedule-report-detail.dto';
import { ReportBookingService } from './services/report-booking.service';
import { ReportGoodsService } from './services/report-goods.service';
import { ReportPaymentService } from './services/report-payment.service';
import { ReportScheduleService } from './services/report-schedule.service';
import { TRACKING_TYPES } from '../tracking/constants/tracking-types';

/**
 * Main Report Service - Orchestrates all reporting functionality
 * Mỗi module service chứa đầy đủ logic của module đó (stats, charts, details):
 * - ReportBookingService: Tất cả logic về booking reports
 * - ReportScheduleService: Tất cả logic về schedule reports
 * - ReportGoodsService: Tất cả logic về goods reports
 * - ReportPaymentService: Tất cả logic về payment/revenue reports + specialized reports
 */
@Injectable()
export class ReportService {
  constructor(
    private readonly reportBookingService: ReportBookingService,
    private readonly reportScheduleService: ReportScheduleService,
    private readonly reportGoodsService: ReportGoodsService,
    private readonly reportPaymentService: ReportPaymentService,
  ) {}

  // ==================== Booking ====================
  async getBookingStats(
    query: StatsQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<StatsResponseDto> {
    return this.reportBookingService.getBookingStats(query, tenantId, timezoneOffset);
  }

  async getBookingChartStats(
    query: ChartStatsQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<ChartStatsResponseDto> {
    return this.reportBookingService.getBookingChartStats(query, tenantId, timezoneOffset);
  }

  // ==================== Schedule ====================
  async getScheduleStats(
    query: StatsQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<StatsResponseDto> {
    return this.reportScheduleService.getScheduleStats(query, tenantId, timezoneOffset);
  }

  async getScheduleChartStats(
    query: ChartStatsQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<ChartStatsResponseDto> {
    return this.reportScheduleService.getScheduleChartStats(query, tenantId, timezoneOffset);
  }

  async getScheduleDetailsByDate(query: ScheduleDetailQueryDto, tenantId: Types.ObjectId, timezoneOffset: number) {
    return this.reportScheduleService.getScheduleDetailsByDate(query, tenantId, timezoneOffset);
  }

  // ==================== Goods ====================
  async getGoodsStats(
    query: StatsQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<StatsResponseDto> {
    return this.reportGoodsService.getGoodsStats(query, tenantId, timezoneOffset);
  }

  async getGoodsChartStats(
    query: ChartStatsQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<ChartStatsResponseDto> {
    return this.reportGoodsService.getGoodsChartStats(query, tenantId, timezoneOffset);
  }

  async getGoodsDetailsByDate(query: GoodsDetailQueryDto, tenantId: Types.ObjectId, timezoneOffset: number) {
    return this.reportGoodsService.getGoodsDetailsByDate(query, tenantId, timezoneOffset);
  }

  // ==================== Payment/Revenue ====================
  // Revenue từ booking
  async getRevenueBookingStats(
    query: StatsQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<StatsResponseDto> {
    return this.reportPaymentService.getRevenueStats(
      query,
      tenantId,
      TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED,
      timezoneOffset,
    );
  }

  async getRevenueBookingChartStats(
    query: ChartStatsQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<ChartStatsResponseDto> {
    return this.reportPaymentService.getRevenueChartStats(
      query,
      tenantId,
      TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED,
      timezoneOffset,
    );
  }

  async getPaymentDetailsByDate(query: PaymentDetailQueryDto, tenantId: Types.ObjectId, timezoneOffset: number) {
    return this.reportPaymentService.getPaymentDetailsByDate(query, tenantId, timezoneOffset);
  }

  // ==================== Payment/Revenue from Goods ====================
  // Revenue từ goods
  async getRevenueGoodsStats(
    query: StatsQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<StatsResponseDto> {
    return this.reportPaymentService.getRevenueStats(
      query,
      tenantId,
      TRACKING_TYPES.PAYMENT_GOODS_PROCESSED,
      timezoneOffset,
    );
  }

  async getRevenueGoodsChartStats(
    query: ChartStatsQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<ChartStatsResponseDto> {
    return this.reportPaymentService.getRevenueChartStats(
      query,
      tenantId,
      TRACKING_TYPES.PAYMENT_GOODS_PROCESSED,
      timezoneOffset,
    );
  }

  // ==================== Specialized Reports ====================
  async getPaymentMethodStats(
    query: PaymentMethodStatsQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<PaymentMethodStatsResponseDto> {
    return this.reportPaymentService.getPaymentMethodStats(
      query,
      tenantId,
      TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED,
      timezoneOffset,
    );
  }

  async getTopRoutesReport(
    query: TopRoutesQueryDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<TopRoutesResponseDto> {
    return this.reportScheduleService.getTopRoutesReport(
      query,
      tenantId,
      TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED,
      timezoneOffset,
    );
  }

  // ==================== Schedule Detail Report ====================
  async getScheduleReportDetail(
    busScheduleId: Types.ObjectId,
    tenantId: Types.ObjectId,
    query?: ScheduleReportQueryDto,
  ): Promise<ScheduleReportDetailDto> {
    return this.reportScheduleService.getScheduleReportDetail(busScheduleId, tenantId, query);
  }
}
