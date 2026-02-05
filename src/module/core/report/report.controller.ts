import { Controller, UseGuards, Post, Get, Body, Param, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { TimezoneOffset } from '@/decorators/timezone.decorator';
import { Types } from 'mongoose';
import { StatsQueryDto } from './dto/report-stats.dto';
import { ChartStatsQueryDto } from './dto/report-chart-stats.dto';
import { PaymentMethodStatsQueryDto } from './dto/report-payment-method-stats.dto';
import { TopRoutesQueryDto } from './dto/report-top-routes.dto';
import {
  BookingDetailQueryDto,
  ScheduleDetailQueryDto,
  GoodsDetailQueryDto,
  PaymentDetailQueryDto,
} from './dto/report-details.dto';
import { ScheduleReportQueryDto } from './dto/schedule-report-detail.dto';

@Controller('report')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // ==================== Booking Reports ====================
  @Post('booking/stats')
  async getBookingStats(
    @Body() query: StatsQueryDto,
    @CurrentUser() user: any,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    return this.reportService.getBookingStats(query, new Types.ObjectId(user.tenantId), timezoneOffset);
  }

  @Post('booking/chart')
  async getBookingChartStats(
    @Body() query: ChartStatsQueryDto,
    @CurrentUser() user: any,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    return this.reportService.getBookingChartStats(query, new Types.ObjectId(user.tenantId), timezoneOffset);
  }

  // ==================== Schedule Reports ====================
  @Post('schedule/stats')
  async getScheduleStats(
    @Body() query: StatsQueryDto,
    @CurrentUser() user: any,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    return this.reportService.getScheduleStats(query, new Types.ObjectId(user.tenantId), timezoneOffset);
  }

  @Post('schedule/chart')
  async getScheduleChartStats(
    @Body() query: ChartStatsQueryDto,
    @CurrentUser() user: any,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    return this.reportService.getScheduleChartStats(query, new Types.ObjectId(user.tenantId), timezoneOffset);
  }

  @Post('schedule/details')
  async getScheduleDetailsByDate(
    @Body() query: ScheduleDetailQueryDto,
    @CurrentUser() user: any,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    return this.reportService.getScheduleDetailsByDate(query, new Types.ObjectId(user.tenantId), timezoneOffset);
  }

  @Post('schedule/top-routes')
  async getTopRoutesReport(
    @Body() query: TopRoutesQueryDto,
    @CurrentUser() user: any,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    return this.reportService.getTopRoutesReport(query, new Types.ObjectId(user.tenantId), timezoneOffset);
  }

  // ==================== Goods Reports ====================
  @Post('goods/stats')
  async getGoodsStats(
    @Body() query: StatsQueryDto,
    @CurrentUser() user: any,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    return this.reportService.getGoodsStats(query, new Types.ObjectId(user.tenantId), timezoneOffset);
  }

  @Post('goods/chart')
  async getGoodsChartStats(
    @Body() query: ChartStatsQueryDto,
    @CurrentUser() user: any,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    return this.reportService.getGoodsChartStats(query, new Types.ObjectId(user.tenantId), timezoneOffset);
  }

  @Post('goods/details')
  async getGoodsDetailsByDate(
    @Body() query: GoodsDetailQueryDto,
    @CurrentUser() user: any,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    return this.reportService.getGoodsDetailsByDate(query, new Types.ObjectId(user.tenantId), timezoneOffset);
  }

  // ==================== Payment/Revenue Reports ====================
  @Post('revenue/stats')
  async getRevenueStats(
    @Body() query: StatsQueryDto,
    @CurrentUser() user: any,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    return this.reportService.getRevenueBookingStats(query, new Types.ObjectId(user.tenantId), timezoneOffset);
  }

  @Post('revenue/chart')
  async getRevenueChartStats(
    @Body() query: ChartStatsQueryDto,
    @CurrentUser() user: any,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    return this.reportService.getRevenueBookingChartStats(query, new Types.ObjectId(user.tenantId), timezoneOffset);
  }

  @Post('payment/details')
  async getPaymentDetailsByDate(
    @Body() query: PaymentDetailQueryDto,
    @CurrentUser() user: any,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    return this.reportService.getPaymentDetailsByDate(query, new Types.ObjectId(user.tenantId), timezoneOffset);
  }

  @Post('payment/methods')
  async getPaymentMethodStats(
    @Body() query: PaymentMethodStatsQueryDto,
    @CurrentUser() user: any,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    return this.reportService.getPaymentMethodStats(query, new Types.ObjectId(user.tenantId), timezoneOffset);
  }
}
