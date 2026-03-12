import { Injectable } from '@nestjs/common';
import { FeeTaxService } from '@/module/core/fee-tax/fee-tax.service';
import { CreateFeeTaxDto, UpdateFeeTaxDto, FeeTaxDto } from '@/module/core/fee-tax/dto/fee-tax.dto';
import { Types } from 'mongoose';

@Injectable()
export class AdminFeeTaxService {
  constructor(private readonly feeTaxService: FeeTaxService) {}

  /**
   * Create a new fee/tax configuration for tenant
   */
  async create(
    tenantId: Types.ObjectId,
    createDto: CreateFeeTaxDto,
    userId?: Types.ObjectId,
  ): Promise<FeeTaxDto> {
    return this.feeTaxService.create(tenantId.toString(), createDto, userId?.toString());
  }

  /**
   * Get all fees/taxes for tenant
   */
  async findByTenant(tenantId: Types.ObjectId, enabled?: boolean): Promise<FeeTaxDto[]> {
    return this.feeTaxService.findByTenant(tenantId.toString(), enabled);
  }

  /**
   * Get fee/tax by ID
   */
  async findById(id: string, tenantId: Types.ObjectId): Promise<FeeTaxDto> {
    return this.feeTaxService.findById(id, tenantId.toString());
  }

  /**
   * Update fee/tax
   */
  async update(
    id: string,
    tenantId: Types.ObjectId,
    updateDto: UpdateFeeTaxDto,
    userId?: Types.ObjectId,
  ): Promise<FeeTaxDto> {
    return this.feeTaxService.update(id, tenantId.toString(), updateDto, userId?.toString());
  }

  /**
   * Delete fee/tax
   */
  async delete(id: string, tenantId: Types.ObjectId): Promise<void> {
    return this.feeTaxService.delete(id, tenantId.toString());
  }

  /**
   * Get applicable fees/taxes for booking preview
   */
  async getApplicableFeesTaxes(
    tenantId: Types.ObjectId,
    params: {
      total: number;
      ticketCount: number;
      routeId?: string;
      feeType?: 'fee' | 'tax';
    },
  ): Promise<FeeTaxDto[]> {
    return this.feeTaxService.getApplicableFeesTaxes(tenantId.toString(), params);
  }

  /**
   * Calculate fees and taxes for a booking
   */
  async calculateFeesAndTaxes(
    tenantId: Types.ObjectId,
    params: {
      bookingTotal: number;
      afterDiscountTotal: number;
      ticketCount: number;
      routeId?: string;
      tickets?: Array<{ price: number }>;
    },
  ): Promise<{
    fees: Array<{ name: string; amount: number; feeType: string }>;
    taxes: Array<{ name: string; amount: number; feeType: string }>;
    totalFees: number;
    totalTaxes: number;
    finalTotal: number;
  }> {
    return this.feeTaxService.calculateFeesAndTaxes(tenantId.toString(), params);
  }
}
