import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { FeeTaxService } from './fee-tax.service';
import { CreateFeeTaxDto, UpdateFeeTaxDto, FeeTaxDto } from './dto/fee-tax.dto';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('fee-taxes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT)
export class FeeTaxController {
  constructor(private readonly feeTaxService: FeeTaxService) {}

  /**
   * Create new fee/tax configuration
   */
  @Post()
  async create(
    @Body() createDto: CreateFeeTaxDto,
    @CurrentUser() user: UserTokenDto,
  ): Promise<FeeTaxDto> {
    return this.feeTaxService.create(user.tenantId.toString(), createDto, user._id.toString());
  }

  /**
   * Get all fees/taxes for tenant
   */
  @Get()
  async getAll(
    @CurrentUser() user: UserTokenDto,
    @Query('enabled') enabled?: string,
  ): Promise<FeeTaxDto[]> {
    const enabledBool = enabled !== undefined ? enabled === 'true' : undefined;
    return this.feeTaxService.findByTenant(user.tenantId.toString(), enabledBool);
  }

  /**
   * Get fee/tax by ID
   */
  @Get(':id')
  async getById(
    @Param('id') id: string,
    @CurrentUser() user: UserTokenDto,
  ): Promise<FeeTaxDto> {
    return this.feeTaxService.findById(id, user.tenantId.toString());
  }

  /**
   * Update fee/tax
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateFeeTaxDto,
    @CurrentUser() user: UserTokenDto,
  ): Promise<FeeTaxDto> {
    return this.feeTaxService.update(id, user.tenantId.toString(), updateDto, user._id.toString());
  }

  /**
   * Delete fee/tax
   */
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: UserTokenDto,
  ): Promise<{ message: string }> {
    await this.feeTaxService.delete(id, user.tenantId.toString());
    return { message: 'Fee/Tax deleted successfully' };
  }

  /**
   * Get applicable fees/taxes for a booking (for calculation preview)
   * Query params: total, ticketCount, routeId, feeType (fee or tax)
   */
  @Get('calculate/preview')
  async getApplicable(
    @CurrentUser() user: UserTokenDto,
    @Query('total') total?: number,
    @Query('ticketCount') ticketCount?: number,
    @Query('routeId') routeId?: string,
    @Query('feeType') feeType?: 'fee' | 'tax',
  ): Promise<FeeTaxDto[]> {
    return this.feeTaxService.getApplicableFeesTaxes(user.tenantId.toString(), {
      total: total || 0,
      ticketCount: ticketCount || 0,
      routeId,
      feeType,
    });
  }
}
