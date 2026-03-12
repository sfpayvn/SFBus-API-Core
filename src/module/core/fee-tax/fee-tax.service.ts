import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FeeTax, FeeTaxDocument } from './schema/fee-tax.schema';
import { CreateFeeTaxDto, UpdateFeeTaxDto, FeeTaxDto } from './dto/fee-tax.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FeeTaxService {
  constructor(@InjectModel(FeeTax.name) private readonly feeTaxModel: Model<FeeTaxDocument>) {}

  /**
   * Create a new fee/tax configuration
   */
  async create(tenantId: string, createDto: CreateFeeTaxDto, userId?: string): Promise<FeeTaxDto> {
    const feeTax = new this.feeTaxModel({
      ...createDto,
      tenantId: new Types.ObjectId(tenantId),
      createdBy: userId ? new Types.ObjectId(userId) : undefined,
      updatedBy: userId ? new Types.ObjectId(userId) : undefined,
    });

    const saved = await feeTax.save();
    return this.toDto(saved);
  }

  /**
   * Get all fees/taxes for a tenant
   */
  async findByTenant(tenantId: string, enabled?: boolean): Promise<FeeTaxDto[]> {
    const query: any = { tenantId: new Types.ObjectId(tenantId) };

    if (enabled !== undefined) {
      query.enabled = enabled;
    }

    const items = await this.feeTaxModel.find(query).sort({ priority: 1 }).exec();
    return items.map((item) => this.toDto(item));
  }

  /**
   * Get fee/tax by ID
   */
  async findById(id: string, tenantId: string): Promise<FeeTaxDto> {
    const item = await this.feeTaxModel.findOne({
      _id: new Types.ObjectId(id),
      tenantId: new Types.ObjectId(tenantId),
    });

    if (!item) {
      throw new NotFoundException(`Fee/Tax with ID ${id} not found`);
    }

    return this.toDto(item);
  }

  /**
   * Get applicable fees/taxes for a booking
   * Filters by:
   * - enabled = true
   * - date range (if specified)
   * - conditions (minTotal, maxTotal, etc.)
   */
  async getApplicableFeesTaxes(
    tenantId: string,
    params: {
      total: number;
      ticketCount: number;
      routeId?: string;
      feeType?: 'fee' | 'tax';
    },
  ): Promise<FeeTaxDto[]> {
    const query: any = {
      tenantId: new Types.ObjectId(tenantId),
      enabled: true,
    };

    if (params.feeType) {
      query.feeType = params.feeType;
    }

    // Date range filter
    const now = new Date();
    query.$or = [
      {
        $and: [
          { startDate: { $exists: false } },
          { endDate: { $exists: false } },
        ],
      },
      {
        $and: [
          { startDate: { $lte: now } },
          { endDate: { $exists: false } },
        ],
      },
      {
        $and: [
          { startDate: { $exists: false } },
          { endDate: { $gte: now } },
        ],
      },
      {
        $and: [
          { startDate: { $lte: now } },
          { endDate: { $gte: now } },
        ],
      },
    ];

    const items = await this.feeTaxModel.find(query).sort({ priority: 1 }).exec();

    // Filter by conditions
    return items.filter((item) => {
      if (!item.conditions) return true;

      const { minTotal, maxTotal, minTickets, maxTickets, appliedRoutes, excludedRoutes } = item.conditions;

      if (minTotal && params.total < minTotal) return false;
      if (maxTotal && params.total > maxTotal) return false;
      if (minTickets && params.ticketCount < minTickets) return false;
      if (maxTickets && params.ticketCount > maxTickets) return false;

      if (params.routeId) {
        const routeObjectId = new Types.ObjectId(params.routeId);
        if (excludedRoutes?.some((rid) => rid.equals(routeObjectId))) return false;
        if (appliedRoutes && !appliedRoutes.some((rid) => rid.equals(routeObjectId))) return false;
      }

      return true;
    }).map((item) => this.toDto(item));
  }

  /**
   * Update fee/tax
   */
  async update(id: string, tenantId: string, updateDto: UpdateFeeTaxDto, userId?: string): Promise<FeeTaxDto> {
    const item = await this.feeTaxModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        tenantId: new Types.ObjectId(tenantId),
      },
      {
        ...updateDto,
        updatedBy: userId ? new Types.ObjectId(userId) : undefined,
      },
      { new: true },
    );

    if (!item) {
      throw new NotFoundException(`Fee/Tax with ID ${id} not found`);
    }

    return this.toDto(item);
  }

  /**
   * Delete fee/tax
   */
  async delete(id: string, tenantId: string): Promise<void> {
    const result = await this.feeTaxModel.deleteOne({
      _id: new Types.ObjectId(id),
      tenantId: new Types.ObjectId(tenantId),
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Fee/Tax with ID ${id} not found`);
    }
  }

  /**
   * Calculate fees and taxes for a booking
   */
  async calculateFeesAndTaxes(
    tenantId: string,
    params: {
      bookingTotal: number; // Total price before fee/tax
      afterDiscountTotal: number; // Price after discount
      ticketCount: number;
      routeId?: string;
      tickets?: Array<{ price: number }>; // Individual ticket prices
    },
  ): Promise<{
    fees: Array<{ name: string; amount: number; feeType: string }>;
    taxes: Array<{ name: string; amount: number; feeType: string }>;
    totalFees: number;
    totalTaxes: number;
    finalTotal: number;
  }> {
    const applicableFeesTaxes = await this.getApplicableFeesTaxes(tenantId, {
      total: params.afterDiscountTotal,
      ticketCount: params.ticketCount,
      routeId: params.routeId,
    });

    const fees: Array<{ name: string; amount: number; feeType: string }> = [];
    const taxes: Array<{ name: string; amount: number; feeType: string }> = [];
    let totalFees = 0;
    let totalTaxes = 0;

    for (const feeTax of applicableFeesTaxes) {
      let amount = 0;

      // Determine base for calculation
      let base = params.afterDiscountTotal;
      if (feeTax.appliedOn === 'ticket_price' && params.tickets) {
        // Calculate for each ticket
        amount = params.tickets.reduce((sum, ticket) => {
          const ticketAmount = this.calculateAmount(ticket.price, feeTax.value, feeTax.calculationType);
          return sum + ticketAmount;
        }, 0);
      } else if (feeTax.appliedOn === 'total_booking') {
        base = params.bookingTotal;
        amount = this.calculateAmount(base, feeTax.value, feeTax.calculationType);
      } else {
        // after_discount
        amount = this.calculateAmount(base, feeTax.value, feeTax.calculationType);
      }

      const record = { name: feeTax.name, amount: Math.floor(amount), feeType: feeTax.feeType };

      if (feeTax.feeType === 'fee') {
        fees.push(record);
        totalFees += record.amount;
      } else {
        taxes.push(record);
        totalTaxes += record.amount;
      }
    }

    const finalTotal = params.afterDiscountTotal + totalFees + totalTaxes;

    return {
      fees,
      taxes,
      totalFees,
      totalTaxes,
      finalTotal,
    };
  }

  /**
   * Calculate amount based on type
   */
  private calculateAmount(base: number, value: number, type: 'fixed' | 'percentage'): number {
    if (type === 'fixed') {
      return value;
    } else {
      return (base * value) / 100;
    }
  }

  /**
   * Convert FeeTaxDocument to DTO
   */
  private toDto(doc: FeeTaxDocument): FeeTaxDto {
    return plainToInstance(FeeTaxDto, {
      _id: doc._id?.toString(),
      tenantId: doc.tenantId?.toString(),
      feeType: doc.feeType,
      name: doc.name,
      calculationType: doc.calculationType,
      appliedOn: doc.appliedOn,
      value: doc.value,
      priority: doc.priority,
      enabled: doc.enabled,
      description: doc.description,
      conditions: doc.conditions,
      startDate: doc.startDate,
      endDate: doc.endDate,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      createdBy: doc.createdBy?.toString(),
      updatedBy: doc.updatedBy?.toString(),
    });
  }
}
