import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AdminFeeTaxService } from './admin-fee-tax-service';
import { CreateFeeTaxDto, UpdateFeeTaxDto, FeeTaxDto } from '@/module/core/fee-tax/dto/fee-tax.dto';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';

@Controller('admin/fee-taxes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT)
export class AdminFeeTaxController {
  constructor(private readonly adminFeeTaxService: AdminFeeTaxService) {}

  /**
   * Get applicable fees/taxes for a booking (for calculation preview)
   * Query params: total, ticketCount, routeId, feeType (fee or tax)
   */
  @Get('calculate/preview')
  async getApplicable(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Query('total') total?: number,
    @Query('ticketCount') ticketCount?: number,
    @Query('routeId') routeId?: string,
    @Query('feeType') feeType?: 'fee' | 'tax',
  ): Promise<FeeTaxDto[]> {
    return this.adminFeeTaxService.getApplicableFeesTaxes(user.tenantId, {
      total: total || 0,
      ticketCount: ticketCount || 0,
      routeId,
      feeType,
    });
  }

  /**
   * Calculate fees and taxes for a booking
   */
  @Post('calculate')
  async calculateFeesAndTaxes(
    @Body() params: {
      bookingTotal: number;
      afterDiscountTotal: number;
      ticketCount: number;
      routeId?: string;
      tickets?: Array<{ price: number }>;
    },
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ): Promise<{
    fees: Array<{ name: string; amount: number; feeType: string }>;
    taxes: Array<{ name: string; amount: number; feeType: string }>;
    totalFees: number;
    totalTaxes: number;
    finalTotal: number;
  }> {
    return this.adminFeeTaxService.calculateFeesAndTaxes(user.tenantId, params);
  }

  /**
   * Create new fee/tax configuration
   */
  @Post()
  async create(
    @Body() createDto: CreateFeeTaxDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ): Promise<FeeTaxDto> {
    return this.adminFeeTaxService.create(user.tenantId, createDto, user._id);
  }

  /**
   * Get all fees/taxes for tenant
   */
  @Get()
  async getAll(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Query('enabled') enabled?: string,
  ): Promise<FeeTaxDto[]> {
    const enabledBool = enabled !== undefined ? enabled === 'true' : undefined;
    return this.adminFeeTaxService.findByTenant(user.tenantId, enabledBool);
  }

  /**
   * Get fee/tax by ID
   */
  @Get(':id')
  async getById(
    @Param('id') id: string,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ): Promise<FeeTaxDto> {
    return this.adminFeeTaxService.findById(id, user.tenantId);
  }

  /**
   * Update fee/tax
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateFeeTaxDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ): Promise<FeeTaxDto> {
    return this.adminFeeTaxService.update(id, user.tenantId, updateDto, user._id);
  }

  /**
   * Delete fee/tax
   */
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ): Promise<{ message: string }> {
    await this.adminFeeTaxService.delete(id, user.tenantId);
    return { message: 'Fee/Tax deleted successfully' };
  }
}
