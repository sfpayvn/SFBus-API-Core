import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { ReportService } from '../../core/report/report.service';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { TimezoneOffset } from '@/decorators/timezone.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { StatsQueryDto } from '../../core/report/dto/report-stats.dto';
import { ChartStatsQueryDto } from '../../core/report/dto/report-chart-stats.dto';
import { PaymentMethodStatsQueryDto } from '../../core/report/dto/report-payment-method-stats.dto';
import { TopRoutesQueryDto } from '../../core/report/dto/report-top-routes.dto';
import {
  BookingDetailQueryDto,
  ScheduleDetailQueryDto,
  GoodsDetailQueryDto,
  PaymentDetailQueryDto,
} from '../../core/report/dto/report-details.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('admin/report')
export class AdminReportController {
  constructor(private readonly reportService: ReportService) {}

  // ==================== Booking Reports ====================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('booking-stats')
  async getBookingStats(
    @Body() query: StatsQueryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.reportService.getBookingStats(
      {
        startDate: new Date(query.startDate),
        endDate: new Date(query.endDate),
        comparisonStartDate: query.comparisonStartDate ? new Date(query.comparisonStartDate) : undefined,
        comparisonEndDate: query.comparisonEndDate ? new Date(query.comparisonEndDate) : undefined,
        platform: query.platform,
        comparisonMode: query.comparisonMode,
      },
      tenantId,
      timezoneOffset,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('booking-chart-stats')
  async getBookingChartStats(
    @Body() query: ChartStatsQueryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.reportService.getBookingChartStats(
      {
        startDate: new Date(query.startDate),
        endDate: new Date(query.endDate),
        comparisonStartDate: query.comparisonStartDate ? new Date(query.comparisonStartDate) : undefined,
        comparisonEndDate: query.comparisonEndDate ? new Date(query.comparisonEndDate) : undefined,
        comparisonMode: query.comparisonMode,
        platform: query.platform,
      },
      tenantId,
      timezoneOffset,
    );
  }

  // ==================== Revenue from Booking ====================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('revenue-booking-stats')
  async getRevenueBookingStats(
    @Body() query: StatsQueryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.reportService.getRevenueBookingStats(
      {
        startDate: new Date(query.startDate),
        endDate: new Date(query.endDate),
        comparisonStartDate: query.comparisonStartDate ? new Date(query.comparisonStartDate) : undefined,
        comparisonEndDate: query.comparisonEndDate ? new Date(query.comparisonEndDate) : undefined,
        comparisonMode: query.comparisonMode,
        platform: query.platform,
      },
      tenantId,
      timezoneOffset,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('revenue-booking-chart-stats')
  async getRevenueBookingChartStats(
    @Body() query: ChartStatsQueryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.reportService.getRevenueBookingChartStats(
      {
        startDate: new Date(query.startDate),
        endDate: new Date(query.endDate),
        comparisonMode: query.comparisonMode,
        platform: query.platform,
      },
      tenantId,
      timezoneOffset,
    );
  }

  // ==================== Schedule Reports ====================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('schedule-stats')
  async getScheduleStats(
    @Body() query: StatsQueryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.reportService.getScheduleStats(
      {
        startDate: new Date(query.startDate),
        endDate: new Date(query.endDate),
        comparisonStartDate: query.comparisonStartDate ? new Date(query.comparisonStartDate) : undefined,
        comparisonEndDate: query.comparisonEndDate ? new Date(query.comparisonEndDate) : undefined,
        platform: query.platform,
        comparisonMode: query.comparisonMode,
      },
      tenantId,
      timezoneOffset,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('schedule-chart-stats')
  async getScheduleChartStats(
    @Body() query: ChartStatsQueryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.reportService.getScheduleChartStats(
      {
        startDate: new Date(query.startDate),
        endDate: new Date(query.endDate),
        comparisonMode: query.comparisonMode,
        platform: query.platform,
      },
      tenantId,
      timezoneOffset,
    );
  }

  // ==================== Goods Reports ====================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('goods-stats')
  async getGoodsStats(
    @Body() query: StatsQueryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.reportService.getGoodsStats(
      {
        startDate: new Date(query.startDate),
        endDate: new Date(query.endDate),
        comparisonStartDate: query.comparisonStartDate ? new Date(query.comparisonStartDate) : undefined,
        comparisonEndDate: query.comparisonEndDate ? new Date(query.comparisonEndDate) : undefined,
        platform: query.platform,
        comparisonMode: query.comparisonMode,
      },
      tenantId,
      timezoneOffset,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('goods-chart-stats')
  async getGoodsChartStats(
    @Body() query: ChartStatsQueryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.reportService.getGoodsChartStats(
      {
        startDate: new Date(query.startDate),
        endDate: new Date(query.endDate),
        comparisonMode: query.comparisonMode,
        platform: query.platform,
      },
      tenantId,
      timezoneOffset,
    );
  }

  // ==================== Revenue from Goods ====================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('revenue-goods-stats')
  async getRevenueGoodsStats(
    @Body() query: StatsQueryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.reportService.getRevenueGoodsStats(
      {
        startDate: new Date(query.startDate),
        endDate: new Date(query.endDate),
        comparisonStartDate: query.comparisonStartDate ? new Date(query.comparisonStartDate) : undefined,
        comparisonEndDate: query.comparisonEndDate ? new Date(query.comparisonEndDate) : undefined,
        comparisonMode: query.comparisonMode,
        platform: query.platform,
      },
      tenantId,
      timezoneOffset,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('revenue-goods-chart-stats')
  async getRevenueGoodsChartStats(
    @Body() query: ChartStatsQueryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.reportService.getRevenueGoodsChartStats(
      {
        startDate: new Date(query.startDate),
        endDate: new Date(query.endDate),
        comparisonMode: query.comparisonMode,
        platform: query.platform,
      },
      tenantId,
      timezoneOffset,
    );
  }

  // ==================== Other Reports ====================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('payment-method-stats')
  async getPaymentMethodStats(
    @Body() query: PaymentMethodStatsQueryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.reportService.getPaymentMethodStats(
      {
        startDate: new Date(query.startDate),
        endDate: new Date(query.endDate),
        platform: query.platform,
      },
      tenantId,
      timezoneOffset,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('top-routes')
  async getTopRoutes(
    @Body() query: TopRoutesQueryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.reportService.getTopRoutesReport(
      {
        startDate: new Date(query.startDate),
        endDate: new Date(query.endDate),
        platform: query.platform,
      },
      tenantId,
      timezoneOffset,
    );
  }
}
